"use client";
import React, { useState } from 'react';
import ImageUploader from './formComponent/ImageUploader';
import createBlog from '@/app/actions/createBlog';
import { toast } from 'react-toastify';
import RichTextEditor from '../RichTextEditor';

const AddBlogForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [editorValue, setEditorValue] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        setIsLoading(true); // Set loading state
        if (editorValue === '') {
            toast.warning("content required")
            return

        }

        const formData = new FormData(e.target); // Collect form data
        formData.set("content", editorValue)


        try {
            const resObj = await createBlog(formData); // Pass formData to createBlog
            if (resObj.success) {
                toast.success(resObj.message);
            } else {
                toast.warning(resObj.message);
            }
        } catch (error) {
            console.error(error); // Log the error for debugging
            toast.warning("Something went wrong");
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };
    const handleEditorChange = (content) => {
        setEditorValue(content);

    };


    return (
        <div className="col-12 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">

                    <form onSubmit={onSubmit} className="forms-sample">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input name='title' required className="form-control" id="title" placeholder="Title" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="brief">Brief</label>
                            <input name='brief' required className="form-control" id="brief" placeholder="Brief" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="slug">Slug</label>
                            <input name='slug' required className="form-control" id="slug" placeholder="Slug" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <div className="form-group">

                                <RichTextEditor value={editorValue} onChange={handleEditorChange} />

                            </div>
                        </div>
                        <ImageUploader name="thumbnail" label="Thumbnail" />
                        <ImageUploader name="otherImages" label="Other Images" multiple={true} />
                        <button type="submit" className={`btn me-2 btn-gradient-primary`} disabled={isLoading}>
                            {isLoading ? "Submitting..." : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBlogForm;
