"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { revalidatePath } from "next/cache"

export default async function updateRecipe(formData) {
    const user = await getServerSession(authOptions)


    if (user?.permissions[0].complementaryContentManagment) {



        try {
            var updateObj ={}
            if (formData.get('name')) {
                updateObj.name = formData.get('name')

                
            }
            if (formData.get('videoLink')) {
                updateObj.videoLink =formData.get('videoLink')
                
            }
           

            const updated = await db.recipe.update({
                where:{
                    id:formData.get('id')
                },data:{...updateObj,createdBy:{connect:{id:user.id}}}
            })


  

            revalidatePath('/wah-control-center/recipes')
            return {
                success: true,
                message:"updated",
                

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