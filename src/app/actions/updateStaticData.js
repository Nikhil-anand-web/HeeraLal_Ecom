"use server"

import db from "@/lib/db";

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'



async function updateStaticData(obj) {




    const user = await getServerSession(authOptions)
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {
                if (user.permissions[0].siteManagement) {

                    if (obj.key == "companyAddress") {
                        const values = obj.value.split('$')
                        const jsonTOUpdate = [
                            {area: values.at(0)},
                            {cityAndState: values.at(1)},
                           { country: values.at(2)}
                        ]
                        await db.staticInfo.updateMany({
                            where: {
                                key: obj.key

                            }, data: {
                                value: jsonTOUpdate


                            }
                        })

                        return {
                            success: true,
                            message: "updated successfully !!",



                        }



                    } else {
                        await db.staticInfo.updateMany({
                            where: {
                                key: obj.key

                            }, data: {
                                value: [{data:obj.value}]


                            }
                        })




                    }


                    return {
                        success: true,
                        message: "updated successfully !!",



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
export default updateStaticData
