"use server"

import db from "@/lib/db";

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'


async function getAllSliderImages(pageSlug, displayOrder) {





    const user = await getServerSession(authOptions)
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {
                if (user.permissions[0].siteManagement) {



                    const images = await db.slider.findFirst({
                        where: {

                            pageSlug: pageSlug,
                            AND: [
                                { displayOrder: +displayOrder },
                                {
                                    pageSlug: pageSlug

                                }
                            ]
                        },
                       
                        select: {
                            images: true,
                        },
                    });

                    console.log(images)


                    return {
                        success: true,
                        message: "fetched success",
                        images


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
export default getAllSliderImages
