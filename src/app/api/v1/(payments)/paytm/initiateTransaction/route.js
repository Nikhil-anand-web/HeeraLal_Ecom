import getShipingCharges from '@/app/actions/getShipingCharges';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import percentOf from '@/lib/percentOf';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import PaytmChecksum from 'paytmchecksum';
import { v4 as uuidv4 } from 'uuid';
const getcouponDiscount = (order) => {


    if (!order.couponMeta) {
        return 0

    }
    if (order.couponMeta.type === 'absolute') {
        return order.couponMeta.discountValue

    } else if (order.couponMeta.type === 'percent') {
        const val = percentOf(order.subTotal, parseFloat(order.couponMeta.discountValue))
        return val

    }
}
export async function POST(req) {
    const reqObj = await req.json()
    const user = await getServerSession(authOptions)
    console.log(reqObj, "ds")

    if (reqObj.wantToUseDefault === true) {
        const userInfo = await db.user.findUnique({
            where: {
                id: user.id
            },
            select: {
                address: true,
                pinCode: true,
                city: true,
                state: true,
                firstName: true,
                lastName: true,
                mobile: true,
                id: true,
                email: true




            }
        })

        if (!userInfo.address || !userInfo.pinCode || !userInfo.city || !userInfo.state) {

            return NextResponse.json({
                success: false,
                message: "dont have a default address"
            }, { status: 400 })

        }
        const order = await db.orders.findUnique({
            where: {

                orderId: reqObj.orderId,
                AND: [{ customerId: user.id }]


            }
        })
        const subTotal = order.subTotal
        const absoluteCouponDiscount = getcouponDiscount(order)
        const res = await getShipingCharges(userInfo.pinCode)
        const shipingCharge = res.charges
        const taxes = percentOf((order.subTotal - absoluteCouponDiscount), order.taxes)

        const finalPrice = parseFloat((subTotal - absoluteCouponDiscount)) + parseFloat((taxes + shipingCharge))




        const updatedOrder = await db.orders.update({
            where: {
                orderId: order.orderId,
                AND: [{ customerId: user.id }]
            }, data: {
                finalPrice: finalPrice,
                CustomerMeta: userInfo,
                shipingCharges: shipingCharge,
                PaymentMode: "Paytm Gateway"


            }

        })
        console.log(updatedOrder, "jbuyhgt")
        const paytmParams = {
            MID: process.env.NEXT_PUBLIC_PAYTM_MID,
            ORDER_ID: updatedOrder.orderId,
            CUST_ID: updatedOrder.customerId,
            INDUSTRY_TYPE_ID: process.env.NEXT_PUBLIC_PAYTM_INDUSTRY_TYPE_ID,
            CHANNEL_ID: process.env.NEXT_PUBLIC_PAYTM_CHANNEL_ID,
            TXN_AMOUNT: "1",
            // TXN_AMOUNT: Math.round(updatedOrder.finalPrice).toString(),
            WEBSITE: process.env.NEXT_PUBLIC_PAYTM_WEBSITE,
            CALLBACK_URL: process.env.NEXT_PUBLIC_PAYTM_CALLBACK_URL,
            MOBILE_NO: updatedOrder.CustomerMeta.mobile,
            EMAIL: updatedOrder.CustomerMeta.email || "no email present",
        };
        console.log(paytmParams)

        const paytmChecksum = await PaytmChecksum.generateSignature(
            paytmParams,
            process.env.PAYTM_MERCHANT_KEY
        );

        paytmParams['CHECKSUMHASH'] = paytmChecksum;
        console.log(paytmChecksum)


        return NextResponse.json({
            url: `https://${process.env.PAYTM_ENVIRONMENT === 'TEST' ? 'securegw-stage' : 'securegw'}.paytm.in/order/process`,
            params: paytmParams,
        }, { status: 200 })









    } else if (reqObj.wantToUseDefault === false) {
        var userInfo = await db.user.findUnique({
            where: {
                id: user.id
            },
            select: {
                address: true,
                pinCode: true,
                city: true,
                state: true,
                firstName: true,
                lastName: true,
                mobile: true,
                id: true,
                email: true




            }
        })

        if (!userInfo.address || !userInfo.pinCode || !userInfo.city || !userInfo.state) {

            userInfo= await db.user.update({
                where: { id: user.id },
                data: {
                    address: reqObj.address,
                    state: reqObj.state,
                    city: reqObj.city,
                    pinCode: reqObj.pinCode


                }, select: {
                    address: true,
                    pinCode: true,
                    city: true,
                    state: true,
                    firstName: true,
                    lastName: true,
                    mobile: true,
                    id: true,
                    email: true

                }
            }
            )

        }
        const order = await db.orders.findUnique({
            where: {

                orderId: reqObj.orderId,
                AND: [{ customerId: user.id }]


            }
        })
        const subTotal = order.subTotal
        const absoluteCouponDiscount = getcouponDiscount(order)
        const res = await getShipingCharges(userInfo.pinCode)
        const shipingCharge = res.charges
        const taxes = percentOf((order.subTotal - absoluteCouponDiscount), order.taxes)

        const finalPrice = parseFloat((subTotal - absoluteCouponDiscount)) + parseFloat((taxes + shipingCharge))

        const customerMeta = {
            firstName: reqObj.firstName,
            lastName:reqObj.lastName,
            mobile : reqObj.mobile,
            pincode : reqObj.pincode,
            address:reqObj.address,
            state:reqObj.state,
            city:reqObj.city,

        }

        const updatedOrder = await db.orders.update({
            where: {
                orderId: order.orderId,
                AND: [{ customerId: user.id }]
            }, data: {
                finalPrice: finalPrice,
                CustomerMeta: customerMeta,
                shipingCharges: shipingCharge,
                PaymentMode: "Paytm Gateway"


            }

        })
        console.log(updatedOrder, "jbuyhgt")
        const paytmParams = {
            MID: process.env.NEXT_PUBLIC_PAYTM_MID,
            ORDER_ID: updatedOrder.orderId,
            CUST_ID: updatedOrder.customerId,
            INDUSTRY_TYPE_ID: process.env.NEXT_PUBLIC_PAYTM_INDUSTRY_TYPE_ID,
            CHANNEL_ID: process.env.NEXT_PUBLIC_PAYTM_CHANNEL_ID,
            TXN_AMOUNT: Math.round(updatedOrder.finalPrice).toString(),
            WEBSITE: process.env.NEXT_PUBLIC_PAYTM_WEBSITE,
            CALLBACK_URL: process.env.NEXT_PUBLIC_PAYTM_CALLBACK_URL,
            MOBILE_NO: updatedOrder.CustomerMeta.mobile,
            EMAIL: updatedOrder.CustomerMeta.email || "no email present",
        };
        console.log(paytmParams)

        const paytmChecksum = await PaytmChecksum.generateSignature(
            paytmParams,
            process.env.PAYTM_MERCHANT_KEY
        );

        paytmParams['CHECKSUMHASH'] = paytmChecksum;
        console.log(paytmChecksum)


        return NextResponse.json({
            url: `https://${process.env.PAYTM_ENVIRONMENT === 'TEST' ? 'securegw-stage' : 'securegw'}.paytm.in/order/process`,
            params: paytmParams,
        }, { status: 200 })







    }else{
        return NextResponse.json({
            success:false,
            message:"something went wrong"
        }, { status: 400 })

    }






}