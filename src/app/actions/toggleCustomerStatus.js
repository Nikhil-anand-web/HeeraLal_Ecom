"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { revalidatePath } from 'next/cache'

 async function toggleCustomerStatus (ids) {
   
    console.log(ids)
    const user = await getServerSession(authOptions)

   if (user.permissions.at(0)?.consumerAndOrderManagement) {
    try {
        const obj = await db.user.findUnique({
            where :{
                id:ids
            },
            select:{
                status:true
            }
        })
     
        const updated = await  db.user.update({
            where:{
                id:ids
            },
            data:{
                status : obj.status===false?true:false,
                lastEditedBy: { connect: { id: user.id } } 
            }
        })
        
        revalidatePath('/wah-control-center/customers')
        
            return{
                success:true,
                message:`Customer Account ${updated.status===true?"activated":"deactivated"} Successfully`
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

export default toggleCustomerStatus