import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import UpdateBlogForm from '@/components/adminComp/forms/UpdateBlogForm'
import UpdateCategoryForm from '@/components/adminComp/forms/UpdateCategoryForm'
import AdminLayout from '@/layouts/AdminLayout'
import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async ({ params }) => {
    const user = await getServerSession(authOptions);
    const slug = params.id

    var blog = []
    if (user && user.permissions?.length && user.permissions[0].complementaryContentManagement) {
        blog = await db.blog.findUnique({
            where:{
                id:slug

            },
        });
        
    }

    return (
        <>
            <h3 className="page-title"> Update a Category </h3>
            {user && user.permissions?.length && user.permissions[0].complementaryContentManagement ? <div className={"hide-scrollbar"} style={{ height: "90vh", overflow: "scroll", width: "100%" }}><UpdateBlogForm blog={blog} /></div> : <div>access denied</div>}

        </>
    )
}

export default page
