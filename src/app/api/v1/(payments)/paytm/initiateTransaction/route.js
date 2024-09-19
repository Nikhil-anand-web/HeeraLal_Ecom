import checkPinCodeAv from '@/app/actions/checkPinCodeAv';
import getShipingCharges from '@/app/actions/getShipingCharges';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import percentOf from '@/lib/percentOf';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import PaytmChecksum from 'paytmchecksum';
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

    try {
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
            const response = await checkPinCodeAv(userInfo.pinCode)
            if (response.res.data.GetDomesticTransitTimeForPinCodeandProductResult.ErrorMessage.length === 0 || !response.res.data.GetDomesticTransitTimeForPinCodeandProductResult.ErrorMessage === 'Valid' || response.res.data.GetDomesticTransitTimeForPinCodeandProductResult.IsError || response.res.data.GetDomesticTransitTimeForPinCodeandProductResult.ExpectedDateDelivery.length === null) {
                return NextResponse.json({
                    success: false,
                    message: "Area not serviceable"
                }, { status: 400 })


            }
            const order = await db.orders.findUnique({
                where: {

                    orderId: reqObj.orderId,
                    AND: [{ customerId: user.id }]


                }
            })

            const absoluteCouponDiscount = getcouponDiscount(order)
            const res = await getShipingCharges(userInfo.pinCode)
            const shipingCharge = res.charges
            const taxes = percentOf((order.subTotal - absoluteCouponDiscount - order.refralDiscountAbsolute), order.taxes)

            const finalPrice = parseFloat((order.subTotal - absoluteCouponDiscount - order.refralDiscountAbsolute)) + parseFloat((taxes + shipingCharge).toPrecision(5))



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

            const paytmParams = {
                MID: process.env.NEXT_PUBLIC_PAYTM_MID,
                ORDER_ID: updatedOrder.orderId,
                CUST_ID: updatedOrder.customerId,
                INDUSTRY_TYPE_ID: process.env.NEXT_PUBLIC_PAYTM_INDUSTRY_TYPE_ID,
                CHANNEL_ID: process.env.NEXT_PUBLIC_PAYTM_CHANNEL_ID,
                TXN_AMOUNT: process.env.APP_ENV === "TEST" ? "1" : Math.round(updatedOrder.finalPrice).toString(),
                // TXN_AMOUNT: Math.round(updatedOrder.finalPrice).toString(),
                WEBSITE: process.env.NEXT_PUBLIC_PAYTM_WEBSITE,
                CALLBACK_URL: process.env.NEXT_PUBLIC_PAYTM_CALLBACK_URL,
                MOBILE_NO: updatedOrder.CustomerMeta.mobile,
                EMAIL: updatedOrder.CustomerMeta.email || "no email present",
            };
            // console.log(paytmParams)

            const paytmChecksum = await PaytmChecksum.generateSignature(
                paytmParams,
                process.env.PAYTM_MERCHANT_KEY
            );

            paytmParams['CHECKSUMHASH'] = paytmChecksum;
            // console.log(paytmChecksum)


            return NextResponse.json({
                url: `https://${process.env.PAYTM_ENVIRONMENT === 'TEST' ? 'securegw-stage' : 'securegw'}.paytm.in/order/process`,
                params: paytmParams,
            }, { status: 200 })









        } else if (reqObj.wantToUseDefault === false) {
            if (!reqObj.address || reqObj.address === '' || !reqObj.pinCode || !reqObj.city || reqObj.city === '' || !reqObj.state || reqObj.state === '') {
                return NextResponse.json({
                    success: false,
                    message: "Provide address correctly"
                }, { status: 400 })

            }
            const response = await checkPinCodeAv(reqObj.pinCode)

            if (response.res.data.GetDomesticTransitTimeForPinCodeandProductResult.ErrorMessage.length === 0 || !response.res.data.GetDomesticTransitTimeForPinCodeandProductResult.ErrorMessage === 'Valid' || response.res.data.GetDomesticTransitTimeForPinCodeandProductResult.IsError || response.res.data.GetDomesticTransitTimeForPinCodeandProductResult.ExpectedDateDelivery === null) {
                return NextResponse.json({
                    success: false,
                    message: "Area not serviceable"
                }, { status: 400 })


            }
            console.log(response)

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

                userInfo = await db.user.update({
                    where: { id: user.id },
                    data: {
                        address: reqObj.address,
                        state: reqObj.state,
                        city: reqObj.city,
                        pinCode: parseInt(reqObj.pinCode)


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

            const absoluteCouponDiscount = getcouponDiscount(order)
            const res = await getShipingCharges(userInfo.pinCode)
            const shipingCharge = res.charges
            const taxes = percentOf((order.subTotal - absoluteCouponDiscount - order.refralDiscountAbsolute), order.taxes)

            const finalPrice = parseFloat((order.subTotal - absoluteCouponDiscount - order.refralDiscountAbsolute)) + parseFloat((taxes + shipingCharge).toPrecision(5))

            const customerMeta = {
                firstName: reqObj.firstName,
                lastName: reqObj.lastName,
                mobile: reqObj.mobile,
                pincode: reqObj.pincode,
                address: reqObj.address,
                state: reqObj.state,
                city: reqObj.city,

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

            const paytmParams = {
                MID: process.env.NEXT_PUBLIC_PAYTM_MID,
                ORDER_ID: updatedOrder.orderId,
                CUST_ID: updatedOrder.customerId,
                INDUSTRY_TYPE_ID: process.env.NEXT_PUBLIC_PAYTM_INDUSTRY_TYPE_ID,
                CHANNEL_ID: process.env.NEXT_PUBLIC_PAYTM_CHANNEL_ID,
                TXN_AMOUNT: process.env.APP_ENV === "TEST" ? "1" : Math.round(updatedOrder.finalPrice).toString(),
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
            // console.log(paytmChecksum)


            return NextResponse.json({
                success:true,
                url: `https://${process.env.PAYTM_ENVIRONMENT === 'TEST' ? 'securegw-stage' : 'securegw'}.paytm.in/order/process`,
                params: paytmParams,
            }, { status: 200 })







        } else {
            return NextResponse.json({
                success: false,
                message: "something went wrong"
            }, { status: 400 })

        }


    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "something went wrong"
        }, { status: 400 })

    }






}