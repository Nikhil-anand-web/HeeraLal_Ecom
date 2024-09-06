"use client"
import calculateFinalPrice from '@/lib/calculateFinalPrice'
import percentOf from '@/lib/percentOf'
import Image from 'next/image'
import React from 'react'

const OrderSummary = ({ order, shipingCharges = 0, absoluteCouponDiscount }) => {
    console.log(order.varientMeta.product)
    return (

        <div className="col-md-6">
            <div className="pro-payment px-4">
                <div className="container-fluid">
                    {order.varientMeta.map((obj,index) => <div key={index} className="row mb-5 align-items-center">
                        <div className="col-2 ">
                            <div className="p-1 border">

                                <Image src={obj.varient.product.thumbNail[0].url} width={50} height={60} className="img-fluid" alt="" />
                            </div>

                        </div>

                        <div className="col-6">{obj.varient.product.name}</div>
                        <div className="col-1 p-0">Qty:  {obj.qty}</div>
                        <div className="col-3  text-end">{obj.varient.discount ? <><p style={{ color: "green" }}>
                            Offer price ₹{calculateFinalPrice(obj.varient.mrp, obj.varient.discount)}

                        </p>
                            <s>MRP {obj.varient.mrp}</s>
                        </> : <div className="pro-price">₹{obj.varient.mrp}</div>}</div>
                    </div>)}





                    <div className="row mb-2">
                        <div className="col-6">Subtotal</div>
                        <div className="col-6  text-end">
                            {absoluteCouponDiscount === 0 ? `₹${order.subTotal}` : <div>
                                <small style={{ color: "green" }}> ₹{(order.subTotal - absoluteCouponDiscount).toPrecision(5)} </small>

                                <s>₹{order.subTotal}</s>

                            </div>}
                        </div>
                    </div>

                    <div className="row mb-2">
                        <div className="col-6">taxes</div>
                        <div className="col-6  text-end">₹{percentOf((order.subTotal - absoluteCouponDiscount),order.taxes)}</div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-6">Shiping Charges</div>
                        <div className="col-6  text-end">₹{shipingCharges}</div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <span className="total-heading">Total</span>
                        </div>
                        <div className="col-6 text-end">
                            <div className="total-price">

                                <span className="total-heading"> ₹{parseFloat(((order.subTotal - absoluteCouponDiscount))+(percentOf((order.subTotal - absoluteCouponDiscount),order.taxes)+shipingCharges)).toPrecision(5)}</span>

                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <button type="submit" className="d-block d-md-none mt-3 pay-now-button btn">Pay now</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default OrderSummary
