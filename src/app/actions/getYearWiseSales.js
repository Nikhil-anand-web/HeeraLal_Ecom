"use server"

import db from "@/lib/db";

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'


async function getYearWiseSales(year) {





    const user = await getServerSession(authOptions)
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {
                const monthlyData = await db.orders.groupBy({
                    by: ['createdAt'], // Group by the createdAt field (later we'll extract the month)
                    _sum: {
                        finalPrice: true, // Sum of the finalPrice field
                    },
                    _count: {
                        id: true, // Optional: count the number of orders in each month
                    },
                    orderBy: {
                        createdAt: 'asc', // Order the result by the created date
                    },
                    where: {
                        AND:[{ createdAt: {
                            gte: new Date(`${year}-01-01`), // Filter to only include orders from 2024
                            lt: new Date(`${year+1}-01-01`), // Make sure it only includes up to the end of 2024
                        },},{orderStatus:2},{paymentStatus:1}]
                       
                    }
                });
                console.log(monthlyData)

                // Processing the result to group by month
                const result = monthlyData.reduce((acc, order) => {
                    const month = order.createdAt.getMonth() + 1; // Extract month from createdAt (getMonth() is zero-based)
                    const year = order.createdAt.getFullYear(); // Extract year from createdAt
                    const key = `${year}-${month < 10 ? '0' + month : month}`; // Format as "YYYY-MM"

                    if (!acc[key]) {
                        acc[key] = { month: key, finalPriceSum: 0, orderCount: 0 };
                    }

                    acc[key].finalPriceSum += order._sum.finalPrice || 0; // Accumulate the sum of finalPrice
                    acc[key].orderCount += order._count.id; // Accumulate the order count

                    return acc;
                }, {});

                // Convert the result object to an array
                const monthlyFinalPriceArray = Object.values(result);

                return{
                    message:"success",
                    success:true,
                    data:monthlyFinalPriceArray
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
export default getYearWiseSales
