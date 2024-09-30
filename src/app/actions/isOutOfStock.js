

"use server"
import db from "@/lib/db"


export default async function isOutOfStock(ids ) {
   




    try {
        
        const stockOfVarient = await db.varient.findUnique({
            where: {
                id: ids
            }, select: {
                qty: true
            }
        })
        if (stockOfVarient.qty < 1) {
            return {
                success: true,
                message: "outOfStock",
                data:{isOutOfStock:true}

            }


        }else{
            return {
                success: true,
                message: "inStock",
                data:{isOutOfStock:false}

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