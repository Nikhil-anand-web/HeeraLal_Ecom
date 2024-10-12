"use server"

import db from "@/lib/db";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'



async function createRecipe(formData) {





    const user = await getServerSession(authOptions)
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {
                if (user.permissions[0].complementaryContentManagment) {
                    const connect=[]

                     for (let i = 0; i < parseInt(formData.get('noOfProduct')); i++) {
                         const obj = {
                            id:formData.get(`productsId${i}`)

                         }
                        connect.push(obj)
                     }
                     const neRecipee = await db.recipe.create({
                        data:{
                            name:formData.get('name'),
                            instructions:formData.get("instructions"),
                            ingredients: (!formData.get('ingredients') || formData.get('ingredients')==='')?"noExtra":formData.get('ingredients').split(',').map(str=>str.trim()),
                            videoLink:formData.get("videoLink"),
                            brief:formData.get("brief"),
                           
                            products:{
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
                     console.log(neRecipee)



                    
                return {
                    success: true,
                    message: "Recipe created",

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
export default createRecipe
