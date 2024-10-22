"use client"
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Image from 'next/image';

import getDistinctDisplayOrderSlider from '@/app/actions/getDistinctDisplayOrderSlider';
import getAllSliderImages from '@/app/actions/getAllSliderImages';
import updateSlider from '@/app/actions/updateSlider';
import dataURLtoFile from '@/lib/dataURLtoFile';
import imageUrlToDataURL from '@/lib/imageUrlToDataURL';
import Spinner from '@/components/global/Spinner';




const SliderSettingForm = ({ pages }) => {
    const {
        register,
        handleSubmit,
        control,
        setValue,
        getValues,
        unregister,
      

        formState: { errors },
    } = useForm({ mode: "onChange" })

    const [isMounted, setisMounted] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState([]);

    const [identifireSlugState, setidentifireSlug] = useState('')
    const [displayOrders, setdisplayOrders] = useState([])
    const [selectedDisplayOrder, setSelectedDisplayOrder] = useState(-1)
  

    useEffect(() => {
        setisMounted(true)
    }, [])
    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true)

            const res = await getDistinctDisplayOrderSlider(identifireSlugState)

            setdisplayOrders(res.displayOrders)
            setIsLoading(false)

        }
        fetch()
        
       


    }, [identifireSlugState])
    useEffect(() => {
        const fetch = async () => {
            const res = await getAllSliderImages(identifireSlugState, selectedDisplayOrder)
            if (res.images) {
                setIsLoading(true)
            
                const arr = await Promise.all(
                    res.images.images.map(async (obj) => {
                        const objs = {
                            uri: await imageUrlToDataURL(obj.url),
                            lnk: obj.link
                        }
                        return objs
                    })
                );
                
                setImagePreview((e) => [...arr, ...e])
                setIsLoading(false)

            }




        }
        fetch()


    }, [identifireSlugState, selectedDisplayOrder])

    if (!isMounted) {
        return

    }



    const onSubmit = async (data) => {



        const formData = new FormData();

        // const narray = Array.from(data.samplePhotos);
        const narray = imagePreview.map((obj) => {

            return dataURLtoFile(obj.uri)

        })
   


        narray.forEach((file, index) => {
            formData.append('samplePhotos', file);
            formData.append(`lnk_${index}`, data[`lnk_${index}`]);
        });
        formData.set('identifireSlug', identifireSlugState)
        formData.set('selectedDisplayOrder', selectedDisplayOrder)

        try {
            setIsLoading(true);

            const res = await updateSlider(formData);
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


    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(imagePreview);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        const sourcelnkValue = getValues(`lnk_${result.source.index}`)
        const destinationlnkValue = getValues(`lnk_${result.destination.index}`)

        setValue(`lnk_${result.source.index}`, destinationlnkValue)
        setValue(`lnk_${result.destination.index}`, sourcelnkValue)

        setImagePreview(items);
    };

    const handleFileChange = (event) => {
        // setImagePreview([])
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
                        return [...e, {uri:reader.result,lnk:""}]

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

        for (let i = index; i < imagePreview.length - 1; i++) {
           

            setValue(`lnk_${i}`, getValues(`lnk_${i + 1}`));

        }
        unregister(`lnk_${imagePreview.length - 1}`)

    }
    const handelSelectionofDisplayOrder = (e) => {
        setSelectedDisplayOrder(e.target.value)

    }


 

    return (
        <div className="col-12 grid-margin stretch-card">

            <div className="card">
                <div className="card-body">


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
                                <input style={{ display: 'none' }} onChange={handleFileChange} {...register("samplePhotos", { onChange: handleFileChange })} type="file" name="samplePhotos" className="form-control" id="samplePhotos" placeholder="samplePhotos" multiple accept="image/*" />
                            </div>



                            <div className={"w-4/5 flex flex-wrap"}>
                            

                                <DragDropContext onDragEnd={handleOnDragEnd}>
                                    <Droppable droppableId="dataUriList" direction="horizontal">
                                        {(provided) => (
                                            <div
                                                className="flex flex-wrap"
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{
                                                    display: "flex",
                                                    gap: "10px",
                                                    flexWrap: "wrap",
                                                }}
                                            >
                                                {imagePreview.map((sample, index) => (
                                                    <Draggable key={index} draggableId={`draggable-${index}`} index={index}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={{
                                                                    ...provided.draggableProps.style,
                                                                    width: "500px", // Adjust width to fit better
                                                                    height: "auto", // Let height adjust automatically
                                                                    margin: "10px",
                                                                    position: snapshot.isDragging ? "fixed" : "relative", // Change position based on dragging state
                                                                    zIndex: snapshot.isDragging ? 1000 : 'auto', // Bring to front when dragging
                                                                }}
                                                            >
                                                                <Image
                                                                    src={sample.uri}
                                                                    alt="..."
                                                                    width={150}
                                                                    height={100}
                                                                    layout='responsive'
                                                                    className="img-thumbnail"
                                                                />
                                                                <div
                                                                    style={{
                                                                        position: "absolute",
                                                                        top: "10px",
                                                                        right: "10px",
                                                                        cursor: "pointer",
                                                                        backgroundColor: "white",
                                                                        borderRadius: "50%",
                                                                        padding: "5px",
                                                                    }}
                                                                    onClick={() => onCross(index)}
                                                                >
                                                                    <i className="fa fa-times"></i>
                                                                </div>
                                                                <div className="form-group">
                                                                    <input
                                                                        defaultValue={sample.lnk}
                                                                        {...register(`lnk_${index}`)}
                                                                        type="text"
                                                                        className="form-control"
                                                                        id={`lnk_${index}`}
                                                                        placeholder="Link for this image"
                                                                    />
                                                                    {errors[`lnk_${index}`] && <p>{errors[`lnk_${index}`].message}</p>}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>








                            </div>






                            {selectedDisplayOrder !== -1 && (isLoading ? "Submitting" : <button type="submit" className={` btn me-2 btn-gradient-primary`}> Submit</button>)}
                        </div> : <p>please select the identifier</p>
                        }
                        {isLoading && <Spinner/>}
                    </form>

                </div>
            </div>
        </div>

    )
}

export default SliderSettingForm

