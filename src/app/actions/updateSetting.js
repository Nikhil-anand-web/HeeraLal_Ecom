"use server"

import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { revalidatePath } from 'next/cache'

async function updateSetting(ids,formData) {

    console.log(ids)
    const user = await getServerSession(authOptions)

    if (user.permissions.at(0)?.globalSetting) {
        try {
            console.log(ids,formData.get('value'))
            const obj = {}
            if (formData.get('value')) {
                obj.value = +formData.get('value')
                
            }
            if (formData.get('dependency')) {
                obj.dependency = +formData.get('dependency')
                
            }
            obj.updatedBy =  { connect: { id: user.id } } 
            const updatedSetting = await db.globalSettings.update({
                where: {
                    id: ids
                },
                data:obj,
               

            })
         
          
            // console.log(delfaq)
            revalidatePath('/wah-control-center/globalSettings')

            return {
                success: true,
                message: "Setting Applied"
            }



        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: error.meta?.cause || "internal server error"
            }

        }


    }

}

export default updateSetting