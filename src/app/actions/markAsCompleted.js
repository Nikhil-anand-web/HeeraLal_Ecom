"use server"

import db from "@/lib/db";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'

import { revalidatePath } from 'next/cache';
import isUnderDuration from "@/lib/isUnderDuration";






async function markAsCompleted(orderId) {
    "use server"



    const user = await getServerSession(authOptions)
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {





                if (user.permissions[0].consumerAndOrderManagement) {
                   
                    const order = await db.orders.findFirst({
                        where: {
                            orderId: orderId,
                            awb:{
                                not:null
                            }
                        }, select: {


                            paymentStatus: true,
                            orderStatus: true,
                            createdAt: true


                        }
                    })
                    
                    if (order.paymentStatus == 0 || order.orderStatus == 3 || order.orderStatus == 2) {
                        if (order.paymentStatus == 0) {
                            return {
                                message: "not paid",
                                success: false
                            }

                        } else if (order.orderStatus == 3) {
                            return {
                                message: "order already cancled",
                                success: false
                            }

                        } else if (order.orderStatus == 2) {
                            return {
                                message: "order already compleated",
                                success: false
                            }

                        }

                    }





                    const updated = await db.orders.update({
                        where: {
                            orderId: orderId
                        }, data: {
                            orderStatus: 2,
                            shipingStatus: "shiped",
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
                        message: `order Id ${updated.orderId} marked as compleated`
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
export default markAsCompleted
