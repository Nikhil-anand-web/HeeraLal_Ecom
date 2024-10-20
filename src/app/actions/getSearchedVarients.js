"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"


export default async function getSearchedVarients(searchTerm, pageNo, itemsPerPage) {
    const user = await getServerSession(authOptions)
    console.log(itemsPerPage, pageNo);

    if (user.permissions[0].productAndInventory) {



        try {
            if (searchTerm === '') {
                return {
                    success: true,
                    message: `result`,
                    varients: await db.varient.findMany({
                        select: {
                            id: true,
                            slug: true,
                            product: {
                                select: {
                                    slug: true,
                                    thumbNail: true,
                                    category: {
                                        select: {
                                            slug: true
                                        }

                                    }
                                }
                            },
                            weight: true,
                            size: true,
                            qty: true,
                            status: true,
                            maxQuantityForFewAvailable: true,
                            mrp: true,
                            wholeSalePrice: true,
                            minQtyForBulkOrder: true,
                            isDefault: true,
                            qty: true,
                            isBulk: true,
                            discount: true,
                            _count: {
                                select: {
                                    combo: true
                                }

                            },
                            // combo: {
                            //     select: {
                            //       name: true, // Assuming 'name' is a field in the 'combo' model
                            //     }},
                            createdBy: {
                                select: {
                                    userName: true
                                }
                            }


                        },
                        skip: (parseInt(pageNo) - 1) * parseInt(itemsPerPage), // Move skip here
                        take: parseInt(itemsPerPage) // Move take here


                    }),


                }


            }

            const varients = await db.varient.findMany({
                where: {
                    OR: [
                        { slug: { contains: searchTerm } },
                        { product: { slug: { contains: searchTerm } } },
                        { product: { name: { contains: searchTerm } } },
                        { product: { category: { categoryName: { contains: searchTerm } } } },
                    ]
                },
                select: {
                    id: true,
                    slug: true,
                    product: {
                        select: {
                            slug: true,
                            thumbNail: true,
                            category: {
                                select: {
                                    slug: true
                                }

                            }
                        }
                    },
                    weight: true,
                    size: true,
                    qty: true,
                    status: true,
                    maxQuantityForFewAvailable: true,
                    mrp: true,
                    wholeSalePrice: true,
                    minQtyForBulkOrder: true,
                    isDefault: true,
                    qty: true,
                    isBulk: true,
                    discount: true,
                    _count: {
                        select: {
                            combo: true
                        }

                    },

                    createdBy: {
                        select: {
                            userName: true
                        }
                    }


                },

            });
            return {
                success: true,
                message: `result`,
                varients


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