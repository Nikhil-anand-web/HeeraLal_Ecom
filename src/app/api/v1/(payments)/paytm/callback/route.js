import sendOrderConf from "@/app/actions/sendOrderConf";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import checkStockFes from "@/lib/checkStockFes";
import db from "@/lib/db";
import percentOf from "@/lib/percentOf";
import updateStockAfterOrder from "@/lib/updateStockAfterOrder";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import PaytmChecksum from 'paytmchecksum';

// export const config = {
//     api: {
//         bodyParser: false, // Disable automatic body parsing by Next.js
//     },
// };

const parseUrlEncodedBody = async (req) => {
    const data = await req.text(); // Read raw body data
    const params = new URLSearchParams(data);
    return Object.fromEntries(params.entries());
};

export async function POST(req) {
    const reqObj = await parseUrlEncodedBody(req);
    console.log("Request Object:", reqObj); // Debugging the parsed request object

    try {
        const isValidChecksum = PaytmChecksum.verifySignature(
            reqObj,
            process.env.PAYTM_MERCHANT_KEY,
            reqObj.CHECKSUMHASH
        );
        console.log("Is valid checksum:", isValidChecksum);

        if (isValidChecksum) {
            const { CURRENCY, RESPMSG, STATUS, TXNAMOUNT, TXNID, CHECKSUMHASH } = reqObj;
            const tokenObj = {
                BANKTXNID: reqObj.BANKTXNID || null,
                CURRENCY,
                RESPMSG,
                STATUS,
                TXNAMOUNT,
                TXNID,
                CHECKSUMHASH
            };
            console.log("Token Object:", tokenObj);

            if (tokenObj.STATUS === 'TXN_SUCCESS') {
                const updatedOrder = await db.orders.update({
                    where: {
                        orderId: reqObj.ORDERID,
                    },
                    data: {
                        paymentToken: tokenObj,
                        paymentStatus: 1,
                    }
                });
                console.log("Updated Order:", updatedOrder);
                const stockFesib = await checkStockFes(updatedOrder)
                if (stockFesib.shortVarients.length>0 || stockFesib.shortCombo.length>0) {
                    
                    await db.orders.update({
                        where: {
                            orderId: updatedOrder.orderId,
                        },
                        data: {
                            shortItmsMeta:stockFesib,
                            shortItmStatus:1
                        }
                    });

                    
                }

                const orderCount = await db.orders.count({
                    where: {
                        customerId: updatedOrder.customerId,
                        AND: [{ paymentStatus: 1 }, { customerId: updatedOrder.customerId }]
                    }
                });
                console.log("Order Count:", orderCount);

                if (orderCount === 1) {
                    const customer = await db.user.findUnique({
                        where: { id: updatedOrder.customerId },
                        select: { referedById: true }
                    });
                    console.log("Customer Data:", customer);

                    const referalConstrain = await db.globalSettings.findFirst({
                        where: { settingName: "refralDiscount" }
                    });
                    console.log("Referral Constraint:", referalConstrain);

                    const earnedCoin = Math.floor(percentOf(updatedOrder.finalPrice, referalConstrain.value));
                    console.log("Earned Coin:", earnedCoin);

                    if (customer.referedById && customer.referedById !== '') {
                        const updatedReferal = await db.referal.update({
                            where: { userId: customer.referedById },
                            data: { coins: { increment: earnedCoin } }
                        });
                        console.log("Updated Referral:", updatedReferal);
                    }
                }

                if (updatedOrder.refralDiscountAbsolute > 0) {
                    await db.referal.update({
                        where: { userId: updatedOrder.customerId },
                        data: { coins: { decrement: updatedOrder.referalCoins } }
                    });
                }

                const cartId = await db.cart.findUnique({
                    where: { userId: updatedOrder.customerId },
                    select: { id: true }
                });
                console.log("Cart ID:", cartId);

                await db.cartItem.deleteMany({ where: { cartId: cartId.id } });
                await db.cartComboItems.deleteMany({ where: { cartId: cartId.id } });

                await db.cart.update({
                    where: { id: cartId.id },
                    data: {
                        couponId: null,
                        refralDiscountAbsolute: 0,
                        referalCoins: 0
                    }
                });

                updateStockAfterOrder(updatedOrder.orderId);
                const forder =  await db.orders.findUnique({
                    where:{
                        orderId:reqObj.ORDERID
    
                    }
                })
                const userAc  =  await db.user.findUnique({
                    where:{
                        id:forder.customerId

                    }
                })
                await sendOrderConf(forder,userAc.email)
                return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/invoice/${updatedOrder.orderId}`, 303);
            } else {
                const updatedOrder = await db.orders.update({
                    where: { orderId: reqObj.ORDERID },
                    data: { paymentToken: tokenObj }
                });
                console.log("Order Failed:", updatedOrder);
                return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment/failure`, 303);
            }
            
            
        } else {
            console.log("Invalid checksum");
            return NextResponse.json({ success: false, message: "Payment is not valid" }, { status: 400 });
        }
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/`, 303);
    }
}
// sendOrderConf