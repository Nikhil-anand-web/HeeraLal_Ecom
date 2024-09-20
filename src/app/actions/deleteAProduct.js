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
async function deleteAProduct(ids) {





    const user = await getServerSession(authOptions)
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {
                if (user.permissions[0].productAndInventory) {

                    const delProduct = await db.product.delete({
                        where: {
                            id: ids
                        }
                    })
                    // const uploadDirectory = path.join(process.cwd(), 'public', 'asset', "product", `${formatString(delProduct.name)}`);
                    // fs.rm(uploadDirectory, { recursive: true, force: true }, (err) => {
                    //     if (err) {
                    //         throw err
        
                    //     }
        
                    // })
            
                    revalidatePath('/wah-control-center/products')
                  







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
export default deleteAProduct