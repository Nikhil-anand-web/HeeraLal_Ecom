import db from '@/lib/db'
import React from 'react'
import Pagination from '@/components/Pagination'
import getPaginationLimit from '@/lib/getPaginationLimit'
import ProductCategories from '@/components/ProductCategories'
import ProductRetail from './_components/ProductRetail'
import CatContainer from './_components/CatContainer'

export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const title = params.slug[0].trim()






    return {
        title: `${title}`,
        openGraph: {
            images: ['asset/favicon.ico'],
        },
    }
}

const page = async ({ params }) => {
    const categorySlug = params.slug[0].trim()
    var pageNo = params.slug[params.slug.length - 1]


    const itemsPerPage = await getPaginationLimit()
    if (!pageNo || isNaN(pageNo)) {
        pageNo = 1;

    }
    var categories = await db.category.findMany({
        where: {
            AND: [{ status: 1 }]
        },
        select: {
            categoryName: true,
            slug: true,
            image: true,
            id: true
        },
        orderBy: {
            displayOrder: 'asc', // Order by 'displayOrder' in ascending order
        }
    })
    categories.forEach(cat => {
        cat.image = JSON.parse(cat.image)

    });
    const products = await db.product.findMany({
        where: {
            AND: [{
                category: {
                    slug: categorySlug === 'all' ? undefined : categorySlug
                }
            }, { status: true }]

        },
        select: {
            name: true,

            stars: true,
            thumbNail: true,
            slug: true,
            category: {
                select: {
                    categoryName: true
                }

            },
            varient: {
                where: {
                    AND: [{ status: true }, { isDefault: true }]

                },
                select: {
                    id: true,
                    mrp: true,
                    discount: true

                }
            },


        },
        skip: (pageNo - 1) * itemsPerPage, // Skip the items for pagination
        take: itemsPerPage

    })
    const count = await db.product.count({
        where: {
            AND: [{
                category: {
                    slug: categorySlug === 'all' ? undefined : categorySlug
                }
            }, { status: true }]

        },

    })



    return (
        <section className="product-page">
            <div className="container">
                <div className="row">


                    <div className="col-md-12">
                       
                        <div className="row">
                            <div className="col-md-6"></div>
                            <div className="col-md-6"></div>
                        </div>

                        <CatContainer categories={categories} categorySlug={categorySlug} />
                     
                        <div className="row justify-content-center">
                            <div className="col-md-4 text-center">
                                <h1 className="mb-5">{categorySlug === 'all' ? "All Products" : products[0].category.categoryName}</h1>

                            </div>
                        </div>
                        <div className="row m-0">

                            {products.map((pro, index) => <ProductRetail goto={`/product-details/${pro.slug}`} varienId={pro.varient[0].id} discount={pro.varient[0].discount} key={index} imageS={pro.thumbNail[0].url} ProductName={pro.name} Price={pro.varient[0].mrp} />)}




                        </div>
                    </div>
                </div>
            </div>
            <Pagination totalItems={count} itemsPerPage={itemsPerPage} currentPage={pageNo} />
        </section>
    )
}

export default page
