"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { revalidatePath } from "next/cache"

export default async function toggleRecipeStatus(ids = '') {
    const user = await getServerSession(authOptions)


    if (user?.permissions[0].complementaryContentManagment) {



        try {
            const preRec = await db.recipe.findUnique({
                where:{
                    id:ids
                },select:{
                    status:true
                }
            })

            const updated = await db.recipe.update({
                where:{
                    id:ids
                },data:{
                    status:!preRec.status,
                    createdBy:{connect:{id:user.id}}
                },
            })


  

            revalidatePath('/wah-control-center/recipes')
            return {
                success: true,
                message:`${updated.status===true?"activated":"deactivated"}`,
                

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