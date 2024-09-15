"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { revalidatePath } from "next/cache"


export default async function removeReferalDiscount() {
    const user = await getServerSession(authOptions)


    if (user) {

        
        
        try {
            
            const cart = await db.cart.update({
                where:{
                    userId:user.id
                    
                },data:{
                    refralDiscountAbsolute:0,
                    referalCoins :0
                }
            })
         



            
          

           

            

            




            revalidatePath('/cart')
            return {
                success: true,
                message: `removed`,


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