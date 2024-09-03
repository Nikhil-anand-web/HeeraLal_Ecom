"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"

export default async function getAboutComboInCart(ids = '') {
    const user = await getServerSession(authOptions)



    try {
        const cart = await db.cart.findUnique({
            where: {
                userId: user.id
            }, select: {
                cartComboItems: {
                    where: {
                        comboId: ids
                    }, select: {
                        qty: true,
                        combo: {
                            select: {
                                qty: true
                            }
                        }


                    }
                }
            }
        })
        if (!cart) {
            throw {
                success: true,
                message: "cart not found",


            }

        }
        return {
            success: true,
            message: "fetched",
            cart

        }


    } catch (error) {
        console.log(error)

        return {
            success: false,
            message: error.meta?.cause || "internal server error",

        }

    }

}