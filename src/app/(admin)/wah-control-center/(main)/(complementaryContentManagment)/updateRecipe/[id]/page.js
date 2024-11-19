import { authOptions } from '@/app/api/auth/[...nextauth]/options'

import AddRecipeForm from '@/components/adminComp/forms/AddRecipeForm'
import UpdateRecipeForm from '@/components/adminComp/forms/UpdateRecipeForm'




import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async ({params}) => {
    const user = await getServerSession(authOptions);
    const recId = params.id
    var productSlug = []
    
    if (user && user.permissions?.length > 0 && user.permissions[0].complementaryContentManagement) {
        productSlug = await db.product.findMany({
            select: {
                slug: true,
                id: true,
            },

        });
        var recipe = await db.recipe.findUnique({
            where:{
                id:recId
            },include:{
                products:true
            }

        })

    }
   


    return (
        <>
            <h3 className="page-title"> Add a Recipe</h3>
            {user && user.permissions?.length > 0 && user.permissions[0].complementaryContentManagement ? <div className={"hide-scrollbar"} style={{ height: "90vh", overflow: "scroll", width: "100%" }}><UpdateRecipeForm recipe={recipe} productSlug={productSlug} /></div> : <div>access denied</div>}

        </>
    )
}

export default page
