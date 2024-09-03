"use server"
import db from "@/lib/db";
import resend from "@/lib/resend";
import twilioI from "@/lib/twilioI";
import speakeasy from 'speakeasy';
export default async function sendOtps(identifire) {
    console.log(identifire)

    try {
        const secretForMessage = await speakeasy.generateSecret();
        const tokenForMessage = await speakeasy.totp({ secret: secretForMessage.base32, encoding: 'base32' });
        const secretForEmail = await speakeasy.generateSecret();
        const tokenForEmail = await speakeasy.totp({ secret: secretForEmail.base32, encoding: 'base32' });
        const userAccount =await db.user.update({
            where: {
                email: identifire
            },
            data: {
                otpMobile:tokenForMessage,
                otpEmail:tokenForEmail
            }
        })
 

        console.log(await twilioI(`this is your otp ${tokenForMessage}`, userAccount.mobile))
        console.log(await resend(tokenForEmail, userAccount.email))
        return{
            message:"email has been sent to your phone and email",
            success:true
        }


    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.meta?.cause || "internal server error",
   
         }


    }




}