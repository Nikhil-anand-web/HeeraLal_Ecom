"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { revalidatePath } from "next/cache"

export default async function decValueOfVarientByOne(ids = '') {
    const user = await getServerSession(authOptions)




    try {
        
        const cartItem = await db.cartItem.findFirst({
            where: {
                AND: [{
                    cart: {
                        userId: user.id
                    }
                }, { varientId: ids }]
            }, select: {
                qty: true,
                id: true,
                varient: {
                    select: {
                        mrp: true
                    }
                }
            }
        })
        if (!cartItem) {
            return {
                success: true,
                message: "cart not present",
                nwCartItem :{qty:0}

            }
            
        }
        if (cartItem?.qty===1) {
            if (cartItem?.qty===1) {
                await db.cartItem.delete({
                    where:{
                        id:cartItem.id
                    }
                })
                
            }
            revalidatePath('/cart')
            
            return {
                success: true,
                message: "removed",
                nwCartItem :{qty:0}

            }


        } else  {
            const nwCartItem = await db.cartItem.update({
                where: {
                    id: cartItem.id
                }, data: {
                    qty: {
                        decrement: 1
                    }
                }, select: {
                    qty: true,
                    
                    varient: {
                        select: {
                            mrp: true
                        }
                    }


                }
            })
            console.log(nwCartItem)
            revalidatePath('/cart')
            return {
                success: true,
                message: "removed",
                nwCartItem

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