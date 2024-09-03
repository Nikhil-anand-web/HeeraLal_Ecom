"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { revalidatePath } from "next/cache"

export default async function updateCoupon(formData) {
    const user = await getServerSession(authOptions)


    if (user?.permissions[0].offersAndDiscounts) {



        try {
            console.log(formData)
            const updateData={}
            if (formData.get('discountValue')) {
                updateData.discountValue = parseFloat(formData.get('discountValue'))
                
            }
            if (formData.get('minOrderValue')) {
                updateData.minOrderValue = parseFloat(formData.get('minOrderValue'))
                
            }
         
            const newCoupon = await db.coupons.update({
                where:{
                    id:formData.get('id')
                },data:{...updateData,createdBy:{connect:{id:user.id}}}
            })
            console.log(newCoupon)

   revalidatePath('/wah-control-center/coupons')

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