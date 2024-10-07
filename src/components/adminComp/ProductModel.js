"use client"


import Image from 'next/image'
import { toast } from 'react-toastify';
import deleteAProduct from '@/app/actions/deleteAProduct';
import Spinner from '../global/Spinner';
import toggleProductStatus from '@/app/actions/toggleProductStatus';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const ProductModel = ({ product, setRefetchComp }) => {

    const [isLoading, setIsLoading] = useState(false);

    const rtr = useRouter()
    const onDelete = async () => {

        try {
            const resObj = await deleteAProduct(product.id);
            if (!resObj.success) {
                throw resObj

            }
            setRefetchComp((e)=>!e)
          
                toast.success(resObj.message);
          
        } catch (error) {
            console.error(error); // Log the error for debugging
            toast.warning("Something went wrong");
        } finally {
            setIsLoading(false); // Reset loading state
        }
    }
    const onStatusFlip = async () => {
        try {
            const res = await toggleProductStatus(product.id)
            if (!res.success) {
                throw res

            }
            setRefetchComp((e)=>!e)
            console.log(res)

            if (res.success) {
                toast.success(res.message)



            }

        } catch (error) {
            console.log(error)

            toast.warning(error?.message||"something went wrong")

        }

    }
    if (!product) {
        return <div>the category is empty</div>

    }


    if (isLoading) {
        return <Spinner />

    }
    const onClick = () => {
        rtr.push(`/wah-control-center/varients/${product.id}`)

    }

    return (
        <div id={product.id} className="card mb-2 text-start" style={{ border: 'none', cursor: 'pointer' }} >
            <div className="row g-0">

                <Image alt={"product image"} width={500} height={500} style={{ height: "100px", width: "100px" }} src={product.thumbNail[0]?.url} />

                <div onClick={onClick} className="col-8">
                    <div className="card-body py-2 px-3">
                        <h6 className="card-title mb-1">Product Name :- {product.name}</h6>
                        <p className="card-text mb-1"><small className="text-muted">HighLights :- {product.highLights}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Product Slug :- {product.slug}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Category Slug :- {product.category.slug}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Description :- {product.description}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">varients :- {product._count.varient}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Show on Home :- {product.showOnHome === true ? <span className="badge badge-success">{" True "}</span> : <span className="badge badge-danger">{" False "}</span>}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Featured :- {product.isFeatured === true ? <span className="badge badge-success">{" True "}</span> : <span className="badge badge-danger">{" False "}</span>}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">BestSeller :- {product.isBestSeller === true ? <span className="badge badge-success">{" True "}</span> : <span className="badge badge-danger">{" False "}</span>}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">last updated :- {product.updatedAt.toString()}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">created By:- {product.createdBy.userName}</small></p>

                    </div>

                </div>
                <button onClick={onDelete} type="button" style={{
                    margin: "10px",
                    background: "red",
                    border: "none",
                    borderRadius: "inherit",
                    color: "#fff",
                    fontSize: "14px",
                    padding: "8px 15px"
                }}>Delete</button>


                {!product.status ?
                    <button onClick={onStatusFlip} type="button" style={{
                        margin: "10px",
                        background: "green",
                        border: "none",
                        borderRadius: "inherit",
                        color: "#fff",
                        fontSize: "14px",
                        padding: "8px 15px"
                    }}>Activate</button>
                    :

                    <button onClick={onStatusFlip} type="button" style={{
                        margin: "10px",
                        background: "yellow",
                        border: "none",
                        borderRadius: "inherit",
                        color: "black",
                        fontSize: "14px",
                        padding: "8px 15px"
                    }}>Deactivate</button>

                }


            </div>
            








        </div>
    )
}

export default ProductModel
