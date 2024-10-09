"use client"
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'

import axios from 'axios';
import { toast } from 'react-toastify';

import { useRouter } from 'next/navigation';




function validateNoSpaces(value) {
    if (!/^[a-z]+(-[a-z]+)*$/.test(value.trim()) || /\s/.test(value)) {
        return 'Use lowercase words separated by hyphens, without spaces';
    }
    return true;
}



const UpdateCategoryForm = ({ categories }) => {
    const rtr = useRouter()
    const {
        register,
        handleSubmit,
        control,
        setValue,
        getValues,
        
        formState: { errors },
    } = useForm({ mode: "onChange" })

    const [isMounted, setisMounted] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState([]);
    const [identifireSlugState,setidentifireSlug] = useState('')
    const [hierarchialSuperiorCategory,sethierarchialSuperiorCategory] = useState([])
    
    useEffect(() => {
        setisMounted(true)
    }, [])
    useEffect(()=>{
        const getCategoryById = async()=>{
            const res =  await axios.post('/api/v1/hierarchialSuperiorCategory',{id:identifireSlugState})
            sethierarchialSuperiorCategory(res.data.categories)
          
        }
        getCategoryById()
    },[identifireSlugState])
    if (!isMounted) {
        return

    }
    
   

    const onSubmit = async (data) => {
      
     

        const formData = new FormData();

        const narray = Array.from(data.samplePhotos);
        narray.forEach(file => {
            formData.append('samplePhotos', file);
        });
        formData.set('identifireSlug',identifireSlugState)
        formData.set('slug', data.slug)
        formData.set('categoryName', data.categoryName)
        formData.set('parentId', data.parentId)
        formData.set('categoryName', data.categoryName)
        formData.set('showOnHome', data.showOnHome)
       
        try {
            setIsLoading(true);

            const res = await axios.post('/api/v1/updateCategory', formData);

            if (res.data.success) {
                rtr.refresh()
                toast.success(res.data.message);

            }
        } catch (error) {
         
            toast.warning(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };


  

    const handleFileChange = (event) => {
        setImagePreview([])
        const files = Array.from(event.target.files);
        const validFiles = files.filter(file => (file.type === 'image/jpeg' || file.type === 'image/png'||file.type === 'image/jpg' ||file.type === 'image/webp'));

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
    const handleIdentifireSlugSelection=(event)=>{
        setidentifireSlug(event.target.value)
      


    }




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




    return (
        <div className="col-12 grid-margin stretch-card">
            <div style={{ height: "20px", width: "20px" }}>


            </div>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title"></h4>
                    <p className="card-description">  </p>
                    <form onSubmit={handleSubmit(onSubmit)} className="forms-sample">
                       <div className="form-group">
                            <label htmlFor="identifireSlug">Identifire Slug</label>
                            <Controller

                                name="identifireSlug"
                                control={control}
                               
                                
                                // rules={{ required: 'identifireSlug is required' }}
                                render={({ field :{ onChange, onBlur, value, ref } }) => (
                                   
                                    <select defaultValue={0} onChange={handleIdentifireSlugSelection} onBlur={onBlur} value={value} ref={ref} className="form-select" id="identifireSlug">
                                   <option disabled  value={0}>select a valid identifire</option>
                                        
                                        {
                                            categories.map((cat,index) => <option key ={index} value={cat.id}>{cat.slug}</option>)
                                        }



                                    </select>
                                )}
                            />
                        </div>
                        {identifireSlugState?<div >
                        <div className="form-group" >
                            <label htmlFor="categoryName">Category Name</label>
                            <input {...register("categoryName")} type="text" className="form-control" id="categoryName" placeholder="Category Name" />
                            {errors.categoryName && <span>This field is required</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="slug">Slug</label>
                            <input  {...register("slug", {
                                 validate: validateNoSpacesInUpdate,
                                setValueAs: value => value.trim()
                            })} className="form-control" id="slug" placeholder="slug" />
                         
                            {errors.slug && <span>{errors.slug.message}</span>}
                        </div>




                        <div className="form-group">
                            <label htmlFor="parentId">parent Category</label>
                            <Controller

                                name="parentId"
                                control={control}
                                
                                rules={{ required: 'parent is required' }}
                                render={({ field }) => (
                                    <select defaultValue={-2} className="form-select" {...field} id="parentId">
                                        <option disabled value={-2}>select a valid state</option>

                                        <option value={"-1"}>Unchanged</option>
                                        <option value={"0"}>Root</option>
                                        {
                                            hierarchialSuperiorCategory.map((cat,index) => <option key={index} value={cat.id}>{cat.slug}</option>)
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
                                rules={{ required: 'Category is required' }}

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
                            <p>Upload samplePhotos</p>
                            <label style={{ fontSize: "2rem", cursor: "pointer" }} className="fa  fa-folder-open" htmlFor="samplePhotos"></label>
                            <input style={{ display: 'none' }} onChange={handleFileChange} {...register("samplePhotos", { onChange: handleFileChange })} type="file" name="samplePhotos" className="form-control" id="samplePhotos" placeholder="samplePhotos"  accept="image/*" />




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
                        {/* <Image width={30} alt='hh' height={30} src={categories[0].image[0].url}/> */}





                        {isLoading ? "Submitting" : <button type="submit" className={` btn me-2 btn-gradient-primary`}> Submit</button>}
                        </div>:<p>please select the identifire</p>
}
                    </form>

                </div>
            </div>
        </div>

    )
}

export default UpdateCategoryForm
