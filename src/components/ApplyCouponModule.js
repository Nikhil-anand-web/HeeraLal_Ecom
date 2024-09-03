"use client"
import applyCoupon from '@/app/actions/applyCoupon'
import removeCoupon from '@/app/actions/removeCoupon'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ApplyCouponModule = ({ coupon }) => {
    console.log(coupon)

    const [couponCode, setCouponCode] = useState('')
    const onApply = async () => {
        try {
            const res = await applyCoupon(couponCode)

            if (!res.success) {
                throw res

            }
            toast.success(res.message)
        } catch (error) {

            toast.warning(error.message)

        }

    }
    const onRemove = async()=>{
        try {
            const res = await  removeCoupon()

            if (!res.success) {
                throw res

            }
            toast.success(res.message)
        } catch (error) {

            toast.warning(error.message)

        }

    }


    if (coupon) {
        return <>
            <div className="pro-add-to-cart-btn">
                <p style={{color:"green"}}>Coupon Code - {coupon.code}</p>
                <button onClick={onRemove} style={{ width: "100%" }}> Remove Coupon <span >&times;</span></button>

            </div>
        </>

    }

    return (
        <>
            <div className="col-md-6 p-2 border"><strong>Coupon Code</strong></div>
            <div className="col-md-6 p-2 border text-end"><input value={couponCode} onChange={(e) => setCouponCode(e.target.value)} type="text" className="form-control" placeholder="Coupon Code" /></div>

            <div style={{ width: "100%" }} className="pro-add-to-cart-btn">
                <button onClick={onApply} style={{ width: "100%" }} > Apply </button>


            </div>
        </>
    )
}

export default ApplyCouponModule
