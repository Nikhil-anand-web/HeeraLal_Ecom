"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { revalidatePath } from "next/cache"

export default async function decValueOfComboByOne(ids = '') {
    const user = await getServerSession(authOptions)




    try {
        
        const cartItem = await db.cartComboItems.findFirst({
            where: {
                AND: [{
                    cart: {
                        userId: user.id
                    }
                }, { comboId: ids }]
            }, select: {
                qty: true,
                id: true,
                
            }
        })
        if (!cartItem) {
            return {
                success: true,
                message: "cart not present",
                nwCartComboItem :{qty:0}

            }
            
        }
        if (cartItem?.qty===1) {
            if (cartItem?.qty===1) {
                await db.cartComboItems.delete({
                    where:{
                        id:cartItem.id
                    }
                })
                
            }
            revalidatePath('/cart')
            
            return {
                success: true,
                message: "removed",
                nwCartComboItem :{qty:0}

            }


        } else  {
            const nwCartComboItem = await db.cartComboItems.update({
                where: {
                    id: cartItem.id
                }, data: {
                    qty: {
                        decrement: 1
                    }
                }, select: {
                    qty: true,
                    
                    


                }
            })
            console.log(nwCartComboItem)
            revalidatePath('/cart')
            return {
                success: true,
                message: "removed",
                nwCartComboItem

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