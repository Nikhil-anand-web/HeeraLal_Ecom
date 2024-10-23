"use server";

import db from "@/lib/db";
import fs from 'fs';
import path from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

function formatString(str) {
    return str.toLowerCase().replace(/\s+/g, '');
}
function isValidFile(file) {
    return file && typeof file.arrayBuffer === 'function';
}

async function updateProduct(formData) {
    console.log(formData);
    var finalSlugProduct = formData.get('slugProduct');
    
    // If no slug provided, fetch it from the database based on the identifier slug
    if (!finalSlugProduct || finalSlugProduct === '') {
        const preState = await db.product.findUnique({
            where: {
                slug: formData.get('identifireSlug'),
            },
            select: {
                slug: true,
            },
        });
        finalSlugProduct = preState.slug;
    }

    const requestData = {
        name: formData.get('productName'),
        highLights: formData.get('highLights'),
        description: formData.get('description'),
        stars: +formData.get('stars') <= 0 ? null : +formData.get('stars'),
        slug: finalSlugProduct,
        tags: formData.get('tags').length > 0 ? formData.get('tags').split(',').map(str => str.trim()) : ["general"],
        category: (formData.get('category') && formData.get('category') !== 'undefined') ? {
            connect: { id: formData.get('category') },
        } : null,
        showOnHome: formData.get('showOnHome') === "undefined" ? null : formData.get('showOnHome') === "false" ? false : true,
        isFeatured: formData.get('isFeatured') === "undefined" ? null : formData.get('isFeatured') === "false" ? false : true,
        isVegiterian: formData.get('isVegiterian') === "undefined" ? null : formData.get('isVegiterian') === "false" ? false : true,
        isBestSeller: formData.get('isBestSeller') === "undefined" ? null : formData.get('isBestSeller') === "false" ? false : true,
    };

    const updateData = await Object.fromEntries(
        Object.entries(requestData).filter(([_, value]) => value !== null && value !== undefined && value !== '')
    );

    const user = await getServerSession(authOptions);
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

                    // Save thumbnail images
                    for (let index = 0; index < thumbNail.length; index++) {
                        const file = thumbNail[index];
                        if ( isValidFile (file) ) {
                            const timeStamp = Date.now();
                            const filePath = path.join(uploadDirectory, `${timeStamp}+"t".jpeg`);
                            const bytes = await file.arrayBuffer();
                            const buffer = Buffer.from(bytes);
                            fs.writeFileSync(filePath, buffer);

                            jsonToDbForThumbNail.push({ url: `/asset/product/${formatString(finalSlugProduct)}/${timeStamp}+"t".jpeg`, alt: "thumbnail" });
                        }
                    }

                    // Save other images
                    for (let index = 0; index < otherImages.length; index++) {
                        const file = otherImages[index];
                        if (isValidFile(file)) {
                            const timeStamp = Date.now();
                            const filePath = path.join(uploadDirectory, `${timeStamp}.jpeg`);
                            const bytes = await file.arrayBuffer();
                            const buffer = Buffer.from(bytes);
                            fs.writeFileSync(filePath, buffer);
                            jsonToDbForOther.push({ url: `/asset/product/${formatString(finalSlugProduct)}/${timeStamp}.jpeg`, alt: "productImage" });
                        }
                    }

                    // Update the data object
                    if (jsonToDbForOther.length > 0) {
                        updateData.images = jsonToDbForOther;
                    }
                    if (jsonToDbForThumbNail.length > 0) {
                        updateData.thumbNail = jsonToDbForThumbNail;
                    }

                    console.log(updateData);
                    const newProduct = await db.product.update({
                        where: {
                            slug: formData.get('identifireSlug'),
                        },
                        data: {
                            ...updateData,
                            createdBy: {
                                connect: { id: user.id },
                            },
                        },
                    });

                    return {
                        success: true,
                        message: "Updated successfully!",
                    };
                }
            } catch (error) {
                console.log(error);
                return {
                    success: false,
                    message: error.code === 'P2002' ? "Unique constraint violation" : error.meta?.cause || "Internal server error",
                };
            }
        }
    }
}

export default updateProduct;
