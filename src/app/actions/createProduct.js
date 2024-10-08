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

async function createProduct(formData) {

    console.log(formData)



    const user = await getServerSession(authOptions)
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {
                if (user.permissions[0].productAndInventory) {


                    // console.log(formData)
                    const uploadDirectory = path.join(process.cwd(),'asset', "product", `${formatString(formData.get('slugProduct'))}`);

                    const thumbNail = formData.getAll('thumbnailProduct');
                    const otherImages = formData.getAll('samplePhotos');
                      console.log(thumbNail)

                    if (!fs.existsSync(uploadDirectory)) {
                        fs.mkdirSync(uploadDirectory, { recursive: true });
                    }
                    const jsonToDbForOther = [];
                    const jsonToDbForThumbNail = [];
                    thumbNail.forEach(async (file,index) => {
                     if (index!==0) {
                       
                        const filePath = path.join(uploadDirectory, `thumbNail.jpeg`);

                        const bytes = await file.arrayBuffer()
                        const buffer = Buffer.from(bytes)
                        await writeFile(filePath, buffer)
                        
                        
                     }
                      




                    });

                    for (let i = 1; i < thumbNail.length; i++) {
                        jsonToDbForThumbNail.push({ url: `/asset/product/${formatString(formData.get('slugProduct'))}/thumbNail.jpeg`, alt: "thumbnail" })


                    }
                    otherImages.forEach(async (file, index) => {
                        if (index!==0) {
                            const filePath = path.join(uploadDirectory, `${index}.jpeg`);

                        const bytes = await file.arrayBuffer()
                        const buffer = Buffer.from(bytes)
                        await writeFile(filePath, buffer)

                            
                        }
                        



                    });

                    for (let i = 1; i < otherImages.length; i++) {
                        jsonToDbForOther.push({ url: `/asset/product/${formatString(formData.get('slugProduct'))}/${i}.jpeg`, alt: "productImage" })


                    }

                    const newProduct = await db.product.create({
                        data: {
                          name: formData.get('productName'),
                          tags: (!formData.get('tags') || formData.get('tags')==='')?"general":formData.get('tags').split(',').map(str=>str.trim()),
                          category: {
                            connect: { id: formData.get('category') }, // Provide the actual admin ID
                          }, 
                          highLights: formData.get('highLights'),
                          slug :formData.get('slugProduct'),
                          description: formData.get('description'),
                          thumbNail: jsonToDbForThumbNail, // Provide actual JSON data if needed
                          images: jsonToDbForOther, // Provide actual JSON data if needed
                          showOnHome: formData.get('showOnHome')==="false"?false:true,
                          isFeatured: formData.get('isFeatured')==="false"?false:true,
                          isBestSeller: formData.get('isBestSeller')==="false"?false:true,
                          isVegiterian: formData.get('isVegiterian')==="false"?false:true,
                          varient: {
                            create: [
                                {
                                    slug :formData.get('slugVarient'),
                                    weight: parseFloat(formData.get('weight')),
                                    size:  formData.get('size'),
                                    qty: +formData.get('qty'),
                                    
                                    mrp: parseFloat(formData.get('mrp')),
                                    wholeSalePrice: parseFloat(formData.get('wholeSalePrice')),
                                    minQtyForBulkOrder: +formData.get('minQtyForBulkOrder'),
                                    isDefault: true,
                                    createdBy: {
                                      connect: { id: user.id } // Replace with actual admin ID
                                    }
                                  },
                            ],
                          },
                          createdBy: {
                            connect: { id: user.id }, // Provide the actual admin ID
                          },
                        },
                      });







                    return {
                        success: true,
                        message: "product created !!",
                        newProduct

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
export default createProduct
