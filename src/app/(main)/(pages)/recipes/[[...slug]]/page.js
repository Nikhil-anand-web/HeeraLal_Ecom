import React from 'react'
import VideoRight from '../components/VideoRight'
import VideoLeft from '../components/VideoLeft'
import Pagination from '@/components/Pagination'
import db from '@/lib/db'
import getPaginationLimit from '@/lib/getPaginationLimit'


const page = async ({params}) => {
    var pageNo = params.slug?.at(params?.slug?.length - 1)
    if (!pageNo || isNaN(pageNo)) {
        pageNo = 1;

    }
    var itemsPerPage = await getPaginationLimit()
    const count =  await db.recipe.count({
        where: {
            status: true
        },

    })
    const recipes = await db.recipe.findMany({
        where: {
            status: true
        },
        select: {
            id: true,
            name: true,
            ingredients: true,
            videoLink: true,
            instructions: true,
            products: {
                select: {
                    name: true,
                    slug: true

                }

            },
            brief:true

        },
        skip: (pageNo - 1) * itemsPerPage, // Skip the items for pagination
        take: itemsPerPage
    })
    return (
        <section className="login-page">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4 text-center">
                        <h1 >Recipes</h1>

                    </div>
                </div>


                {recipes.map((recipe, i) => i % 2 === 0 ? <VideoRight key={i} recipe={recipe} /> : <VideoLeft recipe={recipe} key={i} />)}








            </div>
            <Pagination totalItems={count} itemsPerPage={itemsPerPage} currentPage={pageNo} />


        </section>
    )
}

export default page
