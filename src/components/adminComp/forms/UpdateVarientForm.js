"use client"
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import objectToFormData from '@/lib/objectToFormData';
import getVarientOfProduct from '@/app/actions/getVarientOfProduct';
import CheckBox from './formComponent/CheckBox';
import updateVarient from '@/app/actions/updateVarient';
import getVarientById from '@/app/actions/getVarientById';

function validateNoSpaces(value) {
    if (value == "") {
        return true

    }
    if (!/^[a-z]+(-[a-z]+)*$/.test(value.trim()) || /\s/.test(value)) {
        return 'Use lowercase words separated by hyphens, without spaces';
    }
    return true;
}
const UpdateVarientForm = ({ productSlugs, reqVar }) => {
    const [isMounted, setisMounted] = useState(false)
    const [varients, setVarients] = useState([{}])
    // const [selectedProduct, setSelectedProduct] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,


        formState: { errors },
    } = useForm({ mode: "onChange" })
    const identifireState = watch("parentProductSlug");
    useEffect(() => {
        if (reqVar?.id) {

            setValue("parentProductSlug", reqVar?.id);
        }
    }, [])
    useEffect(() => {
        const setCurrentStates = async () => {

            try {
                if (identifireState && reqVar?.id) {
                    const { varient, success, message } = await getVarientById(identifireState)
                    if (!success) {
                        throw {
                            success,
                            message

                        }

                    }
                    setValue("parentProductSlug", varient.productId);
                    setValue("varient", varient.id);
                    setValue("weight", varient.weight);


                    setValue("mrp", varient.mrp);
                    setValue("qty", varient.qty);
                    setValue("discount", varient.discount);
                    setValue("wholeSalePrice", varient.wholeSalePrice);
                    setValue("slug", varient.slug);
                    setValue("minQtyForBulkOrder", varient.minQtyForBulkOrder);
                    setValue("isBulk", varient.isBulk);
                    setValue("maxQuantityForFewAvailable", varient.maxQuantityForFewAvailable);
                    const sz = JSON.parse(varient.size)
                    setValue("length", sz.length);
                    setValue("bredth", sz.bredth);
                    setValue("height", sz.height);
                    


                }





            } catch (error) {
                console.log(error)
                

            }



        }
        setCurrentStates()
    }, [identifireState])
    useEffect(() => {
        setisMounted(true)
    }, [])


    useEffect(() => {
        if (identifireState) {
            const fetch = async () => {
                const varientSlugs = await getVarientOfProduct(identifireState)
    
                setVarients(varientSlugs.varient)
    
            }
            fetch()
            
        }
       


    }, [identifireState])

    const rtr = useRouter()






  

    if (!isMounted) {
        return

    }

    const onSubmit = async (e) => {
        e.parentProductSlug = identifireState

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

            const resObj = await updateVarient(formData); // Pass formData to createBlog
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
    const handleIndntifierProductChange = (e) => {
        setValue("parentProductSlug", e.target.value);

       

    }

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


                                    render={({ field: { onChange, onBlur, value, ref, name } }) => (
                                        <select disabled={reqVar?.id?true:false} defaultValue={0} onChange={handleIndntifierProductChange} onBlur={onBlur} value={value} ref={ref} name={name} className="form-select"  >

                                            <option disabled value={0}>select a valid identifier</option>
                                            {
                                                productSlugs.map((obj, index) => <option key={index} value={obj.id}>{obj.slug}</option>)
                                            }



                                        </select>

                                    )}

                                />
                            </div>

                            {identifireState ? <>
                                <div className="form-group">
                                    <label htmlFor="varient"> Varient</label>
                                    <Controller

                                        name="varient"
                                        control={control}

                                        rules={{ required: 'Category is required' }}
                                        render={({ field }) => (
                                            <select disabled={reqVar?.id?true:false} defaultValue={0} {...field} className="form-select"  >

                                                <option disabled value={0}>select a valid slug</option>
                                                {
                                                    varients.map((obj, index) => <option key={index} value={obj.id}>{obj.slug}</option>)
                                                }



                                            </select>
                                        )}
                                    />
                                </div>


                                <div className="form-group" >
                                    <label htmlFor="weight">Weight in kg</label>
                                    <input {...register("weight")} type="text" className="form-control" id="weight" placeholder="weight" />
                                    {errors.weight && <span>This field is required</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="isBulk">Is Bulk Varient</label>
                                    <Controller

                                        name="isBulk"
                                        control={control}


                                        render={({ field }) => (
                                            <select defaultValue={0} onChange={handleIndntifierProductChange} {...field} className="form-select"  >

                                                <option disabled value={0}>select a valid identifier</option>
                                                <option value={true}>true</option>
                                                <option value={false}>false</option>




                                            </select>

                                        )}

                                    />
                                </div>
                                <div className="form-group" >
                                    <label htmlFor="length">Length</label>
                                    <input {...register("length")} type="text" className="form-control" id="length" placeholder="length" />
                                    {errors.size && <span>This field is required</span>}
                                </div>
                                <div className="form-group" >
                                    <label htmlFor="bredth">Bredth</label>
                                    <input {...register("bredth")} type="text" className="form-control" id="bredth" placeholder="bredth" />
                                    {errors.size && <span>This field is required</span>}
                                </div>
                                <div className="form-group" >
                                    <label htmlFor="height">Height</label>
                                    <input {...register("height")} type="text" className="form-control" id="height" placeholder="height" />
                                    {errors.size && <span>This field is required</span>}
                                </div>
                                <div className="form-group" >
                                    <label htmlFor="qty">Qty</label>
                                    <CheckBox errors={errors} control={control} id={"append"}>
                                        Append

                                    </CheckBox>
                                    <input {...register("qty")} type="number" className="form-control" id="qty" placeholder="qty" />
                                    {errors.qty && <span>This field is required</span>}
                                </div>

                                <div className="form-group" >
                                    <label htmlFor="mrp">MRP</label>
                                    <input {...register("mrp")} type="text" className="form-control" id="mrp" placeholder="mrp" />
                                    {errors.mrp && <span>This field is required</span>}
                                </div>
                                <div className="form-group" >
                                    <label htmlFor="discount">Discount</label>
                                    <input {...register("discount")} type="text" className="form-control" id="discount" placeholder="discount" />
                                    {errors.mrp && <span>This field is required</span>}
                                </div>
                                <div className="form-group" >
                                    <label htmlFor="wholeSalePrice">WholeSale Price</label>
                                    <input {...register("wholeSalePrice")} type="text" className="form-control" id="wholeSalePrice" placeholder="wholeSalePrice" />
                                    {errors.wholeSalePrice && <span>This field is required</span>}
                                </div>
                                <div className="form-group" >
                                    <label htmlFor="slug">Slug for Varient </label>
                                    <input {...register("slug", {
                                        validate: validateNoSpaces,
                                        setValueAs: value => value.trim()
                                    })} type="text" className="form-control" id="slug" placeholder="slug" />
                                    {errors.slug && <span>{errors.slug.message}</span>}
                                </div>
                                <div className="form-group" >
                                    <label htmlFor="minQtyForBulkOrder">Minimum Quantity for bulk Order</label>
                                    <input {...register("minQtyForBulkOrder")} type="number" className="form-control" id="minQtyForBulkOrder" placeholder="minQtyForBulkOrder" />
                                    {errors.minQtyForBulkOrder && <span>This field is required</span>}
                                </div>
                                <div className="form-group" >
                                    <label htmlFor="maxQuantityForFewAvailable">Minimum Quantity for Few Available Tag</label>
                                    <input {...register("maxQuantityForFewAvailable")} type="number" className="form-control" id="maxQuantityForFewAvailable" placeholder="Maximum Quantity" />
                                    {errors.minQtyForBulkOrder && <span>This field is required</span>}
                                </div>
                                {isLoading ? "Submitting" : <button type="submit" className={` btn me-2 btn-gradient-primary`}> Submit</button>}
                            </> : <p>please select product</p>}

                        </div>








                    </form>

                </div>
            </div>
        </div>

    )
}

export default UpdateVarientForm
