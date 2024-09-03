"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { revalidatePath } from "next/cache"

export default async function toggleComboStatus(ids = '') {
    const user = await getServerSession(authOptions)


    if (user?.permissions[0].offersAndDiscounts) {



        try {
            const precombo = await db.combo.findUnique({
                where:{
                    id:ids
                },select:{
                    status:true
                }
            })

            const updated = await db.combo.update({
                where:{
                    id:ids
                },data:{
                    status:!precombo.status
                },
            })


    console.log(updated)

            revalidatePath('/wah-control-center/comboList')
            return {
                success: true,
                message:`${updated.status===true?"activated":"deactivated"}`,
                

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