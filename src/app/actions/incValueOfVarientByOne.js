"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { redirect } from "next/navigation"
import { revalidatePath, revalidateTag } from "next/cache"

export default async function incValueOfVarientByOne(ids = '') {
    const user = await getServerSession(authOptions)
    if (!user) {
        redirect('/sign-in')
        
    }
    try {
        const stockOfVarient = await db.varient.findUnique({
            where: {
                id: ids
            }, select: {
                qty: true
            }
        })
        const varientInCart = await db.cartItem.findFirst({
            where:{
              AND:[  {cart:{
                    userId:user.id},
                    
                },{varientId:ids}]
            }
        })
        

        if ( (varientInCart?.qty ? varientInCart.qty +1:0) >stockOfVarient.qty) {
           
            return {
                success: false,
                message: "outOfStock",
            }


        }
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
            const nwCartItem = await db.cartItem.create({
                data: {
                    cart: {
                        connect: {
                            userId:user.id
                        }
                    }, varient: {
                        connect: {
                            id: ids
                        }
                    }
                }
            })
            revalidatePath('/cart')
        
            return {
                success: true,
                message: "fetched",
                nwCartItem

            }


        } else if (cartItem.id) {
            const nwCartItem =  await db.cartItem.update({
                where: {
                    id: cartItem.id
                }, data: {
                    qty: {
                        increment: 1
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
            revalidatePath('/cart')
     
            console.log(nwCartItem)
            return {
                success: true,
                message: "fetched",
                nwCartItem

            }

        }
        return {
            success: false,
            message: "something went wrong",
            nwCartItem: null

        }




    } catch (error) {
        console.log(error)
        if (error.code ==="P2025") {
            redirect('/sign-in')
            
        }

        return {
            success: false,
            message: error.meta?.cause || "internal server error",

        }

    }
}