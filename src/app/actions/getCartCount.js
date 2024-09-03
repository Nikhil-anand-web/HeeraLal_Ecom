"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"


export default async function getCartCount() {
    const user = await getServerSession(authOptions)


    if (user) {

        
        
        try {
            
            const cartitm = await db.cartItem.findMany({
                where:{
                    cart:{
                        userId:user.id
                    }
                    
                },select:{
                    qty:true

                }
            })
            const cartcombo = await db.cartComboItems.findMany({
                where:{
                    cart:{
                        userId:user.id
                    }
                    
                },select:{
                    qty:true

                }
            })
          



            
          

           

            

            




         
            return {
                success: true,
                message: `removed`,
                data:[...cartitm,...cartcombo]


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