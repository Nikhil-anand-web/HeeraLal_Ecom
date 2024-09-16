"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"

export default async function getAboutVarientInCart(ids = '') {
    const user = await getServerSession(authOptions)


    if (user) {


        try {
            const cart = await db.cart.findUnique({
                where: {
                    userId: user.id
                }, select: {
                    cartItem: {
                        where: {
                            varientId: ids
                        }, select: {
                            qty: true,
                            varient: {
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
                    success: false,
                    message: "cart is missing",


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

}