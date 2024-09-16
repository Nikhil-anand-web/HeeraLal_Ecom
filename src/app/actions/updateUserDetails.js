"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import bcryptjs from "bcryptjs"
import isFloat from "@/lib/isFloat"
import isInt from "@/lib/isInt"
import validatePhoneNumber from "@/lib/validatePhoneNumber"
import { redirect } from "next/navigation"



async function updateUserDetails(formData) {


    const user = await getServerSession(authOptions)

    if (user) {
        try {

            const requestData = {}
            await formData.forEach((value, key) => {
                if (key!=='mobile') {
                    requestData[key] = isInt(value) ? +value : (isFloat(value) ? parseFloat(value) : value)
                    
                    
                }else{
                    requestData[key]=value

                }

             






            });

            const updateData = Object.fromEntries(
                Object.entries(requestData).filter(([_, value]) => value !== null && value !== 'undefined' && value !== '')
            );
            if (updateData.mobile) {
               
              
                if (!validatePhoneNumber(updateData.mobile)) {
                    return {
                        success: false,
                        message: `please put country code in phone number`
                    }

                }else{
                    updateData.mobile=validatePhoneNumber(updateData.mobile)
                    updateData.mobileVerified = false

                }
            }
            const nw = await db.user.update({
                where: {
                    id: user.id
                },
                data: {
                    ...updateData,
                    


                }
            })
           
             console.log(nw)
            if (!nw.mobileVerified) {
                return {
                    success: true,
                    message: `profile updated login again to see the changes`,
                    redirect:'/verifyPhone'
                }
                
                
            }



            return {
                success: true,
                message: `profile updated login again to see the changes`
            }



        } catch (error) {
            console.log(error)
            return ({
                success: false,
                message: error.code==="P2002"? "The field's value is already present": error.meta?.cause || "internal server error",
            })

        }


    }

}

export default updateUserDetails
