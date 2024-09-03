

"use server"
import db from "@/lib/db"


export default async function isRemainingFew(ids = '') {





    try {

        const stockOfVarient = await db.varient.findUnique({
            where: {
                id: ids
            }, select: {
                qty: true,
                maxQuantityForFewAvailable: true
            }
        })
      

        return {
            success: true,
            message: "remainingFew",
            data: { isRemaningFew: (stockOfVarient.qty < stockOfVarient.maxQuantityForFewAvailable) }

        }








    } catch (error) {
        console.log(error)

        return {
            success: false,
            message: error.meta?.cause || "internal server error",

        }

    }

}