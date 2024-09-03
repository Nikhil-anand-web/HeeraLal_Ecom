"use server"

import bcryptjs from "bcryptjs"

export default async function resetUserCrediential(formData,identifire) {
    

    try {
       const passHash = await bcryptjs.hash(formData.get('newPassword'), 10)
        const userAccount =await db.user.findUnique({
            where: {
                email: identifire
            },
           select:{
            otpEmail:true,
            otpMobile:true
           }
        })
        if ((formData.get('otpEmail')!=='' && formData.get('otpEmail')!==null &&userAccount.otpEmail!==formData.get('otpEmail') )|| (formData.get('otpMobile')!=='' && formData.get('otpMobile')!==null &&userAccount.otpMobile!==formData.get('otpMobile'))) {
            return{
                success:false,
                message:"either email otp or mobile otp is incorrect"
            }
            
        }
        if (formData.get('otpEmail')) {
            await db.user.update({
                where:{
                    email:identifire,
                    AND:[
                        {email:identifire},
                        {otpEmail:formData.get('otpEmail')}
                    ]
                },
                data:{
                    emailVerified:true,
                    password:passHash
                }

            })
            
        }
        if (formData.get('otpMobile')) {
            await db.user.update({
                where:{
                    email:identifire,
                    AND:[
                        {email:identifire},
                        {otpMobile:formData.get('otpMobile')}
                    ]
                },
                data:{
                    mobileVerified:true,
                    password:passHash
                }

            })
            
            
        }
        return{
            message:'updated successfully',
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