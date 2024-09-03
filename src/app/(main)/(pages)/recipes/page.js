import React from 'react'
import VideoRight from './components/VideoRight'
import VideoLeft from './components/VideoLeft'

const page = async () => {
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

            }

        }
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


        </section>
    )
}

export default page
