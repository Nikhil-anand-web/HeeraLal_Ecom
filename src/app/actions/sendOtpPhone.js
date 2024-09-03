"use server"
import db from "@/lib/db";
import twilioI from "@/lib/twilioI";
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
            }
        });

        if (!userAccount.mobile) {
            return {
                redirect: true,
                url: '/'
            };
        }

        console.log(await twilioI(`this is your otp ${tokenForMessage}`, userAccount.mobile));
   
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
