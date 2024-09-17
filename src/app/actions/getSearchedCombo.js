"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import db from "@/lib/db"
import { getServerSession } from "next-auth";



export default async function getSearchedCombo(searchTerm,pageNo,itemsPerPage) {
    const user = await getServerSession(authOptions)
  

    if (user.permissions[0].offersAndDiscounts) {

        
        
        try {
            if (searchTerm==='') {
                return {
                    success: true,
                    message: `result`,
                    combos: await db.combo.findMany({
                        select: {
                            id: true,
                            name: true,
                            discountInPercent: true,
                            status: true,
                            qty: true,
                            productVarients: {
                                select: {
                                    slug: true
                
                                }
                            },
                            createdBy: {
                                select: {
                                    userName: true
                                }
                            },
                
                        },
                        skip: (parseInt(pageNo) - 1) * parseInt(itemsPerPage), // Move skip here
                        take: parseInt(itemsPerPage) // Move take here
      
                      
                      }),
                     
    
                }

                
            }
            
            const combos = await db.combo.findMany({
                where: {
                  OR: [
                    { name: { contains: searchTerm } },
                    { description: { contains: searchTerm } },
                   
                    { productVarients: { some:{ product: {name:{ contains: searchTerm}}} } },
                  ]
                },
                select: {
                    id: true,
                    name: true,
                    discountInPercent: true,
                    status: true,
                    qty: true,
                    productVarients: {
                        select: {
                            slug: true
        
                        }
                    },
                    createdBy: {
                        select: {
                            userName: true
                        }
                    },
        
                }
                
              });
            return {
                success: true,
                message: `result`,
                combos


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













