"use client"
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'

import axios from 'axios';
import { toast } from 'react-toastify';

import { useRouter } from 'next/navigation';
import ImageUploader from './formComponent/ImageUploader';

import objectToFormData from '@/lib/objectToFormData';
import updateProduct from '@/app/actions/updateProduct';
import RichTextEditor from '../RichTextEditor';
import getProductBySlug from '@/app/actions/getProductBySlug';
import CheckBox from './formComponent/CheckBox';
import camelCaseToNormal from '@/lib/camelCaseToNormal';
import getTags from '@/lib/tags';
import CheckBoxType2 from './formComponent/CheckBoxType2';

function validateNoSpaces(value) {
    if (value == "") {
        return true

    }
    if (!/^[a-z]+(-[a-z]+)*$/.test(value.trim()) || /\s/.test(value)) {
        return 'Use lowercase words separated by hyphens, without spaces';
    }
    return true;
}


const UpdateProductForm = ({ categories, productSlugs, reqTOEdit }) => {
    const [isMounted, setisMounted] = useState(false)
    useEffect(() => {
        setisMounted(true)
    }, [])

    const rtr = useRouter()
    const [editorValue, setEditorValue] = useState('');
    const {
        register,
        handleSubmit,
        control,
        setValue,
        getValues,
        watch,
        formState: { errors },
    } = useForm({ mode: "onChange" })
    const identifireState = watch("identifireSlug");
    useEffect(() => {
        if (reqTOEdit && reqTOEdit !== '') {

            setValue("identifireSlug", reqTOEdit);
        }
    },[])
    useEffect(() => {
        const setCurrentStates = async () => {

            try {
                if (identifireState) {
                    const { product, success, message } = await getProductBySlug(identifireState)
                    if (!success) {
                        throw {
                            success,
                            message

                        }

                    }
                    setValue("productName", product.name);
                    setValue("stars", product.stars);
                    setValue("highLights", product.highLights);

                    setEditorValue(product.description)
                    setValue("slugProduct", product.slug);
                    setValue("category", product.category.id);
                    setValue("showOnHome", product.showOnHome);
                    setValue("isFeatured", product.isFeatured);
                    setValue("isVegiterian", product.isVegiterian);
                    setValue("isBestSeller", product.isBestSeller);

                    const orgTags = getTags();
                    orgTags.forEach((tag) => {
                        console.log(1)
                        const hasTag = product.tags.includes(tag); // Check if the product has this tag

                        setValue(tag, hasTag); // Set the checkbox value
                    });

                }





            } catch (error) {
                console.log(error)
                toast.warning(error.message)

            }



        }
        setCurrentStates()
    }, [identifireState])






    const [isLoading, setIsLoading] = useState(false);

    const [imagePreview, setImagePreview] = useState([]);
    if (!isMounted) {
        return

    }

    const onSubmit = async (e) => {
        const tagArr = []
        Object.entries(e).forEach(([key, value]) => {
            if (value === true) {
                tagArr.push(key)

            }


        })
        const orgTags = getTags()
        orgTags.forEach((tg) => {
            delete e[tg];

        })
        e.tags = tagArr.join(',')
        if (tagArr.length === 0) {
            e.tags = ''

        }


        console.log(e)

        const formData = objectToFormData(e); // Collect form data









        try {
            setIsLoading(true)

            const samplePicArray = Array.from(e.samplePhotos);

            samplePicArray.forEach(file => {
                formData.append('samplePhotos', file);
            });
            const thumbnail = Array.from(e.thumbnailProduct);
            thumbnail.forEach(file => {
                formData.append('thumbnailProduct', file);
            });
            const resObj = await updateProduct(formData); // Pass formData to createBlog
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




    const handleFileChange = (event) => {
        setImagePreview([])
        const files = Array.from(event.target.files);
        const validFiles = files.filter(file => (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/webp'));

        if (files.length !== validFiles.length) {
            alert('Only JPEG images are allowed.');
            setValue("samplePhotos", []);
        }





        if (validFiles.length > 0) {

            validFiles.forEach((file, index) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    setImagePreview((e) => {
                        return [...e, reader.result]

                    });
                };


            })






        }
    };
    const onCross = (index) => {
        const originalFileList = getValues('samplePhotos')





        const filesArray = Array.from(originalFileList);


        const filteredFiles = filesArray.filter((file, ind) => ind != index);


        const dataTransfer = new DataTransfer();
        filteredFiles.forEach(file => dataTransfer.items.add(file));
        const newFileList = dataTransfer.files;

        setValue("samplePhotos", newFileList);






        const restImage = (pre) => pre.filter((file, ind) => {
            return index != ind

        })




        setImagePreview(restImage)

    }
    const handleEditorChange = (content) => {
        setEditorValue(content);
        setValue('description', content); // Manually set the value for description
    };






    return (
        <div className="col-12 grid-margin stretch-card">
            <div style={{ height: "20px", width: "20px" }}>



            </div>
            <div className="card">
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="identifireSlug"> Product to update</label>
                        <Controller

                            name="identifireSlug"
                            control={control}
                            rules={{ required: 'identifireSlug is required' }}
                            render={({ field }) => (
                                <select disabled={reqTOEdit || reqTOEdit !== ''} defaultValue={0} className="form-select" {...field}>

                                    <option disabled value={0}>select a valid identifire</option>
                                    {
                                        productSlugs.map((obj, index) => <option key={index} value={obj.slug}>{obj.slug}</option>)
                                    }



                                </select>
                            )}
                        />
                    </div>
                    <p className="card-description">  </p>
                    <form onSubmit={handleSubmit(onSubmit)} className="forms-sample">
                        <div className="form-group" >
                            <label htmlFor="productName">Product Name</label>
                            <input {...register("productName")} type="text" className="form-control" id="productName" placeholder="product Name" />
                            {errors.productName && <span>This field is required</span>}
                        </div>
                        <div className="form-group" >
                            <label htmlFor="stars">Stars</label>
                            <input {...register("stars")} type="text" className="form-control" id="stars" placeholder="stars" />
                            {errors.productName && <span>This field is required</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="tags"> Tags</label>

                            {getTags().map((tg, index) => {

                                return <CheckBoxType2 errors={errors} key={index} control={control} id={tg}>

                                    {camelCaseToNormal(tg)}
                                </CheckBoxType2>
                            })}
                        </div>
                        <div className="form-group" >
                            <label htmlFor="highLights">HighLights</label>
                            <input {...register("highLights")} type="text" className="form-control" id="highLights" placeholder="HighLights" />
                            {errors.highLights && <span>This field is required</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <RichTextEditor value={editorValue} onChange={handleEditorChange} />
                            {errors.description && <span>This field is required</span>}
                        </div>
                        <div className="form-group" >
                            <label htmlFor="slugProduct">Slug for Product </label>
                            <input {...register("slugProduct", {
                                validate: validateNoSpaces,
                                setValueAs: value => value.trim()
                            })} type="text" className="form-control" id="slugProduct" placeholder="Slug for Product" />
                            {errors.slugProduct && <span>{errors.slugProduct.message}</span>}
                        </div>






                        <div className="form-group">
                            <label htmlFor="category"> Category</label>
                            <Controller

                                name="category"
                                control={control}


                                render={({ field }) => (
                                    <select defaultValue={0} className="form-select" {...field} id="parentId">

                                        <option disabled value={0}>select a valid category</option>
                                        {
                                            categories.map((cat, index) => <option key={index} value={cat.id}>{cat.slug}</option>)
                                        }



                                    </select>
                                )}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="showOnHome">On Home Screen</label>
                            <Controller

                                name="showOnHome"
                                control={control}


                                render={({ field }) => (
                                    <select defaultValue={0} className="form-select" {...field} id="showOnHome">
                                        <option disabled value={0}>select a valid state</option>

                                        <option value={true}>True</option>
                                        <option value={false}>False</option>




                                    </select>
                                )}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="isFeatured">Featured</label>
                            <Controller

                                name="isFeatured"
                                control={control}


                                render={({ field }) => (
                                    <select defaultValue={0} className="form-select" {...field} id="isFeatured">
                                        <option disabled value={0}>select a valid state</option>
                                        <option value={true}>True</option>
                                        <option value={false}>False</option>




                                    </select>
                                )}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="isVegiterian">Is Vegiterian</label>
                            <Controller

                                name="isVegiterian"
                                control={control}


                                render={({ field }) => (
                                    <select defaultValue={0} className="form-select" {...field} id="isVegiterian">
                                        <option disabled value={0}>select a valid state</option>
                                        <option value={true}>True</option>
                                        <option value={false}>False</option>




                                    </select>
                                )}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="isBestSeller">Bestseller</label>
                            <Controller

                                name="isBestSeller"
                                control={control}


                                render={({ field }) => (
                                    <select defaultValue={0} className="form-select" {...field} id="isBestSeller">
                                        <option disabled value={0}>select a valid state</option>
                                        <option value={true}>True</option>
                                        <option value={false}>False</option>




                                    </select>
                                )}
                            />
                        </div>

                        <ImageUploader required={false} register={register} name="thumbnailProduct" label="Thumbnail" />

                        <div className="form-group">
                            <p>Upload samplePhotos</p>
                            <label style={{ fontSize: "2rem", cursor: "pointer" }} className="fa  fa-folder-open" htmlFor="samplePhotos"></label>
                            <input style={{ display: 'none' }} onChange={handleFileChange} {...register("samplePhotos", { onChange: handleFileChange })} type="file" name="samplePhotos" className="form-control" id="samplePhotos" placeholder="samplePhotos" multiple accept="image/*" />




                        </div>



                        <div className={"w-4/5 flex flex-wrap"}>
                            {imagePreview.map((sample, index) => {
                                return <div style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
                                    <img
                                        key={index}
                                        src={sample}
                                        alt="..."
                                        style={{ height: '250px', display: 'block' }}
                                        className="img-thumbnail"
                                    />
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            cursor: 'pointer',
                                            backgroundColor: 'white',
                                            borderRadius: '50%',
                                            padding: '5px',
                                        }}
                                        onClick={() => onCross(index)}
                                    >

                                        <i className="fa fa-times"></i>
                                    </div>
                                </div>

                            })}




                        </div>






                        {isLoading ? "Submitting" : <button type="submit" className={` btn me-2 btn-gradient-primary`}> Submit</button>}

                    </form>

                </div>
            </div>
        </div>

    )
}

export default UpdateProductForm
