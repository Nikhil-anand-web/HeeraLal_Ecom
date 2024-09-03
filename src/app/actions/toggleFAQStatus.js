"use server"

import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { revalidatePath } from 'next/cache'

 async function toggleFAQStatus (ids) {
   
    console.log(ids)
    const user = await getServerSession(authOptions)

   if (user.permissions.at(0)?.complementaryContentManagment) {
    try {
        const obj = await db.faqs.findUnique({
            where :{
                id:ids
            },
            select:{
                status:true
            }
        })
       console.log(obj)
        const updated = await  db.faqs.update({
            where:{
                id:ids
            },
            data:{
                status : obj.status===0?1:0
            }
        })
        
        revalidatePath('/wah-control-center/faqs')
        
            return{
                success:true,
                message:`faq ${updated.status===1?"activated":"deactivated"} Successfully`
            }
            
       
        
    } catch (error) {
        console.log(error)
        return{
            success: false,
            message: error.meta?.cause||"internal server error"
          }
        
    }
    
    
   }
  
}

export default toggleFAQStatus