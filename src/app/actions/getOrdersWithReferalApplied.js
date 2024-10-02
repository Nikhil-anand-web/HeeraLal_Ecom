"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"


export default async function getOrdersWithReferalApplied(searchTerm, itemsPerPage, pageNo) {
    const user = await getServerSession(authOptions)


    if (user.permissions[0].consumerAndOrderManagement) {



        try {
            if (searchTerm === '') {
                return {
                    success: true,
                    message: `result`,
                    orders: await db.orders.findMany({
                        where: {
                            AND: [{refralDiscountAbsolute:{not:0}},{paymentStatus:1}]

                        },
                        select: {
                            orderId: true,
                            id: true,
                            CustomerMeta: true,
                            finalPrice: true,
                            createdAt: true,
                            paymentStatus: true,
                            orderStatus: true,
                            shipingStatus: true,
                            awb: true,
                            paymentToken: true,
                            totalWeight: true,
                            shortItmStatus:true,
                            shortItmsMeta:true


                        }, orderBy: {
                            createdAt: 'desc'


                        },

                        skip: (parseInt(pageNo) - 1) * parseInt(itemsPerPage), // Move skip here
                        take: parseInt(itemsPerPage) // Move take here
                    })//if user increase here we can optimise


                }

            }

            const orders = await db.$queryRaw`
  SELECT orderId ,id,CustomerMeta,finalPrice,createdAt,paymentStatus,orderStatus,shipingStatus,awb,totalWeight,shortItmStatus,shortItmsMeta
FROM orders
WHERE( JSON_EXTRACT(CustomerMeta, '$.firstName') LIKE CONCAT('%', ${searchTerm}, '%')
   OR JSON_EXTRACT(CustomerMeta, '$.lastName') LIKE CONCAT('%', ${searchTerm}, '%')
   OR JSON_EXTRACT(CustomerMeta, '$.email') LIKE CONCAT('%', ${searchTerm}, '%')
   OR JSON_EXTRACT(CustomerMeta, '$.mobile') LIKE CONCAT('%', ${searchTerm}, '%')
   OR orderId LIKE CONCAT('%', ${searchTerm}, '%')
   OR JSON_EXTRACT(productMeta, '$.name') LIKE CONCAT('%', ${searchTerm}, '%')
   OR JSON_EXTRACT(productMeta, '$.slug') LIKE CONCAT('%', ${searchTerm}, '%'))
   AND paymentStatus=1
   AND refralDiscountAbsolute IS NOT NULL

`;







 console.log(orders)








            return {
                success: true,
                message: `result`,
                orders


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