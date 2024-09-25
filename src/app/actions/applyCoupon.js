"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { revalidatePath } from "next/cache"
import totalCartValue from "@/lib/totalCartValue"

export default async function applyCoupon(code = '') {
    const user = await getServerSession(authOptions)


    if (user) {

        
        
        console.log(code)
        try {
            if (code === '' || !code) {
                return {
                    success: false,
                    message: "empty coupon",
    
    
                }
    
    
            }

            if (code==='welcome') {
                const count = await db.orders.count({
                    where:{
                        customerId:user.id

                    }
                })
                if (count>0) {
                    return {
                        success: false,
                        message: "This coupon is for first user",
        
        
                    }

                    
                }
                
            }


            const coupon = await db.coupons.findUnique({
                where:{
                    code:code,
                    AND:[{
                        status:true
                    }]
                    
                },select:{
                    minOrderValue:true,
                    id:true

                }
            })

            if (!coupon) {
                return {
                    success: false,
                    message: "wrong coupon",
    
    
                }
                
            }

            const cart = await db.cart.findUnique({
                where: { userId: user.id },
                select: {
                    cartItem: {
                        select: {
                            varient: {
                                select: {
                                    id: true,
                                    weight: true,
                                    product: {
                                        select: {
                                            name: true,
                                            thumbNail: true
        
                                        }
        
        
                                    },
                                    mrp: true,
                                    discount: true
        
                                }
        
                            },
                            qty: true,
        
                        },
        
        
        
                    },
                    coupon: {
                        select: {
                            code: true,
        
                            discountValue: true,
                            status: true,
                            minOrderValue: true,
                            type: true
                        }
                    },
                    cartComboItems: {
                        select: {
                            qty: true,
                            combo: {
                                select: {
                                    id: true,
                                    name: true,
                                    discountInPercent: true,
                                    name: true,
        
                                    productVarients: {
                                        select: {
                                            product: {
                                                select: {
        
                                                    thumbNail: true
        
                                                }
        
                                            },
                                            mrp: true,
                                            weight: true,
        
                                        }
                                    }
        
                                }
        
                            }
        
                        }
        
        
                    }
        
        
                }
            })
            if (cart.coupon) {
                return {
                    success: false,
                    message: "first remove previous coupon then try again",
    
    
                }
                
                
            }
            const value = totalCartValue(cart)
            if (value<coupon.minOrderValue) {
                return {
                    success: false,
                    message: `please add item worth ₹ ${coupon.minOrderValue-value} to apply this coupon`,
    
    
                }

                
            }

           

            

            const updatedCart = await db.cart.update({
                where:{
                    userId:user.id
                },data:{
                    coupon:{connect :{id:coupon.id}}

                }
            })




            revalidatePath('/cart')
            return {
                success: true,
                message: `${code} Applied`,


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