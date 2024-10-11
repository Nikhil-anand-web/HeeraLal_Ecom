"use client";
import React, { useState } from 'react';
import ImageUploader from './formComponent/ImageUploader';
import createBlog from '@/app/actions/createBlog';
import { toast } from 'react-toastify';
import RichTextEditor from '../RichTextEditor';
import updateBlog from '@/app/actions/updateBlog';

function validateNoSpaces(value) {
    if(value==='') return false
    if (!/^[a-z]+(-[a-z]+)*$/.test(value.trim()) || /\s/.test(value)) {
        return 'Use lowercase words separated by hyphens, without spaces';
    }
    return true;
}

const UpdateBlogForm = ({blog}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [editorValue, setEditorValue] = useState(blog.content);
    const [slugError, setSlugError] = useState(''); // State to track slug validation error

    const onSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        setIsLoading(true); // Set loading state

        // Slug validation
        const slug = e.target.slug.value;
        const slugValidation = validateNoSpaces(slug);
        if (slugValidation !== true) {
            setSlugError(slugValidation); // Display validation error
            setIsLoading(false);
            return;
        }
        setSlugError(''); // Clear error if validation passes

       

        const formData = new FormData(e.target); // Collect form data
        formData.set("content", editorValue);

        try {
            const resObj = await updateBlog(formData,blog.id); // Pass formData to createBlog
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
                            <input name='title' defaultValue={blog.title} className="form-control" id="title" placeholder="Title" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="brief">Brief</label>
                            <input name='brief' defaultValue={blog.brief}  className="form-control" id="brief" placeholder="Brief" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="slug">Slug</label>
                            <input
                                name='slug'
                                defaultValue={blog.urlSlug}
                                className="form-control"
                                id="slug"
                                placeholder="Slug"
                            />
                            {slugError && <small className="text-danger">{slugError}</small>} {/* Display slug error */}
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

export default UpdateBlogForm;
