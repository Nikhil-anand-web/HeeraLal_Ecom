
import db from "@/lib/db";
import fs from 'fs';
import path from 'path';
const { writeFileSync } = require('fs');
export async function POST(req) {
    const reqObj = await req.json()
    const headers = req.headers;
    const clientKey = headers.get('auth-key');
    const serverKey = process.env.BULK_KEY;
    console.log(headers,serverKey)
    if (clientKey!==serverKey) {
        return Response.json({
            success: false,
            message: "Bad Request"
        }, { status: 400 });
        
    }



    try {

        // console.log(reqObj)
        const finalInsertObject = []

        reqObj.forEach((obj) => {
            var finalobj = {}
            var jsonToDbForThumbNail = []
            const jsonToDbForOther = [];

            const imageBuffer = Buffer.from(obj.thumbnail.buffer);
            const fullFilePath = path.join(process.cwd(), obj.thumbnail.thumbnailUrl);

            const dir = path.dirname(fullFilePath);

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            jsonToDbForThumbNail.push({ url: obj.thumbnail.thumbnailUrl, alt: "thumb" })

            fs.writeFileSync(fullFilePath, imageBuffer);
            obj.images.forEach((image) => {
                const fullFilePathSub = path.join(process.cwd(), image.url);
                const imageBufferSub = Buffer.from(image.buffer);
                fs.writeFileSync(fullFilePathSub, imageBufferSub);
                jsonToDbForOther.push({ url: image.url, alt: "other" })
                finalobj = {
                    name: obj.productName,
                    slug: obj.slugProduct,
                    highLights: obj.highLights,
                    description: obj.description,
                    tags: ["general"],
                    category: {
                        connect: {
                            id: obj.category
                        }

                    },
                    thumbNail: jsonToDbForThumbNail,
                    images: jsonToDbForOther,

                    createdBy: {
                        connect: {
                            id: obj.adminId, // Replace with actual admin ID
                        },
                    },
                    varient: {
                        create: {
                            slug: obj.slugVarient,
                            weight: parseFloat(obj.weight),
                            size: obj.size,
                            qty: +obj.qty,
                            mrp: parseFloat(obj.mrp),
                            wholeSalePrice: obj.wholeSalePrice,
                            discount: obj.discount,
                            minQtyForBulkOrder: obj.minQtyForBulkOrder,
                            isDefault: true,
                            createdBy: {
                                connect: {
                                    id: obj.adminId, // Same admin ID
                                },
                            },
                        },
                    },
                }

            })
            finalInsertObject.push(finalobj)



        });
        const results = await Promise.all(
            finalInsertObject.map(async (data) => {
                return await db.product.create({
                    data: data
                });
            })
        );
        console.log(results)




        return Response.json({
            success: true,
            message: "success"
        }, { status: 200 });
    } catch (error) {
        console.log(error);

        return Response.json({
            success: false,
            message: error.code === 'P2002' ? "Slug is already used" : error.meta?.cause || "Internal server error",
        }, { status: 500 });


     
    }
}
