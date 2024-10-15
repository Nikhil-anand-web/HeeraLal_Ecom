"use server"

import db from "@/lib/db";

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'


async function getCatById(ids) {





    const user = await getServerSession(authOptions)
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {
                if (user.permissions[0].productAndInventory) {



                    const category = await db.category.findUnique({
                        where: {
                            id: ids

                        },
                        select: {
                            id: true,
                            parent: {
                                select: {
                                    slug: true,
                                    id: true
                                }
                            },
                            slug: true,
                            categoryName: true,
                            parentId: true,
                            displayOrder: true,

                            status: true,
                            showOnHome: true,








                        }
                    })





                    return {
                        success: true,
                        message: "fetched success",
                        category

                    }








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
export default getCatById
