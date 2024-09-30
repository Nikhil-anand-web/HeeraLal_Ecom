"use server"

import db from "@/lib/db";
import validatePhoneNumber from "@/lib/validatePhoneNumber";
import bcryptjs from "bcryptjs";



export async function createAUser(formData) {



   // Generate a TOTP (Time-based One-Time Password)
   // const secretForMessage = speakeasy.generateSecret();
   // const tokenForMessage = speakeasy.totp({ secret: secretForMessage.base32, encoding: 'base32' });
   // const secretForEmail = speakeasy.generateSecret();
   // const tokenForEmail = speakeasy.totp({ secret: secretForEmail.base32, encoding: 'base32' });
   // console.log(await twilioI(`this is your otp ${tokenForMessage}`,"+917979864022"))
   // console.log(await resend(tokenForEmail,"anandnikhil799@gmail.com"))
   try {
      if (formData.get('password') !== formData.get('cnfPassword')) {
         return {
            success: false,
            message: "password dont match"
         }

      }
      const requestData = {}
      formData.forEach((value, key) => {

         if (key !== 'cnfPassword') {
            requestData[key] = value

         }




      });
      requestData.password = await bcryptjs.hash(formData.get('password'), 10)
      console.log(requestData)
      if (!validatePhoneNumber(requestData.mobile)) {
         return {
            success: false,
            message: "enter a valid phone number"
         }

      } else {
         requestData.mobile = validatePhoneNumber(requestData.mobile)

      }

      const newuser = await db.user.create({
         data: requestData

      })
      if (newuser) {

         const cart = await db.cart.create({
            data: {
               user: { connect: { id: newuser.id } }
            }
         })
         const refral = await db.referal.create({
            data: {
               user: { connect: { id: newuser.id } }
            }
         })

      }

      console.log(newuser)


      return {
         success: true,
         message: "Account created !!"


      }

   } catch (error) {
      console.log(error)

      return {
         success: false,
         message:error.code==='P2002'?"phone or email already registered": error.meta?.cause || "internal server error",

      }


   }



}