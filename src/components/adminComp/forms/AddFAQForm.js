"use client";
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import createFAQ from '@/app/actions/createFAQ';

const AddFAQForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(''); // Clear previous errors

        const formData = new FormData(e.target);

        try {
            const resObj = await createFAQ(formData);
            if (resObj.success) {
                toast.success(resObj.message);
            } else {
                toast.warning(resObj.message);
            }
        } catch (error) {
            console.error(error);
            toast.warning("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="col-12 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                   
                    <form onSubmit={onSubmit} className="forms-sample">
                        <div className="form-group">
                            <label htmlFor="question">Question</label>
                            <input name='question' required className="form-control" id="question" placeholder="Question" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="answer">Answer</label>
                            <textarea
                                name='answer'
                                required
                                className="form-control"
                                id="answer"
                                placeholder="Answer"
                                style={{ resize: "vertical", overflow: "auto" }}
                            />
                        </div>

                        {isLoading ? (
                            <button type="button" className="btn me-2 btn-gradient-primary" disabled>
                                Submitting...
                            </button>
                        ) : (
                            <button type="submit" className="btn me-2 btn-gradient-primary">
                                Submit
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddFAQForm;
