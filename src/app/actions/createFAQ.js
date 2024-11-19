"use server"

import db from "@/lib/db";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'



async function createFAQ(formData) {





    const user = await getServerSession(authOptions)
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {
                if (user.permissions[0].complementaryContentManagement) {







                    const newfaq = await db.faqs.create({
                        data: {
                            question: formData.get('question'),
                            answer: formData.get('answer'),
                            createdBy: {
                                connect: { id: user.id }, // Provide the actual admin ID
                            },


                        }
                    })

                    if (newfaq) {
                        return {
                            success: true,
                            message: "success"
                        }

                    } else {
                        throw Error("something went wronf")
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
export default createFAQ
