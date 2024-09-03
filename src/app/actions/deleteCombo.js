"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { revalidatePath } from "next/cache"

export default async function deleteCombo(ids = '') {
    const user = await getServerSession(authOptions)


    if (user?.permissions[0].offersAndDiscounts) {



        try {
            const deletedCombo = await db.combo.delete({
                where:{
                    id:ids
                }
            })




            revalidatePath('/wah-control-center/comboList')
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