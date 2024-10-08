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
                var finalSlug = formData.get('slug')
                if (!finalSlug || finalSlug === '') {
                    const preState = await db.category.findUnique({
                        where: {
                            id: formData.get('identifireSlug')
                        },
                        select: {
                            slug: true
                        }

                    })
                    finalSlug = preState.slug

                }

                if (user.permissions[0].productAndInventory) {
                    console.log(formData)

                    const uploadDirectory = path.join(process.cwd(), 'asset', "categories", `${finalSlug}`);

                    // Access uploaded files
                    const jsonToDb = [];
                    const files = formData.getAll('samplePhotos');
                    if (files.length > 0) {
                        if (!fs.existsSync(uploadDirectory)) {
                            fs.mkdirSync(uploadDirectory, { recursive: true });
                        }


                        files.forEach(async (file, index) => {
                            const filePath = path.join(uploadDirectory, `${index}.jpeg`);

                            const bytes = await file.arrayBuffer()
                            const buffer = Buffer.from(bytes)
                            await writeFile(filePath, buffer)




                        });
                        for (let i = 0; i < files.length; i++) {
                            jsonToDb.push({ url: `/asset/categories/${finalSlug}/${i}.jpeg`, alt: "categoryImage" })


                        }

                    }

                    const updateData = {}
                    if (formData.get('categoryName')) {
                        updateData.categoryName = formData.get('categoryName')

                    }

                    updateData.slug = finalSlug


                    if (jsonToDb.length > 0) {
                        updateData.image = JSON.stringify(jsonToDb)

                    }
                    updateData.showOnHome = formData.get('showOnHome') === 'true'

                    if (formData.get('parentId') != "-1") {
                        updateData.parent = formData.get('parentId') !== "0" ? { connect: { id: formData.get('parentId') } } : undefined


                    }
                    updateData.createdBy = { connect: { id: user.id } }


                    const newCategory = await db.category.update({
                        where: {
                            id: formData.get('identifireSlug'),
                        },
                        data: updateData
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