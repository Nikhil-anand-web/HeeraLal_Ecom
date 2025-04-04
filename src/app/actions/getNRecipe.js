"use server"
import db from "@/lib/db"



export default async function getNRecipe(i , j) {



  



        try {
            const rec =  await db.recipe.findMany({
                skip:i,
                take:j-i,
                select:{
                    id:true,
                    name:true,
                    videoLink:true
                }
            })
           console.log(rec)
            return {
                success: true,
                data:rec
                


            }







        } catch (error) {
            console.log(error)

            return {
                success: false,
                message: error.meta?.cause || "internal server error",

            }

        }
    
}