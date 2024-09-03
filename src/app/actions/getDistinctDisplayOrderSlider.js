"use server"

import db from "@/lib/db";

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'


async function getDistinctDisplayOrderSlider(pageSlug) {


        


    const user = await getServerSession(authOptions)
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {
                if (user.permissions[0].siteManagement) {



                    const displayOrders = await db.slider.findMany({
                        where: {
                          pageSlug: pageSlug,
                        },
                        distinct: ['displayOrder'],
                        select: {
                          displayOrder: true,
                        },
                      });


                    console.log(displayOrders, "fgdfgdfgdfgdr")


                    return {
                        success: true,
                        message: "fetched success",
                        displayOrders


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

    }


}
export default getDistinctDisplayOrderSlider
