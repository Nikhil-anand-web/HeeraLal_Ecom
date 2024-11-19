"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import db from "@/lib/db"
import { getServerSession } from "next-auth";



export default async function getSearchedBlogs(searchTerm,pageNo,itemsPerPage) {
    const user = await getServerSession(authOptions)
  

    if (user.permissions[0].complementaryContentManagement) {

        
        
        try {
            if (searchTerm==='') {
                return {
                    success: true,
                    message: `result`,
                    blogs: await db.blog.findMany({
                        select:{
                            id:true,
                            title:true,
                            urlSlug:true,
                            author :{
                                select:{
                                    userName:true
                                }
                            },
                            thumbnailImage:true,
                            status:true
                        },
                        skip: (parseInt(pageNo) - 1) * parseInt(itemsPerPage), // Move skip here
                        take: parseInt(itemsPerPage) // Move take here
      
                      
                      }),
                     
    
                }

                
            }
            
            const blogs = await db.blog.findMany({
                where: {
                  OR: [
                    { title: { contains: searchTerm } },
                    { brief: { contains: searchTerm} },
                    { author: { userName:{ contains: searchTerm} } },
                  ]
                },
                select:{
                    id:true,
                    title:true,
                    urlSlug:true,
                    author :{
                        select:{
                            userName:true
                        }
                    },
                    thumbnailImage:true,
                    status:true
                },
                
              });
            return {
                success: true,
                message: `result`,
                blogs


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