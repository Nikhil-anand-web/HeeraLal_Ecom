"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { revalidatePath } from "next/cache"
import totalCartValue from "@/lib/totalCartValue"
import percentOf from "@/lib/percentOf"


export default async function applyReferalPoint() {
    const user = await getServerSession(authOptions)


    if (user) {

        
        
        try {
            const referal = await db.referal.findUnique({
                where:{
                    userId:user.id
                }
            })

            if (referal.coins<=0) {
                return{
                    success:false,
                    message:"you dont have a coin"
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
           const cartValue = totalCartValue(cart)
            const referalConstrain = await db.globalSettings.findFirst({
                where:{
                    settingName:"refralDiscount"
                }
            })

            const coinCanBeApplied  =  Math.floor(percentOf(cartValue,referalConstrain.dependency))
            const coinsToBeApplied = coinCanBeApplied>referal.coins?referal.coins:coinCanBeApplied
            const refralDiscountAbsolute= coinsToBeApplied*1
        

            await db.cart.update({
                where:{
                    userId:user.id
                },data:{
                    refralDiscountAbsolute:refralDiscountAbsolute,
                    referalCoins:coinsToBeApplied


                }
            })

        
          
         
    
         

            
           

           

            

           




            revalidatePath('/cart')
            return {
                success: true,
                message: `Applied`,


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