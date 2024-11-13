import React from 'react'
import p2 from "../../../../../images/p2.webp"

import p1 from "../../../../../images/p1.webp"

import quality from "../../../../../images/quality.png"
import fryingPan from "../../../../../images/frying-pan.png"
import india from "../../../../../images/india.png"
import Image from 'next/image'
import CarouselComp from '@/components/CarouselComp'
import TopSellingProduct from '@/components/TopSellingProduct'
import RecommendedProduct from './_components/RecommendedProduct'
import Link from 'next/link'
import VarientControl from './_components/VarientControl'
import MoreTabs from './_components/MoreTabs'
import ComboThumbnail from '@/components/ComboThumbnail'
import PincodeServiceabilityCheck from './_components/PincodeServiceabilityCheck'
import db from '@/lib/db'
export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const title = params.slug






    return {
        title: `${title}`,
        openGraph: {
            images: ['asset/favicon.ico'],
        },
    }
}
const page = async ({ params }) => {
    const productSlug = params.slug
    const product = await db.product.findUnique({
        where: {
            slug: productSlug,
            AND: [{ slug: productSlug }, { status: true }]
        }, select: {
            name: true,
            categoryId: true,
            images: true,
            description: true,
            highLights: true,
            isVegiterian: true,
            varient: {
                where: {

                    status: true

                },
                select: {
                    id: true,
                    mrp: true,
                    discount: true,
                    weight: true,
                    isDefault: true

                }
            }
        }
    })
    const recipe = await db.recipe.findMany({
        where: {
            products: {
                some: {
                    slug: productSlug
                }
            },
            AND: [{
                products: {
                    some: {
                        slug: productSlug
                    }
                }
            }, { status: true }]

        }, select: {
            videoLink: true,
            name: true
        }
    })
    const comboWithProduct = await db.combo.findMany({
        where: {
            productVarients: {
                some: {
                    product: {
                        slug: productSlug
                    }
                }
            },
            AND: [{ status: true }]

        },
        select: {
            id: true,
            name: true,
            productVarients: {
                select: {
                    product: {
                        select: {
                            thumbNail: true,
                            name: true
                        }
                    }
                    , weight: true,
                    mrp: true
                }
            },
            description: true,
            qty: true,
            discountInPercent: true
        }
    });

    if (!product) {
        return <Image src={'/images/pageNotFound.jpg'} layout='responsive' width={100} height={100} />

    }

    const categoryProducts = await db.varient.findMany({
        where: {
            AND: [
                {
                    product: {

                        categoryId: product.categoryId

                    }
                }, { status: true }, { isDefault: true }
            ]

        },
        select: {
            id: true,
            product: {
                select: {
                    thumbNail: true,
                    name: true,
                    stars: true,
                    slug: true

                }

            },
            mrp: true,
            discount: true
        }
    })

    console.log(categoryProducts)


    return (
        <>

            <section className="product-detail-page">
                <div className="container">
                    <div className="breadcrum">
                        <ul className="d-flex">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Product</a></li>
                            <li><a href="#">{product.name}</a></li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="product-details pt-0">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">

                            <div className="row" id="demos">


                                <CarouselComp images={product.images} />




                            </div>
                        </div>
                        <div className="col-lg-6 ps-4">
                            <div className="pro-details">
                                <h1 className="mb-4">{product.name}</h1>
                                <p> THIS IS A {!product.isVegiterian && "NON-"}VEGETARIAN PRODUCT</p>

                                <div className="collection mb-3">
                                    {product.highLights}
                                </div>

                                <VarientControl varients={product.varient} />
                                <PincodeServiceabilityCheck />


                                <div className="info-block">
                                    {/* d-flex row */}
                                    <div className={"d-flex row "}>
                                        <div className="col-4">

                                            <Image src={quality} width={50} alt='' /><br />

                                            No Adultering
                                        </div>
                                        <div className="col-4">

                                            <Image src={fryingPan} width={50} alt='' />    <br />
                                            Ready to Use
                                        </div>
                                        <div className="col-4">

                                            <Image src={india} width={50} alt='' />    <br />
                                            Made in India
                                        </div>


                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>

                    {comboWithProduct.map((pro, index) => <ComboThumbnail key={index} combo={pro} />)}


                    <MoreTabs description={product.description} recipe={recipe} />






                    <div className="row mt-5">
                        <div className="col-12">
                            <h2>Other Products You May Like</h2>
                        </div>
                    </div>
                    <div className="row">
                        {categoryProducts.map((vari, index) => <RecommendedProduct key={index} stars={vari.product.stars} varientId={vari.id} discount={vari.discount} goTo={vari.product.slug} imageS={vari.product.thumbNail[0].url} productName={vari.product.name} price={vari.mrp} />)}




                    </div>

                </div>
            </section>


        </>
    )
}
export default page