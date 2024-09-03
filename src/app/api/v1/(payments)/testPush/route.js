import db from '@/lib/db';

import algoliasearch from 'algoliasearch';
import { NextResponse } from 'next/server';




async function indexProducts() {
    const products = await db.product.findMany({
        include: {
            varient: true,
        },
    });

    const algoliaRecords = products.map(product => ({
        objectID: product.id, // Algolia requires an `objectID` field
        name: product.name,
        description: product.description,
        slug: product.slug,
        categoryId: product.categoryId,
        stars: product.stars,
        highLights: product.highLights,
        tags: product.tags,
        thumbNail: product.thumbNail,
        images: product.images,
        status: product.status,
        showOnHome: product.showOnHome,
        isFeatured: product.isFeatured,
        isBestSeller: product.isBestSeller,
        isVegiterian: product.isVegiterian,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        varients: product.varient.map(varient => ({
            id: varient.id,
            weight: varient.weight,
            size: varient.size,
            mrp: varient.mrp,
            discount: varient.discount,
            wholeSalePrice: varient.wholeSalePrice,
        })),
    }));

    const client =  algoliasearch(
        "P10UGN2HOH",
        "1d227daea070243d2a57b216c40ad9b9"
      );
  
      const index =  client.initIndex("product_details");
  
 const j= await index.saveObjects(algoliaRecords, { autoGenerateObjectIDIfNotExist: true });
 console.log(j)
}




export async function GET() {
    const rs =indexProducts()
        .catch(err => console.error(err))
        

}
