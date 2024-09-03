import { authOptions } from '@/app/api/auth/[...nextauth]/options'

import AddRecipeForm from '@/components/adminComp/forms/AddRecipeForm'




import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {
    const user = await getServerSession(authOptions);
    var productSlug = []
    if (user && user.permissions?.length > 0 && user.permissions[0].complementaryContentManagment) {
        productSlug = await db.product.findMany({
            select: {
                slug: true,
                id: true,
            },

        });

    }


    return (
        <>
            <h3 className="page-title"> Add a Recipe</h3>
            {user && user.permissions?.length > 0 && user.permissions[0].complementaryContentManagment ? <div className={"hide-scrollbar"} style={{ height: "90vh", overflow: "scroll", width: "100%" }}><AddRecipeForm productSlug={productSlug} /></div> : <div>access denied</div>}

        </>
    )
}

export default page
