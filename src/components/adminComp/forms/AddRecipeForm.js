"use client"
import createCombo from '@/app/actions/createCombo';
import createRecipe from '@/app/actions/createRecipe';
import getSettingValue from '@/app/actions/getSettingValue';
import objectToFormData from '@/lib/objectToFormData';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddComboForm = ({ productSlug }) => {
    const [maxLimitProduct, setMaxLimitProduct] = useState(0)
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getSettingValue('noOfVarientPossibleInCombo')
                if (!res.success) {
                    throw res

                }
                setMaxLimitProduct(res.value)

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
      


        formState: { errors },
    } = useForm({ mode: "onChange" })
    const [isLoading, setIsLoading] = useState(false)
    const [noOfProductInvolve, setNoOfProductInvolvr] = useState(0);
    // const opts = Array(noOfProductInvolve).fill(null).map((_, index) =>);

    const onSubmit = async (e) => {
        const formData = objectToFormData(e)
        formData.set('noOfProduct',noOfProductInvolve)

        try {
            setIsLoading(true)
            const res =await createRecipe(formData)
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
                    <input name='noOfProduct' type='number' value={noOfProductInvolve} onChange={(e) => (e.target.value <= parseInt(maxLimitProduct) && e.target.value >= 0) ? setNoOfProductInvolvr(e.target.value) : true} className="form-control" placeholder="no. of brand product" />

                    {parseInt(noOfProductInvolve) > 1 && <form onSubmit={handleSubmit(onSubmit)} className="forms-sample">
                        <div className="form-group">
                            <label htmlFor="name">Recipe Name</label>
                            <input name='name' {...register("name", { required: true })} required className="form-control" id="name" placeholder="name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="ingredients">{"Ingredients (other than products in comma seperated value)"}</label>
                            <input name='ingredients' {...register("ingredients", { required: true })} required className="form-control" id="ingredients" placeholder="ingredients" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="videoLink">videoLink</label>
                            <input name='videoLink' {...register("videoLink", { required: true })} required className="form-control" id="videoLink" placeholder="videoLink" />
                        </div>
                        

                        <div className="form-group">
                            <label htmlFor="instructions">Instructions</label>
                            <textarea
                                {...register("instructions", { required: true })}
                                name='instructions'
                                required
                                className="form-control"
                                id="instructions"
                                placeholder="instructions"
                                style={{ resize: "vertical", overflow: "auto" }}
                            />
                        </div>
                        
                        {Array(parseInt(noOfProductInvolve ? noOfProductInvolve : 0)).fill(null).map((_, index) => <div key={index} className="form-group">
                            <label htmlFor="slug"> Product Slug </label>
                            <Controller

                                name={`productsId${index}`}
                                control={control}
                                rules={{ required: 'product slug is required' }}

                                render={({ field }) => (
                                    <select defaultValue={0} className="form-select" {...field}>

                                        <option disabled value={0}>select a valid slug</option>
                                        {
                                            productSlug.map((obj, i) => <option key={i} value={obj.id}>{obj.slug}</option>)
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
