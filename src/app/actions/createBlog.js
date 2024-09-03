"use server"
import fs from 'fs';
import path from 'path';
import db from "@/lib/db";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'

import { writeFile } from 'fs/promises'

async function createBlog(formData) {
    "use server"
    
    function validateSlug(value) {
    
        if (!(/^[a-z][a-zA-Z0-9]*$/.test(value)) ) {
            return false;
        }
        return true;
    }
   
    
    const user = await getServerSession(authOptions)
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {
                if (user.permissions[0].complementaryContentManagment) {
                    const uploadDirectory = path.join(process.cwd(), 'public', 'asset', "blog", `${formData.get('slug')}`);

                    const urlSlug = formData.getAll('slug');
                    
                    if (!validateSlug(urlSlug)) {
                        throw Error("URL Slug not Valid")
                    }
                    const thumbNail = formData.get('thumbnail');
                    const otherImages = formData.getAll('otherImages');
                    console.log(otherImages)
                    
                    if (!fs.existsSync(uploadDirectory)) {
                        fs.mkdirSync(uploadDirectory, { recursive: true });

                    }
                    const jsonToDbForOther = [];
                    const jsonToDbForThumbNail = [];
                    otherImages.forEach(async (file, index) => {
                        const filePath = path.join(uploadDirectory, `${index}.jpeg`);

                        const bytes = await file.arrayBuffer()
                        const buffer = Buffer.from(bytes)
                        await writeFile(filePath, buffer)
                       



                    });
                    const thumbnailPath = path.join(uploadDirectory, `thumbNail.jpeg`);
                    const bytes = await thumbNail.arrayBuffer()
                        const buffer = Buffer.from(bytes)
                        await writeFile(thumbnailPath, buffer)

                    


                    for (let i = 0; i < otherImages.length; i++) {
                        jsonToDbForOther.push({url:`/asset/blog/${formData.get('slug')}/${i}.jpeg`,alt:"blogImage"})
                        
                        
                    }
                    jsonToDbForThumbNail.push({url:`/asset/blog/${formData.get('slug')}/thumbNail.jpeg`,alt:"thumbnail"})






                    const newBlog = await db.blog.create({
                        data:{
                            title: formData.get('title'),
                            brief: formData.get('brief') ,
                            urlSlug: formData.get('slug')  ,
                            content:  formData.get('content')  ,
                            thumbnailImage :  jsonToDbForThumbNail  ,
                            relatedImages: jsonToDbForOther ,
                            author: { connect: { id: user.id } } ,
                            status : 1

                        }
                    })
                    console.log(newBlog)
                    if (newBlog) {
                        return {
                            success:true,
                            message:"success"
                        }
                        
                    }else{
                        throw Error("something went wronf")
                    }



                }

            } catch (error) {
                console.log(error)
              
                return {
                    success: false,
                    message: error.code === 'P2002' ? "Slug  is already used" : error.meta?.cause || "internal server error",

                }
               
            }

        }

    }

  
}
export default createBlog
