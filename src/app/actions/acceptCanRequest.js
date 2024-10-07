"use server"

import db from "@/lib/db";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'

import { revalidatePath } from 'next/cache';







async function acceptCanRequest(orderId) {
    "use server"



    const user = await getServerSession(authOptions)
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {





                if (user.permissions[0].consumerAndOrderManagement) {
                   
                    const order = await db.orders.findFirst({
                        where: {
                            orderId: orderId,
                         
                        }, select: {


                            paymentStatus: true,
                            orderStatus: true,
                            createdAt: true,
                            cancellationRequestStatus:true


                        }
                    })
                    console.log(order)
                    
                    if (order.cancellationRequestStatus == 2 || order.cancellationRequestStatus == 3 ) {
                         if (order.cancellationRequestStatus == 3) {
                            return {
                                message: "already rejected",
                                success: false
                            }

                        } else if (order.cancellationRequestStatus == 2) {
                            return {
                                message: "already accepted",
                                success: false
                            }

                        }

                    }





                    const updated = await db.orders.update({
                        where: {
                            orderId: orderId
                        }, data: {
                            cancellationRequestStatus:2,
                            lastEditedBy: {
                                connect: {
                                    id: user.id, // Ensure user.id is a valid identifier for the related user
                                },
                            },
                        }, select: {
                            orderId: true,
                            varientMeta: true,
                            comboMeta: true,
                        }

                    })






















                    revalidatePath('/wah-control-center/orderDetails/')

                    return {

                        success: true,
                        message: `request accepted`
                    }


                }



            } catch (error) {
                console.log(error)
                console.log(error?.response?.data['error-response'][0]?.Status[0]?.StatusInformation)

                return {
                    success: false,
                    message: error.code === 'P2002' ? "Slug  is already used" : error.meta?.cause || error?.response?.data['error-response'][0]?.Status[0]?.StatusInformation || "internal server error",

                }

            }

        }

    }


}
export default acceptCanRequest
