"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import db from "@/lib/db"
import { getServerSession } from "next-auth";



export default async function getSearchedReview(searchTerm, pageNo, itemsPerPage) {
    const user = await getServerSession(authOptions)


    if (user.permissions[0].siteManagement) {



        try {
            if (searchTerm === '') {
                return {
                    success: true,
                    message: `result`,
                    reviews: await db.ratingAndReviews.findMany({
                        include: {
                            customer: {
                                select: {
                                    firstName: true,
                                    lastName: true,
                                    email:true,
                                    mobile:true
                                }
                            },product:{
                                select:{
                                    slug:true,
                                    name:true
                                }

                            }
                        },
                        skip: (parseInt(pageNo) - 1) * parseInt(itemsPerPage), // Move skip here
                        take: parseInt(itemsPerPage) // Move take here


                    }),


                }


            }

            const reviews = await db.ratingAndReviews.findMany({
                where: {
                    OR: [
                        { message: { contains: searchTerm } },
                        
                        { customer: { firstName: { contains: searchTerm } } },
                        { customer: { lastName: { contains: searchTerm } } },
                        { customer: { email: { contains: searchTerm } } },
                        { customer: { mobile: { contains: searchTerm } } },
                    ]
                },
                include: {
                    customer: {
                        select: {
                            firstName: true,
                            lastName: true,
                            email:true,
                            mobile:true
                        }
                    },product:{
                        select:{
                            slug:true,
                            name:true
                        }

                    }
                },

            });
            return {
                success: true,
                message: `result`,
                reviews


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