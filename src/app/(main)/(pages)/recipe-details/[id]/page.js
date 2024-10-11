
import DangerDiv from '@/components/DangerDiv'
import React from 'react'
import RecDet from '../components/RecDet'
import db from '@/lib/db'

const page = async ({params}) => {
    const recipe = await db.recipe.findUnique({
        where: {
            id: params.id
        },
        include:{
            products:true
        }
    })

    return (
        <section className="login-page">
            <RecDet recipe={recipe} />


        </section>
    )
}

export default page
