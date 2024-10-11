"use server";

import db from "@/lib/db";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import fs from 'fs';
import path from 'path';

async function updateSlider(formData) {
    console.log(formData);

    const user = await getServerSession(authOptions);
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {
                if (user.permissions[0].siteManagement) {
                    const uploadDirectory = path.join(process.cwd(), 'asset', 'slider', `${formData.get('identifireSlug')}`);

                    // Access uploaded files
                    const jsonToDb = [];
                    const files = formData.getAll('samplePhotos');

                    if (files.length > 0) {
                        console.log(files)
                        if (!fs.existsSync(uploadDirectory)) {
                            fs.mkdirSync(uploadDirectory, { recursive: true });
                        }

                        // Synchronous file writing, but we still need to await arrayBuffer resolution
                        for (let index = 0; index < files.length; index++) {
                            const file = files[index];
                            const filePath = path.join(uploadDirectory, `${index}.jpeg`);

                            // Await the arrayBuffer and then write synchronously
                            const bytes = await file.arrayBuffer(); // Await the async operation
                            const buffer = Buffer.from(bytes); // Convert to Buffer

                            // Synchronously write the file
                            fs.writeFileSync(filePath, buffer);
                        }

                        for (let i = 0; i < files.length; i++) {
                            jsonToDb.push({
                                url: `/asset/slider/${formData.get('identifireSlug')}/${i}.jpeg`,
                                alt: 'slider image',
                                link: formData.get(`lnk_${i}`).trim(),
                            });
                        }
                    }

                    await db.slider.updateMany({
                        where: {
                            AND: [
                                { pageSlug: formData.get('identifireSlug') },
                                { displayOrder: +formData.get('selectedDisplayOrder') },
                            ],
                        },
                        data: {
                            images: jsonToDb,
                        },
                    });

                    return {
                        success: true,
                        message: 'Updated successfully!',
                    };
                }
            } catch (error) {
                console.log(error);

                return {
                    success: false,
                    message: error.meta?.cause || 'Internal server error',
                };
            }
        }
    }
}

export default updateSlider;
