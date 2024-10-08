"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { revalidatePath } from "next/cache"
import totalCartValue from "@/lib/totalCartValue"
import { redirect } from "next/navigation"

export default async function applyRefral(referingId) {
    const user = await getServerSession(authOptions)


    if (user) {

        if (user.role === 1 || user.role === 2) {


            return {
                success: false,
                message: "Account type not allowed",


            }

        }

        try {
            const orderCount = await db.orders.count({
                where: {
                    customerId: user.id
                }
            })
            const isReferingAdmin = await db.admin.count({
                where: {
                    id: referingId
                }
            })
            if (isReferingAdmin > 0) {
                return {
                    success: false,
                    message: "referal id not allowed",


                }

            }
            if (referingId === user.id) {
                return {
                    success: false,
                    message: "user cant refer itself"

                }

            }
            if (orderCount !== 0) {
                return {

                    success: false,
                    message: "referal can be only applied to first order"
                }

            }
            await db.user.update({
                where: {
                    id: user.id
                }, data: {
                    referedBy: { connect: { id: referingId } }
                }
            })












            return {
                success: true,
                message: `refral applied`,


            }







        } catch (error) {
            console.log(error)

            return {
                success: false,
                message: error.meta?.cause || "internal server error",

            }

        }
    } else {
        redirect('/sign-in')



    }
}