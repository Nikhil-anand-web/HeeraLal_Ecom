
"use client"
import React, {  useState } from 'react'
import ContactInfoForm from './clientForm/ContactInfoForm'
import OrderSummary from './OrderSummary'

const CheckOutContent = ({userHaveAddress,absoluteCouponDiscount,order,userInfo}) => {
    const [shipingCharges , setShipingCharges] = useState(0)
   
    return (
        <div className="row checkoutpage">
            <div className="col-md-6 leftpart border-end">
                <div className="px-4">
                    <div className="checkout-top d-flex justify-content-between">
                        <h5>Contact Info</h5>

                    </div>
                    <ContactInfoForm userPinCode={userInfo.pinCode} setShipingCharges={setShipingCharges} userHaveAddress={userHaveAddress} order={order} />

                </div>
            </div>


            <OrderSummary order={order} absoluteCouponDiscount={ absoluteCouponDiscount } shipingCharges={shipingCharges}  />
        </div>
    )
}

export default CheckOutContent
