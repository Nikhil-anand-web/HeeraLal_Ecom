"use server"

import db from "@/lib/db";
import fs from 'fs';
import path from 'path';
import { writeFile } from 'fs/promises'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'

function formatString(str) {
    return str.toLowerCase().replace(/\s+/g, '');
}

async function updateProduct(formData) {
    console.log(formData)
    var finalSlugProduct = formData.get('slugProduct')
    if (!finalSlugProduct || finalSlugProduct === '') {
        const preState = await db.product.findUnique({
            where: {
                slug: formData.get('identifireSlug')
            },
            select: {
                slug: true
            }

        })
       
        finalSlugProduct = preState.slug

    }
    const requestData = {
        name: formData.get('productName'),
        highLights: formData.get('highLights'),
        description: formData.get('description'),
        stars: +formData.get('stars')<=0?null:+formData.get('stars'),
        slug: finalSlugProduct,
        tags: formData.get('tags').length>0?formData.get('tags').split(',').map(str => str.trim()):null,

        category: (formData.get('category') !== null && formData.get('category') !== undefined && formData.get('category') !== '' && formData.get('category') !== 'undefined') ? {
            connect: { id: formData.get('category') }, // Provide the actual admin ID
        } : null,
        showOnHome: formData.get('showOnHome') === "undefined" ? null : formData.get('showOnHome') === "false" ? false : true,
        isFeatured: formData.get('isFeatured') === "undefined" ? null : formData.get('isFeatured') === "false" ? false : true,
        isVegiterian: formData.get('isVegiterian') === "undefined" ? null : formData.get('isVegiterian') === "false" ? false : true,
        isBestSeller: formData.get('isBestSeller') === "undefined" ? null : formData.get('isBestSeller') === "false" ? false : true,
        // add more fields as needed
    };


    const updateData = await Object.fromEntries(
        Object.entries(requestData).filter(([_, value]) => value !== null && value !== undefined && value !== '')
    );
  




    const user = await getServerSession(authOptions)
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {
                if (user.permissions[0].productAndInventory) {



                    const uploadDirectory = path.join(process.cwd(), 'asset', "product", `${formatString(finalSlugProduct)}`);

                    const thumbNail = formData.getAll('thumbnailProduct');
                    const otherImages = formData.getAll('samplePhotos');


                    if (!fs.existsSync(uploadDirectory)) {
                        fs.mkdirSync(uploadDirectory, { recursive: true });
                    }
                    const jsonToDbForOther = [];
                    const jsonToDbForThumbNail = [];
                    thumbNail.forEach(async (file, index) => {
                        if (index !== 0) {

                            const filePath = path.join(uploadDirectory, `thumbNail.jpeg`);

                            const bytes = await file.arrayBuffer()
                            const buffer = Buffer.from(bytes)
                            await writeFile(filePath, buffer)


                        }





                    });
             

                    for (let i = 1; i < thumbNail.length && typeof (thumbNail?.at(1)) !== 'string'; i++) {
                        jsonToDbForThumbNail.push({ url: `/asset/product/${formatString(finalSlugProduct)}/thumbNail.jpeg`, alt: "thumbnail" })


                    }
                    otherImages.forEach(async (file, index) => {
                        if (index !== 0) {
                            const filePath = path.join(uploadDirectory, `${index}.jpeg`);

                            const bytes = await file.arrayBuffer()
                            const buffer = Buffer.from(bytes)
                            await writeFile(filePath, buffer)


                        }




                    });

                    for (let i = 1; i < otherImages.length && typeof (otherImages?.at(1)) !== 'string'; i++) {
                        jsonToDbForOther.push({ url: `/asset/product/${formatString(finalSlugProduct)}/${i}.jpeg`, alt: "productImage" })


                    }
                    if (jsonToDbForOther.length > 0) {
                        updateData.images = jsonToDbForOther

                    }
                    if (jsonToDbForThumbNail.length > 0) {
                        updateData.thumbNail = jsonToDbForThumbNail

                    }
                    console.log(updateData)
                    const newProduct = await db.product.update({
                        where: {
                            slug: formData.get('identifireSlug')
                        },
                        data: {
                            ...updateData,
                            createdBy: {
                                connect: { id: user.id },
                            },
                        }
                    });


                 




                    return {
                        success: true,
                        message: "updated !!",


                    }








                }

            } catch (error) {
                console.log(error)

                return {
                    success: false,
                    message: error.code==='P2002'?"unique constrain void": error.meta?.cause || "internal server error",

                }

            }

        }

    }


}
export default updateProduct
