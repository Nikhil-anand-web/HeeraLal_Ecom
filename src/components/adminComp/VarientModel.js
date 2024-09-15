"use client"
import Image from 'next/image'
import { toast } from 'react-toastify';

import Spinner from '../global/Spinner';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import deleteVarient from '@/app/actions/deleteVarient';
import toggleVarientStatus from '@/app/actions/toggleVarientStatus';

import makeAVarientDefault from '@/app/actions/makeAVarientDefault';
const VarientModel = ({ varient, setvarient }) => {
  

    const [isLoading, setIsLoading] = useState(false);

    const rtr = useRouter()
    const onDelete = async () => {

        try {
            const resObj = await deleteVarient(varient.id);
            // Pass formData to createBlog
            if (!resObj.success) {
                throw resObj
                
            }
            setvarient((prev) => {
                return prev.filter((obj) => {
                    return obj.id != varient
                        .id

                })

            })
            
        } catch (error) {
            console.error(error); // Log the error for debugging
            toast.warning(error.message);
        } finally {
            setIsLoading(false); // Reset loading state
        }
    }
    const onStatusFlip = async () => {
        try {
            const res = await toggleVarientStatus(varient.id)
            if (!res.success) {
                throw res
                
            }
            setvarient((prev) => {
                const nw = prev.filter((obj) => {
                    return obj.id != varient
                        .id

                })
                return [...nw, { ...varient, status: !varient.status }]

            })
            console.log(res)

            if (res.success) {
                toast.success(res.message)



            }

        } catch (error) {
            console.log(error)

            toast.warning(error.message)

        }

    }
    const makeVarientDefault = async () => {
        try {
            const res = await makeAVarientDefault(varient.id)
            if (!res.success) {
                throw res
                
            }
            setvarient((prev) => {
                var preDef = {}
                const nw = prev.filter((obj) => {
                    if (obj.isDefault) {
                        preDef = obj
                        return false

                    }
                    return (obj.id !== varient
                        .id)

                })
                console.log(nw)

                return [...nw, { ...varient, isDefault: true,status:true }, { ...preDef, isDefault: false }]

            })
            console.log(res)

            if (res.success) {
                toast.success(res.message)



            }

        } catch (error) {
            console.log(error)

            toast.warning(error.message||"something went wrong")

        }

    }



    if (isLoading) {
        return <Spinner />

    }


    return (
        <div id={varient.id} className="card mb-2 text-start" style={{ border: 'none', cursor: 'pointer' }} >
            <div className="row g-0">



                <div style={{ display: "flex" }}>
                    <Image alt={"product image"} width={500} height={500} style={{ height: "100px", width: "100px" }} src={varient.product.thumbNail[0]?.url} />
                    <div className="card-body py-2 px-3">
                        <h6 className="card-title mb-1">Slug:- {varient.slug}</h6>
                        <p className="card-text mb-1"><small className="text-muted">Weight :- {varient.weight} gm</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Size :- {varient.size}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Category Slug :- {varient.qty}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Max Quantity For Few Available :- {varient.maxQuantityForFewAvailable}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">MRP :- {varient.mrp}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Discount :- {varient.discount}%</small></p>
                        <p className="card-text mb-1"><small className="text-muted">No of combo available :- {varient._count.combo}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Cost of Inventory{"(MRP)"} :- ₹{varient.mrp*varient.qty}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Bulk Varient :- {varient.isBulk === true ? <span className="badge badge-success">{" True "}</span> : <span className="badge badge-danger">{" False "}</span>}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Varients in inventory:- {varient.qty}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Default:- {varient.isDefault === true ? <span className="badge badge-success">{" True "}</span> : <span className="badge badge-danger">{" False "}</span>}</small></p>

                        <p className="card-text mb-1"><small className="text-muted">Whole Sale Price:- {varient.wholeSalePrice}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Minimum quantity for bulk:- {varient.minQtyForBulkOrder}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">created By:- {varient.createdBy.userName}</small></p>

                    </div>

                    {varient.isDefault === false && <button onClick={makeVarientDefault} type="button" style={{
                        margin: "10px",
                        background: "#57c45e",
                        border: "none",
                        borderRadius: "inherit",
                        color: "#fff",
                        fontSize: "14px",
                        padding: "8px 15px",
                        height: "35px"
                    }} >Make Default</button>}

                </div>

                {varient.isDefault === false && <button onClick={onDelete} type="button" style={{
                    margin: "10px",
                    background: "red",
                    border: "none",
                    borderRadius: "inherit",
                    color: "#fff",
                    fontSize: "14px",
                    padding: "8px 15px"
                }}>Delete</button>}



                { varient.isDefault === false &&(varient.status === false ?
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
                    }}>Deactivate</button>)

                }


            </div>








        </div>
    )
}

export default VarientModel
