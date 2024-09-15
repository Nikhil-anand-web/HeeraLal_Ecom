"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"


export default async function getQueryResult(searchTerm) {
    const user = await getServerSession(authOptions)


    if (true) {

        
        
        try {
            if (searchTerm==='') {
                return {
                    success: true,
                    message: `result`,
                    products:[]
    
    
                }
                
            }
            
            const products = await db.product.findMany({
                where: {
                  AND: [
                    {
                      OR: [
                        { name: { contains: searchTerm, mode: 'insensitive' } },
                        { description: { contains: searchTerm, mode: 'insensitive' } },
                        { highLights: { contains: searchTerm, mode: 'insensitive' } },
                        { slug: { contains: searchTerm, mode: 'insensitive' } },
                        { category: { categoryName: { contains: searchTerm, mode: 'insensitive' } } },
                      ]
                    },
                    { status: true }
                  ]
                },
                select: {
                  name: true,
                  slug: true,
                  id: true,
                  thumbNail: true
                }
              });
              
          



            
          

           

            

            




         
            return {
                success: true,
                message: `result`,
                products


            }







        } catch (error) {
            console.log(error)

            return {
                success: false,
                message: error.meta?.cause || "internal server error",

            }

        }
    }
}