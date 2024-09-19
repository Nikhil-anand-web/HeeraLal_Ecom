"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { revalidatePath } from "next/cache"
import totalCartValue from "@/lib/totalCartValue"
import generateOrderId from "@/lib/generateOrderId"
import { redirect } from "next/navigation"

export default async function checkOutCart() {
    const user = await getServerSession(authOptions)


    if (user) {
        if (user.mobileVerified===false) {
            redirect('/verifyPhone')
            
        }



        try {
            const userCart = await db.cart.findUnique({
                where: {
                    userId: user.id

                },
                select: {
                    cartItem: {
                        select: {
                            qty: true,
                            varient: {
                                select: {
                                    id: true,
                                    productId: true,
                                    slug:true,
                                    product: {

                                        select: {
                                            name: true,
                                            highLights: true,
                                            thumbNail: true,
                                            slug:true,
                                            category: {
                                                select: { categoryName: true }
                                            }

                                        }


                                    },
                                    mrp: true,
                                    discount: true,
                                    weight: true,
                                    size: true,
                                    isBulk: true
                                }
                            }
                        }
                    },
                    refralDiscountAbsolute:true,
                    referalCoins:true,
                    coupon: {
                        select: {
                            id: true,
                            code: true,
                            type: true,
                            discountValue: true,
                            minOrderValue: true

                        }


                    },
                    cartComboItems: {
                        select: {
                            qty: true,
                            combo: {
                                select: {
                                    id: true,
                                    name:true,
                                    productVarients: {
                                        select: {
                                            id: true,
                                            productId: true,
                                            slug:true,
                                            product: {
                                                select: {
                                                    name: true,
                                                    highLights: true,
                                                    thumbNail: true,
                                                    slug:true,
                                                    category: {
                                                        select: { categoryName: true }
                                                    }

                                                }


                                            },
                                            mrp: true,
                                            discount: true,
                                            weight: true,
                                            size: true,
                                            isBulk: true
                                        }
                                    },
                                    discountInPercent: true

                                }
                            },


                        }
                    }
                }
            })
            const tax = await db.globalSettings.findFirst({
                where: {
                    settingName: "gstRate"
                }
            })
            const productIds = new Set()
            const productMeta = new Set()
            const varientIds = new Set()
            const varientMeta = []
            const comboIds = []
            const comboMeta = []
            const couponMeta = userCart.coupon
            const Subtotal = totalCartValue(userCart)
            const taxValueInPercent = tax.value


            userCart.cartItem.forEach(itm => {
                productIds.add(itm.varient.productId)
                productMeta.add(itm.varient.product)
                varientIds.add(itm.varient.id)
                varientMeta.push(itm)


            });
            userCart.cartComboItems.forEach(itm => {
                comboIds.push(itm.combo.id)
                comboMeta.push(itm)


            })
   



            const order = await db.orders.create({
                data: {
                    orderId: generateOrderId().toString(),
                    customerId: user.id,
                    productIds: [...productIds],
                    varientIds: [...varientIds],
                    varientMeta: varientMeta,
                    comboIds: comboIds,
                    comboMeta: comboMeta,
                    couponMeta: couponMeta,
                    subTotal: Subtotal,
                    taxes: taxValueInPercent,
                    productMeta:[...productMeta],
                    refralDiscountAbsolute:userCart.refralDiscountAbsolute,
                    referalCoins:userCart.referalCoins



                }, select: {
                    orderId: true,
                    refralDiscountAbsolute:true,
                    referalCoins:true
                }
            })


      console.log(order)











            revalidatePath('/cart')
            return {
                success: true,
                message: `order initiated`,
                order


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