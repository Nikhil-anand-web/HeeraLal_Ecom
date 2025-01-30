"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import db from "@/lib/db"

const submitReview = async (obj) => {
    const user = await getServerSession(authOptions)


    try {
        if (user && user.role === 3) {

            const productdet = await db.product.findUnique({
                where: {
                    slug: obj.productSlug
                }, select: {
                    id: true
                }
            })

            const rev = await db.ratingAndReviews.create({
                data: {
                    customer: {
                        connect: {
                            id: user.id
                        }
                    },
                    product: {
                        connect: {
                            id: productdet.id

                        }
                    },
                    stars: obj.currentValue,
                    message: obj.review,
                   
                }
            })
            
            return {
                success : true,
                message : "Thanks for your review !!"
            }



        } else {
            throw {
                success: false,
                message: "please login"
            }
        }



    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message || "something went wrong"
        }

    }



}

export default submitReview
