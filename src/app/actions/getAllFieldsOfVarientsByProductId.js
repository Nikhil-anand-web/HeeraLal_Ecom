"use server"

import db from "@/lib/db";

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'


async function getAllFieldsOfVarientsByProductId(ids) {





    const user = await getServerSession(authOptions)
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {
                if (user.permissions[0].productAndInventory) {

                

                    const varient =  await db.varient.findMany({
                        where:{
                            productId:ids
                        },
                        select:{
                            id:true,
                            slug:true,
                            product:{
                                select:{
                                     slug:true,
                                     thumbNail:true
                                }
                            },
                            weight:true,
                            size:true,
                            qty:true,
                            status:true,
                           
                            mrp:true,
                            wholeSalePrice:true,
                            minQtyForBulkOrder:true,
                            isDefault:true,
                            combo: {
                                select: {
                                  name: true, // Assuming 'name' is a field in the 'combo' model
                                }},
                            createdBy:{
                                select:{
                                    userName:true
                                }
                            }


                        }
                       
                    })

               
                   console.log(varient)
                  

                    return {
                        success: true,
                        message: "fetched success",
                        varient


                    }








                }

            } catch (error) {
                console.log(error)

                return {
                    success: false,
                    message: error.meta?.cause || "internal server error",

                }

            }

        }

    }


}
export default getAllFieldsOfVarientsByProductId
