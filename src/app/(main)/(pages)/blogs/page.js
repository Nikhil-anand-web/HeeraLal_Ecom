import BlogContent from '@/components/BlogContent'
import React from 'react'
import blogImg from "../../../../images/blog-img.jpg"
const page = async () => {
    const blogs = await db.blog.findMany({
        where:{
            status:1
        },
        select:{
            urlSlug:true,
            title:true,
            brief:true,
            createdAt:true,
            thumbnailImage:true
        }
        
    })
    return (
        <section className="our-blog pt-5">
            <div className="container">
                <div className="row mt-3 ">
                {blogs.map((bl)=> <BlogContent goTo={`/blogDetails/${bl.urlSlug}`} heading={bl.title} paragraph={bl.brief} by={"admin"} dateString={bl.createdAt} imageS={bl.thumbnailImage[0].url} />)}
                </div>
            </div>

        </section >
    )
}

export default page
