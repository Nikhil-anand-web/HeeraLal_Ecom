"use client"
import createCombo from '@/app/actions/createCombo';
import createRecipe from '@/app/actions/createRecipe';
import getSettingValue from '@/app/actions/getSettingValue';
import objectToFormData from '@/lib/objectToFormData';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import RichTextEditor from '../RichTextEditor';
import updateRecipe from '@/app/actions/updateRecipe';

const UpdateRecipeForm = ({ productSlug, recipe }) => {
    const [maxLimitProduct, setMaxLimitProduct] = useState(0)
    const [editorValue, setEditorValue] = useState('');
    const [editorValue2, setEditorValue2] = useState('');
    const [noOfProductInvolve, setNoOfProductInvolvr] = useState(recipe.products.length);
    const {


        register,
        handleSubmit,
        control,
        setValue,
        watch,

        formState: { errors },
    } = useForm({ mode: "onChange" })
    const identifireId = watch("identifireId");
    useEffect(() => {
        if (recipe.id) {

            setValue("identifireId", recipe.id);
        }
    }, [])
    useEffect(() => {
        const setCurrentStates = async () => {

            try {
                if (identifireId && recipe.id) {

                    setValue("noOfProduct", recipe.products.length);
                    // setNoOfProductInvolvr(recipe.products.length)
                    setValue("name", recipe.name);
                    setValue("ingredients", recipe.ingredients);

                    setEditorValue2(recipe.brief)
                    setEditorValue(recipe.instructions)
                    setValue("videoLink", recipe.videoLink);
                    recipe.products.forEach((obj, index) => {

                        setValue(`productsId${index}`, obj.id);

                    })

                }





            } catch (error) {
                console.log(error)
                toast.warning(error.message)

            }



        }
        setCurrentStates()
    }, [identifireId,noOfProductInvolve])
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

    const [isLoading, setIsLoading] = useState(false)

    // const opts = Array(noOfProductInvolve).fill(null).map((_, index) =>);

    const onSubmit = async (e) => {
        const formData = objectToFormData(e)
        formData.set('noOfProduct', noOfProductInvolve)
        formData.set('id',recipe.id)
        console.log(formData)

        try {
            setIsLoading(true)
            const res = await updateRecipe(formData)
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
    // instructions
    const handleEditorChange = (content) => {
        setEditorValue(content);
        setValue('instructions', content); // Manually set the value for description
    };
    const handleEditorChange2 = (content) => {
        setEditorValue2(content);
        setValue('brief', content); // Manually set the value for description
    };
    return (
        <div className="col-12 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <label htmlFor="name">Number of product involve in this recipe</label>
                    <input name='noOfProduct' type='number' value={noOfProductInvolve} onChange={(e) => (e.target.value <= parseInt(maxLimitProduct) && e.target.value >= 0) ? setNoOfProductInvolvr(e.target.value) : true} className="form-control" placeholder="no. of brand product" />

                    {parseInt(noOfProductInvolve) >= 1 && <form onSubmit={handleSubmit(onSubmit)} className="forms-sample">
                        <div className="form-group">
                            <label htmlFor="name">Recipe Name</label>
                            <input name='name' {...register("name", { required: true })} required className="form-control" id="name" placeholder="name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="brief">Brief</label>
                            {/* <input name='brief' {...register("brief", { required: true })} required className="form-control" id="brief" placeholder="brief" /> */}
                            <RichTextEditor value={editorValue2} onChange={handleEditorChange2} />
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

                            <label htmlFor="content">Instruction</label>
                            <div className="form-group">

                                <RichTextEditor value={editorValue} onChange={handleEditorChange} />


                            </div>
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

export default UpdateRecipeForm
