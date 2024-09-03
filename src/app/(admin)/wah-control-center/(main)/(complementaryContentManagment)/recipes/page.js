
import React from 'react'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import ComboModel from '@/components/adminComp/ComboModel'
import db from '@/lib/db'
import CouponModel from '@/components/adminComp/CouponModel'
import RecipseModel from '@/components/adminComp/RecipseModel'


const Page = async () => {

    const user = await getServerSession(authOptions)

    if (!user?.permissions[0].complementaryContentManagment) {

        return <p>Access Denied</p>

    }
    const recipes = await db.recipe.findMany({
        select: {
            id: true,
            name: true,
            ingredients: true,
            videoLink: true,
            instructions: true,
            status: true,
            createdBy: {
                select: {
                    userName: true
                }
            },

        }
    })
    return (
        <section className="login-page">
            <div className="container">
                <div className={"hide-scrollbar"} style={{ height: "72vh", overflow: "scroll", width: "100%" }}>
                    {recipes.map((recipe, i) => <RecipseModel key={i} recipe={recipe} />)}

                </div>
            </div>
        </section>
    )
}

export default Page 
