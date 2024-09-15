"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"


export default async function getSearchedCustomer(searchTerm,itemsPerPage,pageNo) {
    const user = await getServerSession(authOptions)


    if (user.permissions[0].consumerAndOrderManagement) {



        try {
            if (searchTerm === '') {
                return {
                    success: true,
                    message: `result`,
                    customers: await db.user.findMany({
                        select: {
                            firstName: true,
                            id: true,
                            lastName: true,
                            email: true,
                            status: true,
                            mobile:true,
                            googleProfilePic:true,
                            mobileVerified:true,
                            emailVerified:true
                            
                        },
                        skip: (parseInt(pageNo) - 1) * parseInt(itemsPerPage), // Move skip here
                        take: parseInt(itemsPerPage) // Move take here
                    })//if user increase here we can optimise


                }

            }

            const customers = await db.user.findMany({
                where: {
                    OR: [
                        { firstName: { contains: searchTerm } },
                        { mobile: { contains: searchTerm } },
                        { email: { contains: searchTerm } },
                        { lastName: { contains: searchTerm } },

                    ]
                }, select: {
                    firstName: true,
                    id: true,
                    lastName: true,
                    email: true,
                    status: true,
                    mobile:true,
                    googleProfilePic:true,
                    mobileVerified:true,
                    emailVerified:true
                    
                }

            });

















            return {
                success: true,
                message: `result`,
                customers


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