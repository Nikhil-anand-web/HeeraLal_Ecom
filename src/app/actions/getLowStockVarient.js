"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"


export default async function getLowStockVarient(searchTerm, pageNo, itemsPerPage) {
    const user = await getServerSession(authOptions)
    console.log(itemsPerPage, pageNo);

    if (user.permissions[0].productAndInventory) {



        try {
            const setting = await db.globalSettings.findFirst({
                where: {
                    settingName: "lowStockProduct"

                }
            })
            if (searchTerm === '') {
               



                return {
                    success: true,
                    message: `result`,
                    products: await db.varient.findMany({
                        where: {
                            qty: {
                                lt: setting.value
                            }
                        },
                        select: {
                            id: true,
                            slug: true,
                            product: {
                                select: {
                                    slug: true,
                                    thumbNail: true
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
                            createdBy:{
                                select:{
                                    userName:true

                                }
                               
                            }
                        },
                        skip: (parseInt(pageNo) - 1) * parseInt(itemsPerPage), // Move skip here
                        take: parseInt(itemsPerPage) // Move take here


                    }),


                }


            }

            const products = await db.varient.findMany({
                where: {
                   AND:[{ OR:  [
                    { product: { name: { contains: searchTerm } } }, // Searching in the product's name
                    { product: { description: { contains: searchTerm } } }, // Searching in the product's description
                    { product: { highLights: { contains: searchTerm } } }, // Searching in the product's highlights
                    { slug: { contains: searchTerm} }, // Searching in the variant's slug
                    { product: { slug: { contains: searchTerm } } }, // Searching in the product's slug
                    { product: { category: { categoryName: { contains: searchTerm } } } }, // Searching in the category's name
                  ]},{qty: {
                        lt: setting.value
                    }}]
                },
                select: {
                    id: true,
                    slug: true,
                    product: {
                        select: {
                            slug: true,
                            thumbNail: true
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
                    createdBy:{
                        select:{
                            userName:true

                        }
                       
                    }
                },

            });
            return {
                success: true,
                message: `result`,
                products


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