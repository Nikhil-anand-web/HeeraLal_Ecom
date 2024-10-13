"use client"
import deleteCombo from '@/app/actions/deleteCombo'
import deleteCoupon from '@/app/actions/deleteCoupon'
import toggleComboStatus from '@/app/actions/toggleComboStatus'
import toggleCouponStatus from '@/app/actions/toggleCouponStatus'
import updateCombo from '@/app/actions/updateCombo'
import updateCoupon from '@/app/actions/updateCoupon'

import React, { useState } from 'react'
import { toast } from 'react-toastify'

const CouponModel = ({ coupon }) => {
    
   
    const [isLoading,setIsLoading]=useState(false)
    const onDelete = async () => {
        try {
            
            const res = await deleteCoupon(coupon.id)
            if (!res.success) {
                throw res


            }
            toast.success(res.message)
        } catch (error) {
            console.log(error)

            toast.warning(error.message)

        }
    }
    const ontoggleCouponStatus = async () => {
        try {
            const res = await toggleCouponStatus(coupon.id)
            if (!res.success) {
                throw res

            }
            toast.success(res.message)

        } catch (error) {
            console.log(error)

            toast.warning(error.message)

        }

    }
    const onSubmit= async(e)=>{
        e.preventDefault()
        const isConfirmed = window.confirm("Are you sure you want to delete? This action cannot be undone.");
        if (!isConfirmed) return;  // Exit if the user cancels the action
        const formData = new FormData(e.target)
        formData.set('id',coupon.id)
        try {
            setIsLoading(true)
            const res = await updateCoupon(formData)
            if (!res.success) {
                throw res
            }
            toast.success(res.message)

        } catch (error) {
            console.log(error)

            toast.warning(error.message)

        }finally{
            setIsLoadingisLoading(false)
        }

    }

    return (
        <div className="card mb-2 text-start" style={{ border: 'none', cursor: 'pointer' }} >
            <div className="row g-0">



                <div style={{ display: "flex" }}>

                    <div className="card-body py-2 px-3">
                        <h6 className="card-title mb-1"> coupon code:- {coupon.code}</h6>
                        <p className="card-text mb-1"><small className="text-muted">Discount  :- {coupon.discountValue}</small></p>
                        
                        <p className="card-text mb-1"><small className="text-muted">type  :- {coupon.type}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">minimum order :- {coupon.minOrderValue}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">createdBy :- {coupon.createdBy.userName}</small></p>


                    </div>

                    <form onSubmit={onSubmit} style={{ margin: "27px" }}>
                        <div className="form-group" >

                            <input name='discountValue' type='text' className="form-control" id="discountValue" placeholder="discountValue" />

                        </div>
                        <div className="form-group" >

                            <input name='minOrderValue' type='number' className="form-control" id="minOrderValue" placeholder="minOrderValue" />

                        </div>

                        {isLoading ? (
                            <button type="button" className="btn me-2 btn-gradient-primary" disabled>
                                Submitting...
                            </button>
                        ) : (
                            <button type="submit" className="btn me-2 btn-gradient-primary">
                                Submit
                            </button>
                        )}

                    </form>

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


                {(coupon.status === false ?
                    <button onClick={ontoggleCouponStatus} type="button" style={{
                        margin: "10px",
                        background: "green",
                        border: "none",
                        borderRadius: "inherit",
                        color: "#fff",
                        fontSize: "14px",
                        padding: "8px 15px"
                    }}>Activate</button>
                    :

                    <button onClick={ontoggleCouponStatus} type="button" style={{
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

export default CouponModel
