"use server"

import db from "@/lib/db";

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'


async function getProductBySlug(slug) {





    const user = await getServerSession(authOptions)
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {
                if (user.permissions[0].productAndInventory) {

                

                    const product =  await db.product.findUnique({
                        where:{
                            slug:slug

                        },
                        select:{
                            id:true,
                            category:{
                                select:{
                                    slug:true,
                                    id:true
                                }
                            },
                            slug:true,
                          name: true,
                          highLights:true,
                          description:true,
                          thumbNail:true,
                          images:true,
                          status:true,
                          showOnHome:true,
                          isFeatured:true,
                          isBestSeller:true,
                          tags:true,
                          stars:true,
                          isVegiterian:true
                          
                          
                          
                          



                        }
                    })

               
           
                  

                    return {
                        success: true,
                        message: "fetched success",
                        product

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
export default getProductBySlug
