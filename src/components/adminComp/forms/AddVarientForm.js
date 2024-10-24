"use client"
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import objectToFormData from '@/lib/objectToFormData';
import createVarient from '@/app/actions/createVarient';

function validateNoSpaces(value) {
    if (!/^[a-z]+(-[a-z]+)*$/.test(value.trim()) || /\s/.test(value)) {
        return 'Use lowercase words separated by hyphens, without spaces';
    }
    return true;
}

const AddVarientForm = ({ categories, productSlugs }) => {
    const [isMounted, setisMounted] = useState(false)
    useEffect(() => {
        setisMounted(true)
    }, [])

    const rtr = useRouter()




    console.log(categories)

    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        control,


        formState: { errors },
    } = useForm({ mode: "onChange" })

    if (!isMounted) {
        return

    }

    const onSubmit = async (e) => {

        // Collect form data
        const sizeobj = {
            length: e.length,
            bredth: e.bredth,
            height: e.height
        }
        const str = JSON.stringify(sizeobj)
        e.size = str
        delete e.length
        delete e.height
        delete e.bredth
        const formData = objectToFormData(e);
        try {
            setIsLoading(true)
            const resObj = await createVarient(formData); // Pass formData to createBlog
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
            <div style={{ height: "20px", width: "20px" }}>


            </div>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title"></h4>
                    <p className="card-description">  </p>
                    <form onSubmit={handleSubmit(onSubmit)} className="forms-sample">

                        <div className={"w-4/5 flex flex-wrap"}>

                            <div className="form-group">
                                <label htmlFor="parentProductSlug"> Parent Product Slug</label>
                                <Controller

                                    name="parentProductSlug"
                                    control={control}
                                    rules={{ required: 'parentProductSlug is required' }}

                                    render={({ field }) => (
                                        <select defaultValue={0} className="form-select" {...field}>

                                            <option disabled value={0}>select a valid identifier</option>
                                            {
                                                productSlugs.map((obj, index) => <option key={index} value={obj.id}>{obj.slug}</option>)
                                            }



                                        </select>
                                    )}
                                />
                            </div>


                            <div className="form-group" >
                                <label htmlFor="weight">Weight in grams</label>
                                <input {...register("weight", { required: true })} type="text" className="form-control" id="weight" placeholder="weight" />
                                {errors.weight && <span>This field is required</span>}
                            </div>
                            <div className="form-group" >
                                <label htmlFor="length">Length</label>
                                <input {...register("length", { required: true })} type="text" className="form-control" id="length" placeholder="length" />
                                {errors.size && <span>This field is required</span>}
                            </div>
                            <div className="form-group" >
                                <label htmlFor="bredth">Bredth</label>
                                <input {...register("bredth", { required: true })} type="text" className="form-control" id="bredth" placeholder="bredth" />
                                {errors.size && <span>This field is required</span>}
                            </div>
                            <div className="form-group" >
                                <label htmlFor="height">Height</label>
                                <input {...register("height", { required: true })} type="text" className="form-control" id="height" placeholder="height" />
                                {errors.size && <span>This field is required</span>}
                            </div>
                            <div className="form-group" >
                                <label htmlFor="qty">Qty</label>
                                <input {...register("qty", { required: true })} type="number" className="form-control" id="qty" placeholder="qty" />
                                {errors.qty && <span>This field is required</span>}
                            </div>

                            <div className="form-group" >
                                <label htmlFor="mrp">MRP</label>
                                <input {...register("mrp", { required: true })} type="text" className="form-control" id="mrp" placeholder="mrp" />
                                {errors.mrp && <span>This field is required</span>}
                            </div>
                            <div className="form-group" >
                                <label htmlFor="wholeSalePrice">WholeSale Price</label>
                                <input {...register("wholeSalePrice", { required: true })} type="text" className="form-control" id="wholeSalePrice" placeholder="wholeSalePrice" />
                                {errors.wholeSalePrice && <span>This field is required</span>}
                            </div>
                            <div className="form-group" >
                                <label htmlFor="slugVarient">Slug for Varient </label>
                                <input {...register("slugVarient", {
                                    required: true, validate: validateNoSpaces,
                                    setValueAs: value => value.trim()
                                })} type="text" className="form-control" id="slugVarient" placeholder="slugVarient" />
                                {errors.slugVarient && <span>{errors.slugVarient.message}</span>}
                            </div>
                            <div className="form-group" >
                                <label htmlFor="minQtyForBulkOrder">Minimum Quantity for bulk Order</label>
                                <input {...register("minQtyForBulkOrder", { required: true })} type="number" className="form-control" id="minQtyForBulkOrder" placeholder="minQtyForBulkOrder" />
                                {errors.minQtyForBulkOrder && <span>This field is required</span>}
                            </div>

                        </div>






                        {isLoading ? "Submitting" : <button type="submit" className={` btn me-2 btn-gradient-primary`}> Submit</button>}

                    </form>

                </div>
            </div>
        </div>

    )
}

export default AddVarientForm
