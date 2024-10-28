
import React from 'react'

import Image from 'next/image'
import db from '@/lib/db'
import DangerDiv from '@/components/DangerDiv'
const page =  async({params}) => {
 
    const blogSlug = params.slug
    const blogDetail = await db.blog.findUnique({
        where:{
            urlSlug:blogSlug,
            AND:[{urlSlug:blogSlug},{status:1}]
        },select:{
            relatedImages:true,
            createdAt:true,
            title:true,
            content:true
        }
    })
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = blogDetail.createdAt.toLocaleDateString('en-US', options);
    return (
        <section className="our-blog pt-5">
            <div className="container">
                <div className="row mt-3 ">
                    <div className="col-md-12 mb-5">
                        <div className="blog-container">
                            <div className="blog-img">
                                <Image src={blogDetail.relatedImages[0].url} layout="responsive" height={100} width={300} className="img-fluid" alt=""/>
                            </div>
                            <div className="blog-details">
                                <h1>{blogDetail.title}</h1>
                                <div className="blog-admin">
                                    <a href="#"> <span><i className="fa-solid fa-user"></i> By admin</span></a>
                                    <a href="#">  <span><i className="fa-solid fa-calendar-days"></i> {formattedDate}</span>  </a>
                                   
                                </div>
                                <div className="blog-content mt-5">
                                    <DangerDiv htmlEl={blogDetail.content}/>

                                  
                             
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default page
