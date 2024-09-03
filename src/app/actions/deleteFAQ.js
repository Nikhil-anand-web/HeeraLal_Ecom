"use server"
import fs from 'fs';
import path from 'path';
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { revalidatePath } from 'next/cache'

async function deleteFAQ(ids) {

    console.log(ids)
    const user = await getServerSession(authOptions)

    if (user.permissions.at(0)?.complementaryContentManagment) {
        try {

            const delfaq = await db.faqs.delete({
                where: {
                    id: ids
                }
            })
         
          
            console.log(delfaq)
            revalidatePath('/wah-control-center/faqs')

            return {
                success: true,
                message: "FAQ deleted Successfully"
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

export default deleteFAQ