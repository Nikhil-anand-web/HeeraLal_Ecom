"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { revalidatePath } from "next/cache"

export default async function deleteCoupon(ids = '') {
    const user = await getServerSession(authOptions)


    if (user?.permissions[0].offersAndDiscounts) {



        try {
            const cpn = await db.coupons.findUnique({
                where:{
                    id:ids
                }
            })
           
            const deletedCoupon = await db.coupons.delete({
                where:{
                    id:ids
                }
            })




            revalidatePath('/wah-control-center/coupons')
            return {
                success: true,
                message: "removed",
                

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