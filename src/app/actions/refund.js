"use server"

import db from "@/lib/db";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import axios from 'axios';
import { revalidatePath } from 'next/cache';


import PaytmChecksum from 'paytmchecksum';




async function refund(orderId) {
    "use server"
    console.log(orderId)


    const user = await getServerSession(authOptions)
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {
                if (user.permissions[0].consumerAndOrderManagement) {

                    const order = await db.orders.findUnique({
                        where: {
                            orderId: orderId
                        }
                    })
                    if (order.paymentStatus !== 1) {
                        return {

                            success: false,
                            message: `amount not paid`
                        }


                    }


                    const paytmParams = {
                        body: {
                            "mid": process.env.NEXT_PUBLIC_PAYTM_MID,
                            "txnType": "REFUND",
                            "orderId": order.orderId.toString(),
                            "txnId": order.paymentToken.TXNID.toString(),
                            "refId": order.id,
                            "refundAmount": order.paymentToken.TXNAMOUNT.toString(),
                        }
                    };
                    const checksum = await PaytmChecksum.generateSignature(
                        JSON.stringify(paytmParams.body),
                        process.env.PAYTM_MERCHANT_KEY
                    );

                    paytmParams.head = {
                        "signature": checksum
                    };

                    const post_data = {
                        ...paytmParams
                    };

                    const options = {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    };

                    const response = await axios.post('https://securegw.paytm.in/refund/apply', post_data, options);
                    // console.log(response, "res")
                    console.log(response.data.body)


                    const refundObj = { ...response.data.body, ...response.data.body.resultInfo }



                    delete refundObj.resultInfo
                    console.log(refundObj)

                    await db.orders.update({
                        where: {
                            orderId: refundObj.orderId

                        }, data: {
                            refundRequest: refundObj,
                            refundRequestStatus:1,
                            paymentStatus:2,//this need to be updated by webhook
                            lastEditedBy: {
                                connect: {
                                    id: user.id, // Ensure user.id is a valid identifier for the related user
                                },
                            },
                            
                        }
                    })








                    revalidatePath('/wah-control-center/orderDetails/')

                    return {

                        success: true,
                        message: `success`
                    }


                }



            } catch (error) {
                console.log(error)


                return {
                    success: false,
                    message: error.code === 'P2002' ? "Slug  is already used" : error.meta?.cause || "internal server error",

                }

            }

        }

    }


}
export default refund
