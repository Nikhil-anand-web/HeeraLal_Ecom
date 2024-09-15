"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"


export default async function getSearchedUser(searchTerm,itemsPerPage,pageNo) {
    const user = await getServerSession(authOptions)


    if (user.permissions[0].userUpdate) {



        try {
            if (searchTerm === '') {
                return {
                    success: true,
                    message: `result`,
                    users: await db.admin.findMany({
                        select: {
                            fullName: true,
                            id: true,
                            userName: true,
                            email: true,
                            status: true
                        },
                        skip: (parseInt(pageNo) - 1) * parseInt(itemsPerPage), // Move skip here
                        take: parseInt(itemsPerPage) // Move take here
                    })//if user increase here we can optimise


                }

            }

            const users = await db.admin.findMany({
                where: {
                    OR: [
                        { fullName: { contains: searchTerm } },
                        { userName: { contains: searchTerm } },
                        { email: { contains: searchTerm } },

                    ]
                }, select: {
                    fullName: true,
                    id: true,
                    userName: true,
                    email: true,
                    status: true
                }

            });

















            return {
                success: true,
                message: `result`,
                users


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