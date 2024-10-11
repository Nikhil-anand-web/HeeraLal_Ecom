import BlogContent from '@/components/BlogContent'
import Pagination from '@/components/Pagination';
import db from '@/lib/db';
import getPaginationLimit from '@/lib/getPaginationLimit';
import React from 'react'

const page = async ({ params }) => {
    var pageNo = params.slug?.at(params?.slug?.length - 1)
    if (!pageNo || isNaN(pageNo)) {
        pageNo = 1;

    }
    var itemsPerPage = await getPaginationLimit()
    const count = await db.blog.count({
        where: {
            status: 1
        },

    })
    const blogs = await db.blog.findMany({
        where: {
            status: 1
        },
        select: {
            urlSlug: true,
            title: true,
            brief: true,
            createdAt: true,
            thumbnailImage: true
        }
        ,
        skip: (pageNo - 1) * itemsPerPage, // Skip the items for pagination
        take: itemsPerPage

    })
    return (
        <section className="our-blog pt-5">
            <div className="container">
                <div class="row">
                    <div class="col-md-12 text-center">
                        <h2 class="primary-color mb-2">Our Blog</h2>
                        <p class="gray4">At <span class="primary-color">WAH INDIA,</span>  we believe, that natual goodness is the way to go for healthy, balanced life.</p>
                    </div>
                </div>
                <div className="row mt-3 ">
                    {blogs.map((bl) => <BlogContent goTo={`/blog-details/${bl.urlSlug}`} heading={bl.title} paragraph={bl.brief} by={"admin"} dateString={bl.createdAt} imageS={bl.thumbnailImage[0].url} />)}
                </div>
            </div>
            <Pagination totalItems={count} itemsPerPage={itemsPerPage} currentPage={pageNo} />
        </section >
    )
}

export default page
