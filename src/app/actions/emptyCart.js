"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { revalidatePath } from "next/cache"


export default async function emptyCart() {
    const user = await getServerSession(authOptions)


    if (user) {



        try {
            const cartId = await db.cart.findUnique({
                where:{
                    userId:user.id
                },select:{
                    id:true
                }
            })

            await db.cartItem.deleteMany({
                where:{
                   cartId:cartId.id
                }
            })
            await db.cartComboItems.deleteMany({
                where:{
                   cartId:cartId.id
                }
            })
            revalidatePath('/cart')

















            return {
                success: true,
                message: `cleared`,



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