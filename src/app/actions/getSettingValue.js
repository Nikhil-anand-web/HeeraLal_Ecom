"use server"

import db from "@/lib/db";

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'


async function getSettingValue(settingName) {





    const user = await getServerSession(authOptions)
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {




                const setting = await db.globalSettings.findFirst({
                    where: {
                        settingName: settingName

                    },

                    select: {
                        value: true
                    },
                });

                console.log(setting)


                return {
                    success: true,
                    message: "fetched success",
                    value: setting.value


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
export default getSettingValue
