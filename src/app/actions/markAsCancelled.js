"use server"

import db from "@/lib/db";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'

import { revalidatePath } from 'next/cache';
import isUnderDuration from "@/lib/isUnderDuration";






async function markAsCancelled(orderId) {
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
                            createdAt:true


                        }
                    })
                    const cancilationUpperLimit = await db.globalSettings.findFirst({
                        where: {
                            settingName: "cancilationUpperLimit"


                        }
                    })
                    if (!isUnderDuration(cancilationUpperLimit.value, order.createdAt)) {
                        return {
                            message: "time limit exceeded",
                            success: false
                        }

                    }
                    if (order.paymentStatus == 0  || order.orderStatus == 3) {
                        if (order.paymentStatus == 0) {
                            return {
                                message: "not paid",
                                success: false
                            }

                        }  else if (order.orderStatus == 3) {
                            return {
                                message: "order already cancled",
                                success: false
                            }

                        }

                    }
                 




                    const updated = await db.orders.update({
                        where: {
                            orderId: orderId
                        }, data: {
                            orderStatus: 3,
                            shipingStatus: "cancelled",
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
                    const varientIdsArr = []
                    const varientIncrementFactorArr = []
                    const comboIdsArr = []
                    const comboIncrementFactorArr = []

                    updated.varientMeta.forEach((itm) => {
                        varientIncrementFactorArr.push(itm.qty)
                        varientIdsArr.push(itm.varient.id)


                    });

                    updated.comboMeta.forEach((itm) => {
                        comboIdsArr.push(itm.combo.id)
                        comboIncrementFactorArr.push(itm.qty)



                    })




                    const updatePromisesVarient = varientIdsArr.map((id, index) => {
                        const factor = varientIncrementFactorArr[index];
                        return db.varient.update({
                            where: { id },
                            data: {
                                qty: {
                                    increment: factor,
                                },
                                createdBy: {
                                    connect: { id: user.id },
                                },
                            },
                        });
                    });

                    // Execute all updates in a transaction
                    await db.$transaction(updatePromisesVarient);
                    const updatePromisesCombo = comboIdsArr.map((id, index) => {
                        const factor = comboIncrementFactorArr[index]

                        return db.combo.update({
                            where: { id },
                            data: {
                                qty: {
                                    increment: factor,
                                },
                                createdBy: {
                                    connect: { id: user.id },
                                },
                            },

                        })
                    })
                    await db.$transaction(updatePromisesCombo);












                    revalidatePath('/wah-control-center/orderDetails/')

                    return {

                        success: true,
                        message:  `order Id ${updated.orderId} marked as  cancelled`
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
export default markAsCancelled
