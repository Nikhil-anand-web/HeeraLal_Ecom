"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import db from "@/lib/db"
import { data } from "jquery";
import { getServerSession } from "next-auth";



export default async function toggleRevStatus(id) {
    const user = await getServerSession(authOptions)
   

    


    if (user.permissions[0].siteManagement) {
        const currestStatus =  await db.ratingAndReviews.findUnique({
            where:{
                id:id
            },select:{
                isActive:true
            }
        })

        await db.ratingAndReviews.update({
            where:{
                id:id
            },data:{
                isActive:!currestStatus.isActive
            }
        })




        try {
            
            return {
                success: true,
                message: `success`,
                


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