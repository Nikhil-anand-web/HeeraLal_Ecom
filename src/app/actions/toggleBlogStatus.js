"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { revalidatePath } from 'next/cache'

 async function toggleBlogStatus (ids) {
   
    console.log(ids)
    const user = await getServerSession(authOptions)

   if (user.permissions.at(0)?.complementaryContentManagment) {
    try {
        const obj = await db.blog.findUnique({
            where :{
                id:ids
            },
            select:{
                status:true
            }
        })
       console.log(obj)
        const updated = await  db.blog.update({
            where:{
                id:ids
            },
            data:{
                status : obj.status===0?1:0,
                author: { connect: { id: user.id } } 
            }
        })
        
        revalidatePath('/wah-control-center/blogs')
        
            return{
                success:true,
                message:`Blog ${updated.status===1?"activated":"deactivated"} Successfully`
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

export default toggleBlogStatus