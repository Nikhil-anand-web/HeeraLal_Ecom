"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import bcryptjs from "bcryptjs"


async function changeUserPassword(formData) {


    const user = await getServerSession(authOptions)

    if (user) {
        try {
           console.log(formData)

            const preDef =await  db.user.findUnique({
                where:{

                    id:user.id
                },
                select:{
                    password:true
                }
            })
            if (!preDef.password) {
                return {
                    success: false,
                    message: `this feature is unavailable for social sign-in`
                }
                
            }
            const isPasswordCorrect = await bcryptjs.compare(
                formData.get('password'),
                preDef.password
            );
            if (!isPasswordCorrect) {
                return {
                    success: false,
                    message: `old password is not correct`
                }
                
            }
            if (formData.get('newPassword')!== formData.get('newPasswordCnf')) {
                return {
                    success: false,
                    message: `New password did't matched`
                }
                
            }
            const newHashedPassword = await bcryptjs.hash(formData.get('newPassword'), 10)
            await db.user.update({
                where:{
                    id:user.id
                },
                data:{
                    password:newHashedPassword
                }
            })





            return {
                success: true,
                message: `password changed`
            }



        } catch (error) {
            console.log(error)
            return ({
                success: false,
                message: error.meta?.cause || "internal server error"
            })

        }


    }

}

export default changeUserPassword