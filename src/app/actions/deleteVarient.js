"use server"

import db from "@/lib/db";
import fs from 'fs';
import path from 'path';

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { revalidatePath } from "next/cache";
function formatString(str) {
    console.log(str)
    return str.toLowerCase().replace(/\s+/g, '');
}
async function deleteVarient(ids) {





    const user = await getServerSession(authOptions)
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {
                if (user.permissions[0].productAndInventory) {
                    const vari = await db.varient.findUnique({
                        where: {
                            id: ids
                        },

                        select:{
                            isDefault:true
                        }
                    })
                    if (vari.isDefault === true) {
                        return {
                            success: false,
                            message: "Please change the default varient and try again",
                            
                         
    
                        }

                        
                    }

                    const delVarient = await db.varient.delete({
                        where: {
                            id: ids
                        }
                    })
                    
            
                 
                  







                    return {
                        success: true,
                        message: "product deleted",
                        
                     

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
export default deleteVarient