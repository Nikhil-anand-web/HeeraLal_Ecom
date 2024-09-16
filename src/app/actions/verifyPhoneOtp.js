"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import db from "@/lib/db";

export default async function verifyPhoneOtp(otp) {
    const user = await getServerSession(authOptions)
    if (user) {
        try {
            const updated = await db.user.update({
                where: {
                    id: user.id,
                    AND: [{ id: user.id }, { otpMobile: otp }]
                }, data: {
                    mobileVerified: true
    
                }
            })
            return{
                success:true,
                message :"verified"
            }
            
        } catch (error) {
            console.log(error)
            return{
                success:false,
                message :"otp not mached"
            }

            
        }
       


    }

}