"use server"

import db from "@/lib/db";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'

import { revalidatePath } from 'next/cache';
import isUnderDuration from "@/lib/isUnderDuration";






async function raiseCancellationRequest(orderId,reason) {




    const user = await getServerSession(authOptions)
    if (user) {

        try {







            const order = await db.orders.findFirst({
                where:{
                    orderId:orderId,
                    AND:[{customerId: user.id,},{orderStatus: {
                      lt:3
                    }},{paymentStatus:1}]
                  }, select: {


                    paymentStatus: true,
                    orderStatus: true,
                    createdAt: true,
                    cancellationRequestStatus:true


                }
            })
            const cancilationRequestUpperLimit = await db.globalSettings.findFirst({
                where: {
                    settingName: "cancilationRequestUpperLimit"
            
            
                }
            })
            if ( !order  ||!isUnderDuration(cancilationRequestUpperLimit.value , order.createdAt)) {
                console.log(cancilationRequestUpperLimit)
                return{
                    message:"return policy void"
                }
                
                
            }
            if(order.cancellationRequestStatus>0){
                return{
                    message:"request already raised"
                }

            }

            await db.orders.update({
                where:{
                    orderId:orderId
                },data:{
                    cancellationRequestStatus:1,
                    cancellationRequestMeta:[{reason}]
                }
            })

           

























            revalidatePath('/wah-control-center/orderDetails/')

            return {

                success: true,
                message: `request raised`
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
export default raiseCancellationRequest
