"use client"
import createCombo from '@/app/actions/createCombo';
import getSettingValue from '@/app/actions/getSettingValue';
import objectToFormData from '@/lib/objectToFormData';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddComboForm = ({ varientSlugs }) => {
    const [maxLimitVarient, setMaxLimitVarient] = useState(0)
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getSettingValue('noOfVarientPossibleInCombo')
                if (!res.success) {
                    throw res

                }
                setMaxLimitVarient(res.value)

            } catch (error) {
                console.log(error)

            }


        }
        fetch()
    }, [])
    const {


        register,
        handleSubmit,
        control,
        setValue,
        getValues,


        formState: { errors },
    } = useForm({ mode: "onChange" })
    const [isLoading, setIsLoading] = useState(false)
    const [noOfVarientInvolve, setNoOfVarientInvolve] = useState(0);
    // const opts = Array(noOfVarientInvolve).fill(null).map((_, index) =>);
    console.log(maxLimitVarient)
    const onSubmit = async (e) => {
        const formData = objectToFormData(e)
        formData.set('noOfVarient', noOfVarientInvolve)

        try {
            setIsLoading(true)
            const res = await createCombo(formData)
            if (!res.success) {
                throw res

            }
            toast.success(res.message)

        } catch (error) {
            console.log(error)
            toast.warning(error.message)


        } finally {
            setIsLoading(false)
        }

    }
    return (
        <div className="col-12 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <input name='name' type='number' value={noOfVarientInvolve} onChange={(e) => (e.target.value <= parseInt(maxLimitVarient) && e.target.value >= 0) ? setNoOfVarientInvolve(e.target.value) : true} className="form-control" placeholder="the limit of " />

                    {parseInt(noOfVarientInvolve) > 1 && <form onSubmit={handleSubmit(onSubmit)} className="forms-sample">
                        <div className="form-group">
                            <label htmlFor="name">Combo Name</label>
                            <input name='name' {...register("name", { required: true })} required className="form-control" id="name" placeholder="name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="qty">Quantity</label>
                            <input name='qty' {...register("qty", { required: true })} required className="form-control" id="qty" placeholder="qty" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Combo Description</label>
                            <textarea
                                {...register("description", { required: true })}
                                name='description'
                                required
                                className="form-control"
                                id="description"
                                placeholder="description"
                                style={{ resize: "vertical", overflow: "auto" }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="discountInPercent">Discount Percent</label>
                            <textarea
                                {...register("discountInPercent", { required: true })}
                                name='discountInPercent'
                                required
                                className="form-control"
                                id="discountInPercent"
                                placeholder="discountInPercent"
                                style={{ resize: "vertical", overflow: "auto" }}
                            />
                        </div>
                        {Array(parseInt(noOfVarientInvolve ? noOfVarientInvolve : 0)).fill(null).map((_, index) => <div key={index} className="form-group">
                            <label htmlFor="slug"> Varient Slug</label>
                            <Controller

                                name={`varientId${index}`}
                                control={control}
                                rules={{ required: 'parentProductSlug is required' }}

                                render={({ field }) => (
                                    <select defaultValue={0} className="form-select" {...field}>

                                        <option disabled value={0}>select a valid state</option>
                                        {
                                            varientSlugs.map((obj, i) => <option key={i} value={obj.id}>{obj.slug}</option>)
                                        }



                                    </select>
                                )}
                            />
                        </div>)}

                        {isLoading ? (
                            <button type="button" className="btn me-2 btn-gradient-primary" disabled>
                                Submitting...
                            </button>
                        ) : (
                            <button type="submit" className="btn me-2 btn-gradient-primary">
                                Submit
                            </button>
                        )}
                    </form>}
                </div>
            </div>
        </div>
    )
}

export default AddComboForm
