"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import db from "@/lib/db"
import { getServerSession } from "next-auth";



export default async function toggleRevBannerStatus(id) {
    const user = await getServerSession(authOptions)
   

    


    if (user.permissions[0].siteManagement) {
        const currestStatus =  await db.ratingAndReviews.findUnique({
            where:{
                id:id
            },select:{
                showOnBanner:true
            }
        })

        await db.ratingAndReviews.update({
            where:{
                id:id
            },data:{
                showOnBanner:!currestStatus.showOnBanner
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