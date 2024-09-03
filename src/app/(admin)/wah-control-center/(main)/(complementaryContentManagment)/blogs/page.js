import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import BlogModel from '@/components/adminComp/BlogModel'
import AdminLayout from '@/layouts/AdminLayout'
import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async() => {
    const user = await getServerSession(authOptions)
    var blogs  = []
 if (user && user.permissions?.length>0&&user.permissions.at(0)?.complementaryContentManagment) {
    const blogsList =  await db.blog.findMany({
        select:{
            id:true,
            title:true,
            urlSlug:true,
            author :{
                select:{
                    userName:true
                }
            },
            thumbnailImage:true,
            status:true
        }
    })
    blogs = blogsList
   

    
 }
  return (
    <>
         <h3 className="page-title"> Blogs</h3>
        {blogs.map((blog,index)=>{
           return <BlogModel key = {index} blog = {blog}/>

        })}
        
    </>
  )
}

export default page
