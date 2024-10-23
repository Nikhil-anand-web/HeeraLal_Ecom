"use server"

import db from "@/lib/db";

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import isInt from "@/lib/isInt";
import isFloat from "@/lib/isFloat";

function formatString(str) {
    return str.toLowerCase().replace(/\s+/g, '');
}


async function updateVarient(formData) {
    console.log(formData)
    
    const requestData = {}
    await formData.forEach((value, key) => {
        if (key !== 'parentProductSlug' && key !== 'varient' && key !== 'append') {
            if (key === "isBulk") {
                requestData[key] = value==="false"?false:true


            } else

                if (key === 'qty' && (formData.get('append') === 'true' ||formData.get('append') === 'on') && value !== '') {
                    requestData[key] = {
                        increment: isInt(value) ? +value : value,
                    }

                } else {
                    requestData[key] = isInt(value) ? +value : (isFloat(value) ? parseFloat(value) : value)

                }


        }

    });
    console.log(requestData)
    const updateData = Object.fromEntries(
        Object.entries(requestData).filter(([_, value]) => value !== null && value !== undefined && value !== '')
    );
    console.log(updateData)







    const user = await getServerSession(authOptions)
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {
                if (user.permissions[0].productAndInventory) {




                    const newProduct = await db.varient.update({
                        where: {
                            id: formData.get('varient')
                        },
                        data: {
                            ...updateData,
                            createdBy: {
                                connect: { id: user.id },
                            },
                        }
                    });






                    return {
                        success: true,
                        message: "updated !!",


                    }








                }

            } catch (error) {
                console.log(error)

                return {
                    success: false,
                    message:error.code==='P2002'?"unique constrain void": error.meta?.cause || "internal server error",

                }

            }

        }

    }


}
export default updateVarient
