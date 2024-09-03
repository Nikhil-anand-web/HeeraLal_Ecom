"use server"

import db from "@/lib/db";

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'


async function getProducts() {





    const user = await getServerSession(authOptions)
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {
                if (user.permissions[0].productAndInventory) {

                

                    const products =  await db.product.findMany({
                        select:{
                            id:true,
                            category:{
                                select:{
                                    slug:true
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
                          createdAt:true,
                          updatedAt:true,
                          _count: {
                            select: {
                              varient: true,
                            }},
                          createdBy:{
                            select:{
                                userName:true
                            }
                          }



                        }
                    })

               
                   console.log(products)
                  

                    return {
                        success: true,
                        message: "fetched success",
                        products

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
export default getProducts
