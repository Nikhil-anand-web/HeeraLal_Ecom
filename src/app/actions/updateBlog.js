"use server";

import fs from 'fs';
import path from 'path';
import db from "@/lib/db";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

async function updateBlog(formData, id) {
    "use server";

    function validateSlug(value) {
        if (!/^[a-z]+(-[a-z]+)*$/.test(value.trim()) || /\s/.test(value)) {
            return 'Use lowercase words separated by hyphens, without spaces';
        }
        return true;
    }

    const user = await getServerSession(authOptions);
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {
                if (user.permissions[0].complementaryContentManagment) {
                    const uploadDirectory = path.join(process.cwd(), 'asset', "blog", `${formData.get('slug')}`);
                    const urlSlug = formData.getAll('slug');

                    if (!validateSlug(urlSlug[0])) {
                        throw Error("URL Slug not Valid");
                    }
                    
                    const thumbNail = formData.get('thumbnail');
                    const otherImages = formData.getAll('otherImages');
                    
                    // Ensure the upload directory exists
                    if (!fs.existsSync(uploadDirectory)) {
                        fs.mkdirSync(uploadDirectory, { recursive: true });
                    }

                    const jsonToDbForOther = [];
                    const jsonToDbForThumbNail = [];
                    const timeStamp = Date.now();

                    // Save other images with timestamps
                    await Promise.all(otherImages.map(async (file, index) => {
                        const filePath = path.join(uploadDirectory, `${timeStamp}_${index}.jpeg`);
                        const bytes = await file.arrayBuffer();
                        const buffer = Buffer.from(bytes);
                        fs.writeFileSync(filePath, buffer); // Use synchronous write
                        jsonToDbForOther.push({ url: `/asset/blog/${formData.get('slug')}/${timeStamp}_${index}.jpeg`, alt: "blogImage" });
                    }));

                    // Save thumbnail image with timestamp
                    const thumbnailPath = path.join(uploadDirectory, `${timeStamp}_thumbNail.jpeg`);
                    const bytes = await thumbNail.arrayBuffer();
                    const buffer = Buffer.from(bytes);
                    fs.writeFileSync(thumbnailPath, buffer); // Use synchronous write
                    jsonToDbForThumbNail.push({ url: `/asset/blog/${formData.get('slug')}/${timeStamp}_thumbNail.jpeg`, alt: "thumbnail" });

                    const existingBlog = await db.blog.findUnique({
                        where: { id: id },
                        select: {
                            thumbnailImage: true,
                            relatedImages: true,
                            urlSlug: true
                        },
                    });

                    const newBlog = await db.blog.update({
                        where: { id: id },
                        data: {
                            title: formData.get('title'),
                            brief: formData.get('brief'),
                            urlSlug: formData.get('slug'),
                            content: formData.get('content'),
                            thumbnailImage: jsonToDbForThumbNail.length > 0 ? jsonToDbForThumbNail : existingBlog.thumbnailImage,
                            relatedImages: jsonToDbForOther.length > 0 ? jsonToDbForOther : existingBlog.relatedImages,
                            author: { connect: { id: user.id } },
                            status: 1,
                        },
                    });

                    if (newBlog) {
                        return {
                            success: true,
                            message: "success"
                        };
                    } else {
                        throw Error("something went wrong");
                    }
                }
            } catch (error) {
                console.log(error);
                return {
                    success: false,
                    message: error.code === 'P2002' ? "Slug is already used" : error.meta?.cause || "internal server error",
                };
            }
        }
    }
}

export default updateBlog;
