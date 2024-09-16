"use server"
import db from "@/lib/db";
import messageOtp from "@/lib/messageOtp";
import twilioI from "@/lib/messageOtp";
import speakeasy from 'speakeasy';

export default async function sendOtpPhone(identifire) {
    try {
        const secretForMessage = await speakeasy.generateSecret();
        const tokenForMessage = speakeasy.totp({ secret: secretForMessage.base32, encoding: 'base32' });
       
        const userAccount = await db.user.update({
            where: {
                email: identifire
            },
            data: {
                otpMobile: tokenForMessage,
            },select:{
                mobile:true,
                firstName:true,
               


            }
        });

        if (!userAccount.mobile) {
            return {
                redirect: true,
                url: '/'
            };
        }

       await messageOtp(`${tokenForMessage}`, userAccount.mobile,userAccount.firstName);
   
        return {
            message: "OTP has been sent to your phone",
            success: true
        };

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error.meta?.cause || "internal server error",
        };
    }
}
