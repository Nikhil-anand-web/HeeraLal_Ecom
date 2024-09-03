"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { revalidatePath } from "next/cache"

export default async function deleteRecipe(ids='') {
    const user = await getServerSession(authOptions)


    if (user?.permissions[0].complementaryContentManagment) {



        try {
            await db.recipe.delete({
                where:{
                    id:ids
                }
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
                message: error.meta?.cause || "internal server error",

            }

        }
    }
}