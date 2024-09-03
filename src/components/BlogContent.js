import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogContent = ({paragraph , imageS , by , dateString ,heading,goTo="/blogDetails"}) => {
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
const formattedDate = dateString.toLocaleDateString('en-US', options);
  return (
    <div className="col-md-4 mb-3">
        <div className="blog-container">
          <div className="blog-img">
            <Link href={goTo}> 
            <Image height={300} width={1000} src={imageS}className={"img-fluid"} alt='logo'/>
            </Link>
          </div>
          <div className="blog-details">
            <h5>
              <Link href={goTo}>{heading}</Link>
            </h5>
            <p>{paragraph}</p>
            <div className="blog-admin">
              <Link href={goTo}> <span><i className="fa-solid fa-user"></i> by {by}</span></Link>
              <Link  href={goTo}> <span><i className="fa-solid fa-calendar-days"></i> {formattedDate}</span> </Link>
              
            </div>
          </div>
        </div>
      </div>
  )
}

export default BlogContent
