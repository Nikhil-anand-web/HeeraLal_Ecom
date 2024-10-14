"use client"
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import ImageUploader from './formComponent/ImageUploader';
import createProduct from '@/app/actions/createProduct';
import objectToFormData from '@/lib/objectToFormData';
import RichTextEditor from '../RichTextEditor';
import CheckBoxType2 from './formComponent/CheckBoxType2';
import getTags from '@/lib/tags';
import camelCaseToNormal from '@/lib/camelCaseToNormal';

function validateNoSpaces(value) {
    if (!/^[a-z]+(-[a-z]+)*$/.test(value.trim()) || /\s/.test(value)) {
        return 'Use lowercase words separated by hyphens, without spaces';
    }
    return true;
}



const AddProductForm = ({ categories }) => {
    const [isMounted, setisMounted] = useState(false)
    useEffect(() => {
        setisMounted(true)
    }, [])

    const rtr = useRouter()
    const [editorValue, setEditorValue] = useState('');




    console.log(categories)

    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        control,
        setValue,
        getValues,

        formState: { errors },
    } = useForm({ mode: "onChange" })
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

        const formData = objectToFormData(e); // Collect form data






        try {
            setIsLoading(true)

            const samplePicArray = Array.from(e.samplePhotos);
            console.log(samplePicArray)
            samplePicArray.forEach(file => {
                formData.append('samplePhotos', file);
            });
            const thumbnail = Array.from(e.thumbnailProduct);
            thumbnail.forEach(file => {
                formData.append('thumbnailProduct', file);
            });
            const resObj = await createProduct(formData); // Pass formData to createBlog
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
                    <h4 className="card-title"></h4>
                    <p className="card-description">  </p>
                    <form onSubmit={handleSubmit(onSubmit)} className="forms-sample">
                        <div className="form-group" >
                            <label htmlFor="productName">Product Name</label>
                            <input {...register("productName", { required: true })} type="text" className="form-control" id="productName" placeholder="product Name" />
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
                            <label htmlFor="highLights">Highlights</label>
                            <input {...register("highLights", { required: true })} type="text" className="form-control" id="highLights" placeholder="HighLights" />
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
                                required: true, validate: validateNoSpaces,
                                setValueAs: value => value.trim()
                            })} type="text" className="form-control" id="slugProduct" placeholder="Slug for Product" />
                            {errors.slugProduct && <span>{errors.slugProduct.message}</span>}
                        </div>






                        <div className="form-group">
                            <label htmlFor="category"> Category</label>
                            <Controller

                                name="category"
                                control={control}
                                rules={{ required: ' required' }}

                                render={({ field }) => (
                                    <select defaultValue={"0"} className="form-select" {...field} id="parentId">

                                        <option disabled value={0}>select a valid option</option>
                                        {
                                            categories.map((cat) => <option value={cat.id}>{cat.slug}</option>)
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
                                rules={{ required: 'required' }}

                                render={({ field }) => (
                                    <select defaultValue={0} className="form-select" {...field} id="showOnHome">
                                        <option disabled value={0}>select a valid option</option>

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
                                rules={{ required: 'required' }}

                                render={({ field }) => (
                                    <select defaultValue={0} className="form-select" {...field} id="isFeatured">
                                        <option disabled value={0}>select a valid option</option>

                                        <option value={true}>True</option>
                                        <option value={false}>False</option>




                                    </select>
                                )}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="isVegiterian">Is Vegetarian</label>
                            <Controller

                                name="isVegiterian"
                                control={control}
                                rules={{ required: 'required' }}

                                render={({ field }) => (
                                    <select defaultValue={0} className="form-select" {...field} id="isVegiterian">
                                        <option disabled value={0}>select a valid option</option>

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
                                rules={{ required: 'required' }}

                                render={({ field }) => (
                                    <select defaultValue={0} className="form-select" {...field} id="isBestSeller">
                                        <option disabled value={0}>select a valid state</option>

                                        <option value={true}>True</option>
                                        <option value={false}>False</option>




                                    </select>
                                )}
                            />
                        </div>

                        <ImageUploader required={true} register={register} name="thumbnailProduct" label="Thumbnail" />

                        <div className="form-group">
                            <p>Upload samplePhotos</p>
                            <label style={{ fontSize: "2rem", cursor: "pointer" }} className="fa  fa-folder-open" htmlFor="samplePhotos"></label>
                            <input required ={true} style={{ display: 'none' }} onChange={handleFileChange} {...register("samplePhotos", { onChange: handleFileChange })} type="file" name="samplePhotos" className="form-control" id="samplePhotos" placeholder="samplePhotos" multiple="true" accept="image/*" />




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

                            <h2>
                                Base Product Details
                            </h2>



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
                                <label htmlFor="bredth">Breadth</label>
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

export default AddProductForm
