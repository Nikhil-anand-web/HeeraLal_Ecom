"use client"
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify';
import getDistinctDisplayOrder from '@/app/actions/getDistinctDisplayOrder';
import getBanner from '@/app/actions/getBanner';
import Image from 'next/image';
import updateABanner from '@/app/actions/updateABanner';


const BannerSettingForm = ({ pages }) => {
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
    const [identifireSlugState, setidentifireSlug] = useState('')
    const [displayOrders, setdisplayOrders] = useState([])
    const [selectedDisplayOrder, setSelectedDisplayOrder] = useState(-1)
    const [currentBanner, setCurrentBanner] = useState({})

    useEffect(() => {
        setisMounted(true)
    }, [])
    useEffect(() => {
        const fetch = async () => {
            const res = await getDistinctDisplayOrder(identifireSlugState)

            setdisplayOrders(res.displayOrders)

        }
        fetch()


    }, [identifireSlugState])
    useEffect(() => {
        const fetch = async () => {
            const res = await getBanner(identifireSlugState, selectedDisplayOrder)

            setCurrentBanner(res.images)

        }
        fetch()


    }, [identifireSlugState, selectedDisplayOrder])

    if (!isMounted) {
        return

    }



    const onSubmit = async (data) => {



        const formData = new FormData();

        const narray = Array.from(data.samplePhotos);
        narray.forEach(file => {
            formData.append('samplePhotos', file);
        });
        formData.set('identifireSlug', identifireSlugState)
        formData.set('selectedDisplayOrder', selectedDisplayOrder)
        try {
            setIsLoading(true);

            const res = await updateABanner(formData);
            if (!res.success) {
                throw res

            }
           
            toast.success(res.message);

        } catch (error) {

            toast.warning(error.message);
        } finally {
            setIsLoading(false);
        }
    };




    const handleFileChange = (event) => {
        setImagePreview([])
        const files = Array.from(event.target.files);
        const validFiles = files.filter(file =>(file.type === 'image/jpeg' || file.type === 'image/png'||file.type === 'image/jpg' ||file.type === 'image/webp'));

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
    const handleIdentifireSlugSelection = (event) => {
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
    const handelSelectionofDisplayOrder = (e) => {
        setSelectedDisplayOrder(e.target.value)

    }


    console.log(currentBanner)

    return (
        <div className="col-12 grid-margin stretch-card">

            <div className="card">
                <div className="card-body">
                    {currentBanner && currentBanner.images && <Image style={{ width: "100%" }} width={1000} height={400} src={currentBanner?.images.at(0).url} alt='previous' />}

                    <form onSubmit={handleSubmit(onSubmit)} className="forms-sample">
                        <div className="form-group">
                            <label htmlFor="identifireSlug">Identifire Slug</label>
                            <Controller

                                name="identifireSlug"
                                control={control}
                                render={({ field: { onChange, onBlur, value, ref } }) => (

                                    <select defaultValue={0} onChange={handleIdentifireSlugSelection} onBlur={onBlur} value={value} ref={ref} className="form-select" id="identifireSlug">

                                        <option disabled value={0}>select a valid identifier</option>


                                        {
                                            pages.map((cat, index) => <option key={index} value={cat.pageSlug}>{cat.pageSlug}</option>)
                                        }



                                    </select>
                                )}
                            />
                        </div>
                        {identifireSlugState ? <div >
                            <div className="form-group">
                                <label htmlFor="parentId">Display Order</label>
                                <Controller

                                    name="displayOrder"
                                    control={control}
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <select onChange={handelSelectionofDisplayOrder} onBlur={onBlur} value={value} ref={ref} defaultValue={0} className="form-select" id="displayOrder">

<option disabled value={0}>select a valid state</option>

                                            {
                                                displayOrders.map((cat, index) => <option key={index} value={cat.displayOrder}>{cat.displayOrder}</option>)
                                            }



                                        </select>
                                    )}

                                />
                            </div>
                            {errors.displayOrder && <p>{errors.message}</p>}


                            <div className="form-group">
                                <p>Upload samplePhotos</p>
                                <label style={{ fontSize: "2rem", cursor: "pointer" }} className="fa  fa-folder-open" htmlFor="samplePhotos"></label>
                                <input required style={{ display: 'none' }} onChange={handleFileChange} {...register("samplePhotos", { onChange: handleFileChange })} type="file" name="samplePhotos" className="form-control" id="samplePhotos" placeholder="samplePhotos" accept="image/*" />




                            </div>



                            <div className={"w-4/5 flex flex-wrap"}>
                                {imagePreview.map((sample, index) => {
                                    return <div style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
                                        <Image
                                            style={{ width: "100%" }} width={1000} height={400}
                                            key={index}
                                            src={sample}
                                            alt="..."
                                            // style={{ height: '250px', display: 'block' }}
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






                            {selectedDisplayOrder !== -1 && (isLoading ? "Submitting" : <button type="submit" className={` btn me-2 btn-gradient-primary`}> Submit</button>)}
                        </div> : <p>please select the identifier</p>
                        }
                    </form>

                </div>
            </div>
        </div>

    )
}

export default BannerSettingForm
