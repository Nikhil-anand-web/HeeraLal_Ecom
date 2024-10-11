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

                    // Check if the upload directory exists, if yes, clean it
                    if (fs.existsSync(uploadDirectory)) {
                        const existingFiles = fs.readdirSync(uploadDirectory);
                        for (const file of existingFiles) {
                            const filePath = path.join(uploadDirectory, file);
                            fs.unlinkSync(filePath); // Delete existing files
                        }
                    } else {
                        fs.mkdirSync(uploadDirectory, { recursive: true }); // Create directory if it doesn't exist
                    }

                    // Access uploaded files
                    const jsonToDb = [];
                    const files = formData.getAll('samplePhotos');

                    if (files.length > 0) {
                       

                        // Synchronous file writing
                        for (let index = 0; index < files.length; index++) {
                            const file = files[index];
                            const timestamp = Date.now(); // Get the current timestamp
                            const filePath = path.join(uploadDirectory, `${timestamp}.jpeg`); // Filename with timestamp
                            console.log(filePath)

                            // Await the arrayBuffer and then write synchronously
                            const bytes = await file.arrayBuffer(); // Await the async operation
                            const buffer = Buffer.from(bytes); // Convert to Buffer

                            // Synchronously write the file
                            fs.writeFileSync(filePath, buffer);

                            // Push the corresponding URL to the array
                            jsonToDb.push({
                                url: `/asset/slider/${formData.get('identifireSlug')}/${timestamp}.jpeg`, // URL with timestamp
                                alt: 'slider image',
                                link: formData.get(`lnk_${index}`).trim(),
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
