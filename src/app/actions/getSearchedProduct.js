"use server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"


export default async function getSearchedProduct(searchTerm,pageNo,itemsPerPage) {
    const user = await getServerSession(authOptions)
   console.log(itemsPerPage,pageNo);

    if (user.permissions[0].productAndInventory) {

        
        
        try {
            if (searchTerm==='') {
                return {
                    success: true,
                    message: `result`,
                    products: await db.product.findMany({
                        select: {
                          id: true,
                          category: {
                            select: {
                              slug: true
                            }
                          },
                          slug: true,
                          stars:true,
                          tags:true,
                          name: true,
                          highLights: true,
                          description: true,
                          thumbNail: true,
                          images: true,
                          status: true,
                          showOnHome: true,
                          isFeatured: true,
                          isBestSeller: true,
                          createdAt: true,
                          updatedAt: true,
                          varient:{
                            select:{
                                qty:true,
                                mrp:true
                            }

                          },
                          _count: {
                            select: {
                              varient: true,
                              recipe:true
                            }
                          },
                          createdBy: {
                            select: {
                              userName: true
                            }
                          }
              
              
              
                        },
                        skip: (parseInt(pageNo) - 1) * parseInt(itemsPerPage), // Move skip here
                        take: parseInt(itemsPerPage) // Move take here
      
                      
                      }),
                     
    
                }

                
            }
            
            const products = await db.product.findMany({
                where: {
                  OR: [
                    { name: { contains: searchTerm } },
                    { description: { contains: searchTerm} },
                    { highLights: { contains: searchTerm } },
                    { slug: { contains: searchTerm } },
                    { category: { categoryName: { contains: searchTerm } } },
                  ]
                },
                select: {
                    id: true,
                    category: {
                      select: {
                        slug: true
                      }
                    },
                    slug: true,
                    stars:true,
                    tags:true,
                    name: true,
                    highLights: true,
                    description: true,
                    thumbNail: true,
                    images: true,
                    status: true,
                    showOnHome: true,
                    isFeatured: true,
                    isBestSeller: true,
                    createdAt: true,
                    updatedAt: true,
                    varient:{
                      select:{
                          qty:true
                      }

                    },
                    _count: {
                      select: {
                        varient: true,
                        recipe:true
                      }
                    },
                    createdBy: {
                      select: {
                        userName: true
                      }
                    }
        
        
        
                  },
                
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