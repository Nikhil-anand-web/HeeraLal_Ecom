"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { revalidatePath } from "next/cache"

export default async function updateCombo(formData) {
    const user = await getServerSession(authOptions)


    if (user?.permissions[0].offersAndDiscounts) {



        try {
            console.log(formData)
            const nwdata = {}
            if (formData.get('discountInPercent')) {
                nwdata.discountInPercent = parseFloat(formData.get('discountInPercent'))

            }
            if (formData.get('qty')) {
                nwdata.qty = parseInt(formData.get('qty'))

            }
            const nwcombo = await db.combo.update({
                where:{
                    id:formData.get('id')
                },data:nwdata
            })

   revalidatePath('/wah-control-center/comboList')

            return {
                success: true,
                message: "updated",


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