"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";



export default async function getSearchedPublicApplication(searchTerm, itemsPerPage, pageNo) {
    const user = await getServerSession(authOptions)
    console.log(itemsPerPage,"h",pageNo)

    if (user) {
        if (user.permissions.at(0)?.complementaryContentManagement) {
            try {
                if (searchTerm === '') {
                    return {
                        success: true,
                        message: `result`,
                        queries: await db.dealerShipForm.findMany({

                            orderBy: {
                                createdAt: 'desc'


                            },

                            skip: (parseInt(pageNo) - 1) * parseInt(itemsPerPage), // Move skip here
                            take: parseInt(itemsPerPage) // Move take here
                        })


                    }

                }

                const queries = await db.dealerShipForm.findMany({
                    where: {
                        OR: [
                            { firmName: { contains: searchTerm } },
                            { lastName: { contains: searchTerm } },
                            { pincode: { contains: searchTerm } },
                            { mobile: { contains: searchTerm } },
                            { telephone: { contains: searchTerm } },
                            { firmName: { contains: searchTerm } },
                            { firmAddress: { contains: searchTerm } },
                            { firmName: { contains: searchTerm } },


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



