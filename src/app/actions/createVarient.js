"use server"

import db from "@/lib/db";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'



async function createVarient(formData) {

    console.log(formData)



    const user = await getServerSession(authOptions)
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {
                if (user.permissions[0].productAndInventory) {


                  
                    const newvarient = await db.varient.create({
                        
                        data:{
                            product:{
                                connect: { id: formData.get('parentProductSlug') },
                            },
                            slug:formData.get('slugVarient') ,
                            weight:parseFloat(formData.get('weight')),
                            size:formData.get('size'),
                            qty:+formData.get('qty'),
                          
                            mrp:parseFloat(formData.get('mrp')),
                            wholeSalePrice:parseFloat(formData.get('wholeSalePrice')),
                            minQtyForBulkOrder:+formData.get('minQtyForBulkOrder'),
                            isDefault:false,
                            createdBy:{
                                connect: { id: user.id },
                            }
                            
                        }

                    }) 

                      
                        console.log(newvarient)



                    return {
                        success: true,
                        message: "product created !!",
                        newvarient

                    }








                }

            } catch (error) {
                console.log(error)

                return {
                    success: false,
                    message: error.code==='P2002'?"unique constrain void": error.meta?.cause || "internal server error",

                }

            }

        }

    }


}
export default createVarient
