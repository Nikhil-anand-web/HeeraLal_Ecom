"use server"
import db from "@/lib/db";
import resend from "@/lib/resend";
import bcryptjs from "bcryptjs";
import speakeasy from 'speakeasy';


export default async function senOtp2fa(identifire) {

    try {

      
        const secretForEmail = await speakeasy.generateSecret();
        const tokenForEmail = speakeasy.totp({ secret: secretForEmail.base32, encoding: 'base32' }).toString();

        const hashedOtp = await bcryptjs.hash(tokenForEmail, 10)
        const adminUser = await db.admin.findFirst({
            where: {
                OR: [{ email: identifire }, { userName: identifire }]
            }
        })
        if (!adminUser) {

            return {
                message: "cant find account",
                success: false
            }



        }
        const data = await db.twoFactorAuthAdmin.upsert({
            where: {
                adminId: adminUser.id,
            },
            update: {
                otpEmail: hashedOtp,
                admin: {
                    connect: { id: adminUser.id }
                }
            },
            create: {
                otpEmail: hashedOtp,
                admin: {
                    connect: { id: adminUser.id }
                }
            }
        });



        console.log(tokenForEmail,"data")
         
        console.log(await resend(tokenForEmail, adminUser.email))
        return {
            message: "email has been sent to your phone and email",
            success: true
        }


    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.code === "P2002" ? "The field's value is already present" : error.code === "P2025" ? "user not fount" : "internal server error",

        }


    }




}