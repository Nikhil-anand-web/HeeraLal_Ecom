"use server"

import db from "@/lib/db";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'



async function createCoupon(formData) {





    const user = await getServerSession(authOptions)
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {
                if (user.permissions[0].offersAndDiscounts) {
                     console.log(formData)
                     const newCoupon = await db.coupons.create({
                        data:{
                            code:formData.get('code'),
                            type:formData.get('type'),
                            discountValue:parseFloat(formData.get('discountvalue')),
                            minOrderValue:parseFloat(formData.get('minOrderValue')),
                            createdBy:{connect:{id:user.id}}
                        }

                     })
                   console.log(newCoupon)


                    return {
                        success: true,
                        message: "coupon created",

                    }



                }

            } catch (error) {
                console.log(error)

                return {
                    success: false,
                    message: error.meta?.cause || (error.code==='P2002'?"code exist":false)||"internal server error",

                }

            }

        }

    }


}
export default createCoupon
