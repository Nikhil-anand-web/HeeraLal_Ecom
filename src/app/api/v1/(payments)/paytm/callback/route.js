import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import percentOf from "@/lib/percentOf";
import updateStockAfterOrder from "@/lib/updateStockAfterOrder";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import PaytmChecksum from 'paytmchecksum';
export const config = {
    api: {
        bodyParser: false, // Disable automatic body parsing by Next.js
    },
};

const parseUrlEncodedBody = async (req) => {
    const data = await req.text(); // Read raw body data
    const params = new URLSearchParams(data);
    return Object.fromEntries(params.entries());
};
export async function POST(req) {
    const reqObj = await parseUrlEncodedBody(req)
    console.log(reqObj)
    // const user = await getServerSession(authOptions)

    const isValidChecksum = PaytmChecksum.verifySignature(
        reqObj,
        process.env.PAYTM_MERCHANT_KEY,
        reqObj.CHECKSUMHASH
    );
    console.log(isValidChecksum, "is valid")
    if (isValidChecksum) {
        const { CURRENCY, RESPMSG, STATUS, TXNAMOUNT, TXNID, CHECKSUMHASH } = reqObj;
        const tokenObj = {
            BANKTXNID: reqObj.BANKTXNID || null, // Assign null if BANKTXNID is undefined
            CURRENCY,
            RESPMSG,
            STATUS,
            TXNAMOUNT,
            TXNID,
            CHECKSUMHASH
        };
        if (tokenObj.STATUS === 'TXN_SUCCESS') {

            //payment status paid ,, payment token, reduce the stock
            const updatedOrder = await db.orders.update({
                where: {
                    orderId: reqObj.ORDERID,



                }, data: {
                    paymentToken: tokenObj,
                    paymentStatus: 1,


                }
            })
            const orderCount  = await db.orders.count({
                where:{
                    customerId : updatedOrder.customerId,
                    AND:[{paymentStatus:1},{customerId : updatedOrder.customerId}]
                }
            })
            if (orderCount===1) {
                const customer = await db.user.findUnique({
                    where:{
                        id:updatedOrder.customerId
                    },select:{
                        referedById:true
                    }
                })
                const referalConstrain = await db.globalSettings.findFirst({
                    where:{
                        settingName:"refralDiscount"
                    }
                })
                const earnedCoin =  Math.floor(percentOf(updatedOrder.finalPrice,referalConstrain.value))

                const updatedReferal  = await db.referal.update({
                    where:{
                        userId:customer.referedById
                    },data:{
                        coins:{
                            increment: earnedCoin
                        }
                    }
                })
                
            }


            if (updatedOrder.refralDiscountAbsolute > 0) {

                await db.referal.update({
                    where: {
                        userId: updatedOrder.customerId
                    }, data: {
                        coins: {
                            decrement: updatedOrder.referalCoins
                        }
                    }
                })

            }
            const cartId = await db.cart.findUnique({
                where: {
                    userId: updatedOrder.customerId
                }, select: {
                    id: true
                }
            })

            await db.cartItem.deleteMany({
                where: {
                    cartId: cartId.id
                }
            })
            await db.cartComboItems.deleteMany({
                where: {
                    cartId: cartId.id
                }
            })
            const cart = await db.cart.update({
                where: {
                    id: cartId.id

                }, data: {
                    couponId: null,
                    refralDiscountAbsolute: 0,
                    referalCoins: 0

                }
            })
            updateStockAfterOrder(updatedOrder.orderId)
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/invoice/${updatedOrder.orderId}`, 303);// whenever redirect happens it do the same request 303 is to tell boruser that we have to do a get requst





        } else {
            const updatedOrder = await db.orders.update({
                where: {
                    orderId: reqObj.ORDERID,



                }, data: {
                    paymentToken: tokenObj,



                }
            })
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment/failure`, 303);



        }



    } else {
        return NextResponse({ success: false, message: "internal server error" }, { status: 400 })

    }



}