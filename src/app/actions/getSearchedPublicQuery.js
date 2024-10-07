"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";



export default async function getSearchedPublicQuery(searchTerm, itemsPerPage, pageNo) {
    const user = await getServerSession(authOptions)

    if (user) {
        if (user.permissions.at(0)?.complementaryContentManagment) {
            try {
                if (searchTerm === '') {
                    return {
                        success: true,
                        message: `result`,
                        queries: await db.queries.findMany({

                            orderBy: {
                                createdAt: 'desc'


                            },

                            skip: (parseInt(pageNo) - 1) * parseInt(itemsPerPage), // Move skip here
                            take: parseInt(itemsPerPage) // Move take here
                        })//if user increase here we can optimise


                    }

                }

                const queries = await db.queries.findMany({
                    where: {
                        OR: [
                            { name: { contains: searchTerm } },
                            { message: { contains: searchTerm } },
                            { email: { contains: searchTerm } },


                        ]
                    }

                });

















                return {
                    success: true,
                    message: `result`,
                    queries


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

}



