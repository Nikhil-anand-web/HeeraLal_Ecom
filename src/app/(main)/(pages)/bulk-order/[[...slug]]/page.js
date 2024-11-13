import React from 'react'
import ProductBulk from '../_components/ProductBulk'
import Pagination from '@/components/Pagination';
import db from '@/lib/db';
import getPaginationLimit from '@/lib/getPaginationLimit';
export const metadata = {
    title: 'bulk-order',
    icons: {
      icon: 'asset/favicon.ico',
    },
  };

const page = async ({params}) => {
    
    var pageNo = params.slug?.at(params?.slug?.length - 1)
    if (!pageNo || isNaN(pageNo)) {
        pageNo = 1;

    }
    var itemsPerPage = await getPaginationLimit()
    const count = await db.product.count({
        where:{
            AND:[{ varient:{
                 some:{
                     isBulk:true
                 }
             }},{status:true}]
         }

    })

    const product = await db.product.findMany({
        where:{
           AND:[{ varient:{
                some:{
                    isBulk:true
                }
            }},{status:true}]
        },select:{
            name:true,
            thumbNail:true,
            stars:true,
            varient:{
               where:{
                AND:[{isBulk:true},{status:true}]
               },select:{
                id:true,
                mrp:true,
                discount:true,
                weight:true,
                slug:true,
                isBulk:true,
                product:{
                    select:{
                        slug:true
                    }
                }
               }
                
            }

        },
        skip: (pageNo - 1) * itemsPerPage, // Skip the items for pagination
        take: itemsPerPage
    })
    
    
    return (
        <section class="product-page">
            <div class="container">
                <div class="row">
                   
                    <div class="col-md-12">
                        <div class="row justify-content-center">
                            <div class="col-md-4 text-center">
                                <h1 class="mb-5">Bulk Order Products</h1>

                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6"></div>
                            <div class="col-md-6"></div>
                        </div>

                        <div class="row m-0">
                            {product.map((obj,index)=> <ProductBulk key={index} imageS={obj.thumbNail[0].url} procuctName={obj.name} varients={obj.varient} stars = {obj.stars}/>)}
                            

                        </div>
                    </div>
                </div>
            </div>
            <Pagination totalItems={count} itemsPerPage={itemsPerPage} currentPage={pageNo} />
        </section>
    )
}

export default page
