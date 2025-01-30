"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { revalidatePath } from "next/cache"


export default async function getOrderAsWhole(orderId) {
    const user = await getServerSession(authOptions)


    if (user) {



        try {
            const order = await db.orders.findUnique({
                where: {
                    id: orderId
                }
            })
            const companyAddress = await db.staticInfo.findUnique({
                where:{
                    key:"companyAddress"
                }
            })




            return {
                success: true,
                message: `cleared`,
                order,
                companyAddress



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