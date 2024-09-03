"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export default async function incValueOfComboByOne(ids = '') {
    const user = await getServerSession(authOptions)
    try {
        const stockOfCombo = await db.combo.findUnique({
            where: {
                id: ids
            }, select: {
                qty: true
            }
        })
        if (stockOfCombo.qty < 1) {
            return {
                success: false,
                message: "outOfStock",
            }


        }
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
            const nwCartComboItem = await db.cartComboItems.create({
                data: {
                    cart: {
                        connect: {
                            userId:user.id
                        }
                    }, combo: {
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
                nwCartComboItem

            }


        } else if (cartItem.id) {
            const nwCartComboItem =  await db.cartComboItems.update({
                where: {
                    id: cartItem.id
                }, data: {
                    qty: {
                        increment: 1
                    }
                }, select: {
                    qty: true,
                    
                   


                }
            })
            revalidatePath('/cart')
            console.log(nwCartComboItem)
            return {
                success: true,
                message: "fetched",
                nwCartComboItem

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