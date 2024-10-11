"use server"

import db from "@/lib/db";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import fs from 'fs';
import path from 'path';

async function updateABanner(formData) {
    const user = await getServerSession(authOptions);

    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {
                if (user.permissions[0].siteManagement) {
                    const slug = formData.get('identifireSlug');
                    const uploadDirectory = path.join(process.cwd(), 'asset', 'banners', `${slug}`);

                    // Ensure the upload directory exists
                    if (!fs.existsSync(uploadDirectory)) {
                        fs.mkdirSync(uploadDirectory, { recursive: true });
                    }

                    const files = formData.getAll('samplePhotos');
                    const jsonToDb = [];

                    if (files.length > 0) {
                        
                        const timestamp = Date.now(); // Use timestamp for uniqueness
                        const fileName = `${timestamp}.jpeg`; // Timestamped file name
                        const filePath = path.join(uploadDirectory, fileName);

                        // Process the first file (since only one file is being handled)
                        const bytes = await files[0].arrayBuffer(); // Convert file to arrayBuffer
                        const buffer = Buffer.from(bytes); // Convert ArrayBuffer to Buffer
                        fs.writeFileSync(filePath, buffer); // Save the file synchronously

                        // Add the image URL to the database entry
                        jsonToDb.push({
                            url: `/asset/banners/${slug}/${fileName}`, // Include timestamped file name
                            alt: "banner",
                        });
                    }

                    // Update the banner entry in the database
                    await db.banners.updateMany({
                        where: {
                            AND: [
                                { pageSlug: slug },
                                { displayOrder: +formData.get('selectedDisplayOrder') }
                            ]
                        },
                        data: {
                            images: jsonToDb, // Save the new image data in DB
                        }
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
                    message: error.code === 'P2002' ? "Unique constraint violated" : error.meta?.cause || "Internal server error",
                };
            }
        }
    }

    return {
        success: false,
        message: "Unauthorized request",
    };
}

export default updateABanner;
