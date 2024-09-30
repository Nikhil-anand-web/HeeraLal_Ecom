"use server"

import db from "@/lib/db"


export default async function getCategories() {


    try {
        const categories = await db.category.findMany({
            where:{
                status:1

            },
            select:{
                id:true,
                categoryName:true,

            }
        })
        return {
            success: true,
            message: "fetched successfully",
            categories

        }


    } catch (error) {
        console.log(error)
     

        return {
            success: false,
            message: error.meta?.cause || "internal server error",
            

        }


    }

}