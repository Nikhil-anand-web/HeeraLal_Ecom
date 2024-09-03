"use server"

import db from "@/lib/db";

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import fs from 'fs';
import path from 'path';


import { writeFile } from 'fs/promises'


async function updateABanner(formData) {





    const user = await getServerSession(authOptions)
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {
                if (user.permissions[0].siteManagement) {
                    const uploadDirectory = path.join(process.cwd(), 'public', 'asset', "banners", `${formData.get('identifireSlug')}`);

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
                            jsonToDb.push({ url: `/asset/banners/${formData.get('identifireSlug')}/${i}.jpeg`, alt: "banner" })


                        }

                    }


                    await db.banners.updateMany({
                        where: {
                            AND: [
                                { pageSlug: formData.get('identifireSlug') },
                                { displayOrder: +formData.get('selectedDisplayOrder') }
                            ]
                        },data:{
                            images:jsonToDb
                        }

                    })


                    return {
                        success: true,
                        message: "updated successfully !!",
                        


                    }








                }

            } catch (error) {
                console.log(error)

                return {
                    success: false,
                    message: error.meta?.cause || "internal server error",

                }

            }

        }

    }


}
export default updateABanner
