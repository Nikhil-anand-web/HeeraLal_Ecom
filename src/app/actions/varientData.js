'use server'

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"

export default async function varientData() {
    const user = await getServerSession(authOptions)
    if (!(user && user.permissions[0].archives)) {
        return {
            success:false,
            data:null,
            message:"access denied"
        }
        
       
       

    }
    try {
        var varients = await db.varient.findMany({
            include: {
                product: {
                    select: {
                        name: true,
                        category: {
                            select: {
                                categoryName: true
                            }
                        }
                    }
                },
                createdBy:{
                    select:{
                        fullName:true
                        

                    }
                }
            }

        })
        const flatVar = varients.map((obj)=>{
            const nw = {
                ...obj,
                productName:obj.product.name,
                category:obj.product.category.categoryName,
                lastModified:obj.createdBy.fullName
                
            }
            delete nw.product
            delete nw.createdBy
           
            return nw

        })
        return {
            success:true,
            data:flatVar,
            message:"success",
        }
        
    } catch (error) {
        console.log(error)
        return {
            success:false,
            data:null,
            message:"success",
        }
        
    }
    
    

    
}