import { getServerSession } from "next-auth";
import { authOptions } from "../../../../auth/[...nextauth]/options";

import db from "@/lib/db";

import fs from 'fs';
import path from 'path';


import { writeFile } from 'fs/promises'
import { NextResponse } from "next/server";



export async function POST(req) {



    const user = await getServerSession(authOptions)
   

    const formData = await req.formData();




    if (user) {
        if (user.role == 1 || user.role == 2) {

            try {

                if (user.permissions[0].productAndInventory) {
                    
                    const uploadDirectory = path.join(process.cwd(), 'public', 'asset', "categories", `${formData.get('slug')}`);

                    // Access uploaded files
                    const files = formData.getAll('samplePhotos');
                    if (!fs.existsSync(uploadDirectory)) {
                        fs.mkdirSync(uploadDirectory, { recursive: true });
                    }
                    const jsonToDb = [];

                    files.forEach(async (file, index) => {
                        const filePath = path.join(uploadDirectory, `${index}.jpeg`);

                        const bytes = await file.arrayBuffer()
                        const buffer = Buffer.from(bytes)
                        await writeFile(filePath, buffer)
                       



                    });
                    for (let i = 0; i < files.length; i++) {
                        jsonToDb.push({url:`/asset/categories/${formData.get('slug')}/${i}.jpeg`,alt:"categoryImage"})
                        
                        
                    }
                 


                    const newCategory = await db.category.create({
                        data: {
                            categoryName: formData.get('categoryName'),
                            slug: formData.get('slug'),
                           
                           
                            image: JSON.stringify(jsonToDb),  // Ensure jsonToDb is in the correct format
                            showOnHome: formData.get('showOnHome') === 'true',  // Convert to Boolean

                            parent: formData.get('parentId') !== "0" ? { connect: { id: formData.get('parentId') } } : undefined, // Connect parent if provided
                            createdBy: { connect: { id: user.id } }  // Ensure relationship is correctly connected
                        },
                    });
                    
                       
                 


                    return NextResponse.json({ success: true, message: 'Category created successfully', category: newCategory });








                }

            } catch (error) {
                console.log(error)


                return Response.json({
                    success: false,
                    message: error.code === 'P2002' ? "Slug  is already used" : error.meta?.cause || "internal server error",

                }, { status: 500 })






            }

        }


        return Response.json({
            success: false,
            message: "Bad Request"
        }, { status: 400 })
    }
}