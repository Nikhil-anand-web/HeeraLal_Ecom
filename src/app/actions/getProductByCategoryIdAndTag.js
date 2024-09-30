"use server"
import db from "../../lib/db"
async function serializeProductArray(products) {

    const nw = await products.map(product => {
        product.varient.forEach((varen) => {

            varen.mrp = varen.mrp.toNumber()


        })
        return product

    });

    return nw

}

export default async function getProductByCategoryIdAndTag(ids, tag) {


    try {
        if (ids === '' || !ids) {
            const products = await db.product.findMany({
                where: {

                    AND:[{tags: {
                        array_contains: tag,  
                    }},{
                        
                            showOnHome:true
                        
                    },{status:true}]
                },

                select: {
                    id: true,
                    name: true,
                    stars: true,
                    thumbNail: true,
                    slug:true,
                    varient: {
                        where: {
                            isDefault: true
                        },
                        select: {
                            id: true,
                            mrp: true,
                            discount:true,
                            
                        }

                    }

                }
            })
            const serialProducts = await serializeProductArray(products)


            return {
                success: true,
                message: "fetched successfully",
                serialProducts

            }


        }
        const products = await db.product.findMany({
            where: {
                AND:[{categoryId: ids},{status:true}],
                AND:
                    [{
                        tags: {
                            array_contains: tag,
                        },
                    }, {
                        categoryId: ids
                    },{
                        showOnHome:true
                    },{
                        status:true
                    }

                    ]


            },
            select: {
                id: true,
                name: true,
                stars: true,
                thumbNail: true,
                slug:true,
                varient: {
                    where: {
                        isDefault: true
                    },
                    select: {
                        id: true,
                        discount:true,
                        mrp:true
                    }

                }

            }
        })
        const serialProducts = await serializeProductArray(products)
        console.log(serialProducts)
        return {
            success: true,
            message: "fetched successfully",
            serialProducts

        }



    } catch (error) {
        console.log(error)


        return {
            success: false,
            message: error.meta?.cause || "internal server error",


        }


    }

}