"use server"

import db from "@/lib/db";
import fs from 'fs';
import path from 'path';
import { writeFileSync } from 'fs';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

function formatString(str) {
    return str.toLowerCase().replace(/\s+/g, '');
}

async function createProduct(formData) {
    const user = await getServerSession(authOptions);
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {
                if (user.permissions[0].productAndInventory) {
                    const uploadDirectory = path.join(process.cwd(), 'asset', "product", `${formatString(formData.get('slugProduct'))}`);
                    const thumbNail = formData.getAll('thumbnailProduct');
                    const otherImages = formData.getAll('samplePhotos');

                    if (!fs.existsSync(uploadDirectory)) {
                        fs.mkdirSync(uploadDirectory, { recursive: true });
                    }

                    const jsonToDbForOther = [];
                    const jsonToDbForThumbNail = [];

                    // Save thumbnail images
                    for (const [index, file] of thumbNail.entries()) {
                        if (index !== 0) {
                            const timestamp = Date.now();
                            const filePath = path.join(uploadDirectory, `thumbNail_${timestamp}.jpeg`);

                            // Await the arrayBuffer
                            const bytes = await file.arrayBuffer();
                            const buffer = Buffer.from(bytes);
                            writeFileSync(filePath, buffer);

                            jsonToDbForThumbNail.push({ url: `/asset/product/${formatString(formData.get('slugProduct'))}/thumbNail_${timestamp}.jpeg`, alt: "thumbnail" });
                        }
                    }

                    // Save other images
                    for (const [index, file] of otherImages.entries()) {
                        if (index !== 0) {
                            const timestamp = Date.now();
                            const filePath = path.join(uploadDirectory, `${index}_${timestamp}.jpeg`);

                            // Await the arrayBuffer
                            const bytes = await file.arrayBuffer();
                            const buffer = Buffer.from(bytes);
                            writeFileSync(filePath, buffer);

                            jsonToDbForOther.push({ url: `/asset/product/${formatString(formData.get('slugProduct'))}/${index}_${timestamp}.jpeg`, alt: "productImage" });
                        }
                    }

                    const newProduct = await db.product.create({
                        data: {
                            name: formData.get('productName'),
                            tags: (!formData.get('tags') || formData.get('tags') === '') ? "general" : formData.get('tags').split(',').map(str => str.trim()),
                            category: {
                                connect: { id: formData.get('category') },
                            },
                            highLights: formData.get('highLights'),
                            slug: formData.get('slugProduct'),
                            description: formData.get('description'),
                            thumbNail: jsonToDbForThumbNail,
                            images: jsonToDbForOther,
                            showOnHome: formData.get('showOnHome') === "false" ? false : true,
                            isFeatured: formData.get('isFeatured') === "false" ? false : true,
                            isBestSeller: formData.get('isBestSeller') === "false" ? false : true,
                            isVegiterian: formData.get('isVegiterian') === "false" ? false : true,
                            varient: {
                                create: [
                                    {
                                        slug: formData.get('slugVarient'),
                                        weight: parseFloat(formData.get('weight')),
                                        size: formData.get('size'),
                                        qty: +formData.get('qty'),
                                        mrp: parseFloat(formData.get('mrp')),
                                        wholeSalePrice: parseFloat(formData.get('wholeSalePrice')),
                                        minQtyForBulkOrder: +formData.get('minQtyForBulkOrder'),
                                        isDefault: true,
                                        createdBy: {
                                            connect: { id: user.id }
                                        }
                                    },
                                ],
                            },
                            createdBy: {
                                connect: { id: user.id },
                            },
                        },
                    });

                    return {
                        success: true,
                        message: "Product created!",
                        newProduct,
                    };
                }
            } catch (error) {
                console.log(error);
                return {
                    success: false,
                    message: error.code === 'P2002' ? "One of the slugs is already present" : error.meta?.cause || "Internal server error",
                };
            }
        }
    }
}

export default createProduct;
