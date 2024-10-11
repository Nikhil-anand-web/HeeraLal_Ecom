"use client";

import deleteABlog from '@/app/actions/deleteABlog';
import toggleBlogStatus from '@/app/actions/toggleBlogStatus';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

const BlogModel = ({ blog, setRefetchComp }) => {
  const rtr = useRouter()
  const onDelete = async () => {
    const bindedFunction = deleteABlog.bind(null, blog.id);
    const res = await bindedFunction();
    if (res.success) {
      setRefetchComp((e) => !e);
      toast.success(res.message);
    } else {
      toast.warning(res.message);
    }
  };

  const onToggleStatus = async () => {
    const bindedFunction = toggleBlogStatus.bind(null, blog.id);
    const res = await bindedFunction();
    if (res.success) {
      setRefetchComp((e) => !e);
      toast.success(res.message);
    } else {
      toast.warning(res.message);
    }
  };
  const onEdit = () => {
    rtr.push(`/wah-control-center/updateBlog/${blog.id}`)

  }

  if (!blog) return <div>No blog found</div>;

  return (
    <div id={blog.id} className="card mb-4 shadow-sm text-start" style={{ borderRadius: '12px', overflow: 'hidden' }}>
      <div className="row g-0">
        {/* Blog Image */}
        <div className="col-md-3">
          <Image
            alt="Blog Thumbnail"
            width={500}
            height={500}
            className="img-fluid rounded-start"
            style={{ height: "100px", width: "100px" }}
            src={blog.thumbnailImage[0]?.url || tempImg}
          />
        </div>

        {/* Blog Details */}
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title mb-2">Title: {blog.title}</h5>
            <p className="card-text mb-1"><small className="text-muted">Slug: {blog.urlSlug}</small></p>
            <p className="card-text mb-1"><small className="text-muted">Author: {blog.author.userName}</small></p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="col-md-3 d-flex flex-column justify-content-around p-3">
          <button onClick={onEdit} type="button" className="btn btn-primary mb-2" style={{ borderRadius: '8px', padding: '10px' }}>
            Edit
          </button>

          <button onClick={onDelete} type="button" className="btn btn-danger mb-2" style={{ borderRadius: '8px', padding: '10px' }}>
            Delete
          </button>

          {blog.status ? (
            <button onClick={onToggleStatus} type="button" className="btn btn-warning" style={{ borderRadius: '8px', padding: '10px' }}>
              Deactivate
            </button>
          ) : (
            <button onClick={onToggleStatus} type="button" className="btn btn-success" style={{ borderRadius: '8px', padding: '10px' }}>
              Activate
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogModel;
