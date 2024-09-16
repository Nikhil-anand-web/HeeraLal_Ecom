"use server"
import db from "@/lib/db";
import resend from "@/lib/resend";
import twilioI from "@/lib/messageOtp";
import speakeasy from 'speakeasy';
import messageOtp from "@/lib/messageOtp";
export default async function sendOtps(identifire) {
    console.log(identifire)

    try {
        const secretForMessage = await speakeasy.generateSecret();
        const tokenForMessage =  speakeasy.totp({ secret: secretForMessage.base32, encoding: 'base32' });
        const secretForEmail = await speakeasy.generateSecret();
        const tokenForEmail =  speakeasy.totp({ secret: secretForEmail.base32, encoding: 'base32' });
        const userAccount =await db.user.update({
            where: {
                email: identifire
            },
            data: {
                otpMobile:tokenForMessage,
                otpEmail:tokenForEmail,

            },select:{
                mobile:true,
                firstName:true,
                email:true


            }
        })
 

        console.log(await messageOtp(`${tokenForMessage}`, userAccount.mobile,userAccount.firstName))
        console.log(await resend(tokenForEmail, userAccount.email))
        return{
            message:"email has been sent to your phone and email",
            success:true
        }


    } catch (error) {
        console.log(error.code)
        return {
            success: false,
            message: error.code==="P2002"? "The field's value is already present": error.meta?.cause || "internal server error",
   
         }


    }




}