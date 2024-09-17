"use client"

import deleteABlog from '@/app/actions/deleteABlog'
import toggleBlogStatus from '@/app/actions/toggleBlogStatus'
import Image from 'next/image'
import React from 'react'
import { toast } from 'react-toastify'

const BlogModel = ({blog,setRefetchComp}) => {
    const onDelete = async ()=>{
        const bindedFunction = deleteABlog.bind(null,blog.id)
        const res =  await bindedFunction();
        if(res.success) {
          setRefetchComp((e)=>!e)
            toast.success(res.message)
        }else{
            toast.warning(res.message)
        }

    }
    const onToggleStatus = async ()=>{
        const bindedFunction = toggleBlogStatus.bind(null,blog.id)
        const res =  await bindedFunction();
        if(res.success) {
          setRefetchComp((e)=>!e)
            toast.success(res.message)
        }else{
            toast.warning(res.message)
        }

    }



if(!blog) return <div>no blog found</div>

  return (
    <div id={blog.id} className="card mb-2 text-start" style={{ border: 'none', cursor: 'pointer' }} >
      <div  className="row g-0">
      
          <Image alt={"cat Image"} width={500} height={500} style={{height:"100px",width:"100px"}} src={blog.thumbnailImage[0]?.url || tempImg} />
      
        <div    className="col-8">
          <div className="card-body py-2 px-3">
            <h6 className="card-title mb-1">Blog Title :- {blog.title}</h6>
            <p className="card-text mb-1"><small className="text-muted">Blog Slug :- {blog.urlSlug}</small></p>
            <p className="card-text mb-1"><small className="text-muted">Author :- {blog.author.userName}</small></p>
            
          </div>
          
        </div>
      
        <button onClick={onDelete}   type="button"  style={{
          margin: "10px",
          background: "red",
          border: "none",
          borderRadius: "inherit",
          color: "#fff",
          fontSize: "14px",
          padding: "8px 15px"
        }}>Delete</button>
       
       
        {!blog.status ?
        <button onClick={onToggleStatus} type="button"  style={{
          margin: "10px",
          background: "green",
          border: "none",
          borderRadius: "inherit",
          color: "#fff",
          fontSize: "14px",
          padding: "8px 15px"
        }}>Activate</button>
        :

        <button onClick={onToggleStatus}  type="button" style={{
          margin: "10px",
          background: "yellow",
          border: "none",
          borderRadius: "inherit",
          color: "black",
          fontSize: "14px",
          padding: "8px 15px"
        }}>Deactivate</button>

      }


      </div>

     
     




    </div>
  )
}

export default BlogModel
