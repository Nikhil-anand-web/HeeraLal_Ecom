"use server"

import db from "@/lib/db";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'



async function createCombo(formData) {





    const user = await getServerSession(authOptions)
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {
                if (user.permissions[0].offersAndDiscounts) {
                    const connect=[]

                     for (let i = 0; i < parseInt(formData.get('noOfVarient')); i++) {
                         const obj = {
                            id:formData.get(`varientId${i}`)

                         }
                        connect.push(obj)
                     }
                     const nwcombo = await db.combo.create({
                        data:{
                            name:formData.get('name'),
                            description:formData.get("description"),
                            discountInPercent:parseFloat(formData.get("discountInPercent")),
                            qty:parseFloat(formData.get("qty")),
                            productVarients:{
                                connect:[
                                    ...connect
                                ]

                            },
                            createdBy:{
                                connect:{
                                    id:user.id
                                }
                            }

                        }
                     })
                     console.log(nwcombo)



                    
                return {
                    success: true,
                    message: "combo created",

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
export default createCombo
