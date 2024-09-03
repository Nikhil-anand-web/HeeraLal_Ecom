"use client"
import createCombo from '@/app/actions/createCombo';
import createCoupon from '@/app/actions/createCoupon';
import getComboLitmit from '@/app/actions/getSettingValue';
import objectToFormData from '@/lib/objectToFormData';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddCouponForm = () => {
   
   
    const {


        register,
        handleSubmit,
        control,
        setValue,
        getValues,


        formState: { errors },
    } = useForm({ mode: "onChange" })
    const [isLoading, setIsLoading] = useState(false)
   
    // const opts = Array(noOfVarientInvolve).fill(null).map((_, index) =>);

    const onSubmit = async (e) => {
        const formData = objectToFormData(e)
        

        try {
            setIsLoading(true)
            const res =await createCoupon(formData)
            if (!res.success) {
                throw res
                
            }
            toast.success(res.message)

        } catch (error) {
            console.log(error)
            toast.warning(error.message)


        }finally{
            setIsLoading(false)
        }

    }
    return (
        <div className="col-12 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                

                  <form onSubmit={handleSubmit(onSubmit)} className="forms-sample">
                        <div className="form-group">
                            <label htmlFor="code">Code</label>
                            <input name='code' {...register("code", { required: true })} required className="form-control" id="code" placeholder="code" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="type">Type</label>
                            <input name='trype' {...register("type", { required: true })} required className="form-control" id="type" placeholder="type" />
                        </div>

                        
                        <div className="form-group">
                            <label htmlFor="discountvalue">Discount value</label>
                            <textarea
                                {...register("discountvalue", { required: true })}
                                name='discountvalue'
                                required
                                className="form-control"
                                id="discountvalue"
                                placeholder="discountvalue"
                                style={{ resize: "vertical", overflow: "auto" }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="minOrderValue">Minum order value</label>
                            <textarea
                                {...register("minOrderValue", { required: true })}
                                name='minOrderValue'
                                required
                                className="form-control"
                                id="minOrderValue"
                                placeholder="minOrderValue"
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
    )
}

export default AddCouponForm
