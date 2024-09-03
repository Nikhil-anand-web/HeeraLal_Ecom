"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { revalidatePath } from 'next/cache'

 async function toggleVarientStatus (ids) {
   
    console.log(ids)
    const user = await getServerSession(authOptions)

   if (user.permissions.at(0)?.productAndInventory) {
    try {
        const obj = await db.varient.findUnique({
            where :{
                id:ids,
                AND:[{ id:ids},{
                    product:{
                        status:true
                    }
                }]
            },
            select:{
                status:true,
                isDefault:true
            }
        })
        if (!obj) {
            return ({
                success:false,
                message:`product is deactivated`
            })
            
        }
        if (obj.isDefault) {
            return ({
                success:false,
                message:`Please change the default varient and then try again`
            })
            
        }
        const updated = await  db.varient.update({
            where:{
                id:ids
            },
            data:{
                status : obj.status===true?false:true,
                createdBy: { connect: { id: user.id } } 
            }
        })
        
     
        
            return{
                success:true,
                message:`Product ${updated.status===true?"activated":"deactivated"} Successfully`
            }
            
       
        
    } catch (error) {
        console.log(error)
        return ({
            success: false,
            message: error.meta?.cause||"internal server error"
          })
        
    }
    
    
   }
  
}

export default toggleVarientStatus