"use server"

import db from "@/lib/db";

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'


async function getVarientById(id) {





    const user = await getServerSession(authOptions)
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {
                if (user.permissions[0].productAndInventory) {

                

                    const varient =  await db.varient.findUnique({
                        where:{
                            id:id

                        },
                        
                    })

               
           
                  

                    return {
                        success: true,
                        message: "fetched success",
                        varient

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
export default getVarientById
