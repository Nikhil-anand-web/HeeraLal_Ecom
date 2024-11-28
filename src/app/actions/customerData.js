'use server'

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"

export default async function customerData() {
    const user = await getServerSession(authOptions)
    if (!(user && user.permissions[0].archives)) {
        return {
            success:false,
            data:null,
            message:"access denied"
        }
        
       
       

    }
    try {
        var customers = await db.user.findMany({
            include: {
                referedBy: {
                    select: {
    
                        mobile: true,
                        email: true,
                        firstName: true,
                        lastName: true
    
                    }
                },
                cart: {
                    select: {
                        cartItem: {
                            select: {
                                qty: true,
                                varient: {
                                    select: {
                                        id: true,
                                        slug: true,
                                        product: {
                                            select: {
                                                id: true,
                                                name: true
                                            }
                                        },
                                        mrp: true,
                                        weight: true,
                                        discount: true
    
                                    }
    
                                }
    
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
                                        productVarients: {
                                            select: {
                                                id: true,
                                                slug: true,
                                                product: {
                                                    select: {
                                                        id: true,
                                                        name: true
                                                    }
                                                },
                                                mrp: true,
                                                weight: true,
                                                discount: true
    
    
                                            }
                                        }
    
                                    }
    
                                }
    
                            }
                        },
                        coupon: true,
                        refralDiscountAbsolute: true
    
                    }
    
                },
                lastEditedBy: {
                    select: {
                        userName: true
                    }
                },
                referedTo: {
                    select: {
                        firstName: true,
                        email: true,
                        mobile: true,
                        lastName: true
    
                    }
                },
                referal: true
            }
    
        })
        return {
            success:true,
            message:"success",
            data:customers
        }
        
    } catch (error) {
        console.log(error)
        return {
            success:false,
            data:null,
            message:"something went wrong",
        }
        
    }
    
    

    
}