"use client"
import getOrderAsWhole from '@/app/actions/getOrderAsWhole';
import calculateFinalPrice from '@/lib/calculateFinalPrice';
import calculateFinalPriceOfComboAndThumbnailArray from '@/lib/calculateFinalPriceOfComboAndThumbnailArray';
import percentOf from '@/lib/percentOf';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print';

const PrintInvoiceButton = ({ orderId }) => {
    const rf = useRef()
    const rtr = useRouter()
    const [order, setOrder] = useState({})
    const [companyAddress, setCompanyAddress] = useState({})
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = order && order.createdAt && order.createdAt.toLocaleDateString('en-US', options);

    useEffect(() => {

        const fetcher = async () => {
            const res = await getOrderAsWhole(orderId);
            setOrder(res.order)
            setCompanyAddress(res.companyAddress)

        }
        fetcher()


    }, [])





    const getCouponDiscount = () => {
        if (!order.comboMeta.type) {
            return 0

        }
        if (order?.couponMeta?.type === 'absolute') {
            return parseFloat(order?.couponMeta?.discountValue)

        } else if (order?.couponMeta?.type === 'percent') {
            const val = percentOf(order?.subTotal, parseFloat(order?.couponMeta?.discountValue))

            return val


        }
    }
    const handlePrint = useReactToPrint({
        content: () => rf.current,
        documentTitle: "Print This Document",
        removeAfterPrint: true,
    });
    return (
        <div className="container">
            <div style={{ display: "none" }}>
                {Object.keys(order).length > 0 && Object.keys(companyAddress).length && <div ref={rf} className="row justify-content-center p-4" >
                    <div className="col-md-6">
                        <div className="invoice-wrapper">
                            <div className="invoice-header d-flex mb-3 justify-content-between align-items-center">
                                <div className="header-image">

                                    <Image src={"/images/logo.png"} width={60} height={60} layout='responsive' className="img-fluid" alt="logo" />

                                </div>
                                <div className="header-content">
                                    <h3>Invoice</h3>
                                </div>
                            </div>
                            <div className="invoice-body">
                                <div className="top-sec">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="details-box  d-flex mb-3 justify-content-between">
                                                <div className="address-box">
                                                    <ul>
                                                        <li>{companyAddress.value[0].area}</li>
                                                        <li>{companyAddress.value[1].cityAndState}</li>
                                                        <li>{companyAddress.value[2].country}</li>
                                                    </ul>
                                                </div>

                                                <div className="address-box">
                                                    <ul>
                                                        <li className="theme-color">Consumer Name : <span className="text-content">{order.CustomerMeta.firstName} {order.CustomerMeta.lastName}</span></li>
                                                        <li className="theme-color">Issue Date : <span className="text-content">{formattedDate}</span></li>
                                                        <li className="theme-color">Order Id : <span className="text-content">{order.orderId}</span></li>

                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="invoice-table">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>

                                                    <th>Bank Transaction Id</th>
                                                    <th>AWB No:</th>

                                                    <th>Payment Status:</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>

                                                    <td>{order.paymentToken.BANKTXNID}</td>
                                                    <td>{order.awb || "not shiped"}</td>

                                                    <td>{order.paymentStatus == 1 ? "paid" : "refund request raised"}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="invoice-table-2">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th className="text-start">Item detail</th>
                                                    <th>Qty</th>
                                                    <th>Price</th>
                                                    <th>Amout</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.varientMeta.map((obj, index) => <tr key={index}>
                                                    <td className="text-content">1</td>
                                                    <td>
                                                        <ul className="text-start item-detail">
                                                            <li>{obj.varient.product.name}</li>
                                                            <li className="text-content">weight - {obj.varient.weight} gm
                                                            </li>
                                                        </ul>
                                                    </td>
                                                    <td>{obj.qty}</td>
                                                    <td>{parseFloat(obj.varient.discount) === 0 ? <div className="pro-price">₹{obj.varient.mrp}</div> : <><p style={{ color: "green" }}>
                                                        Offer price ₹{calculateFinalPrice(obj.varient.mrp, obj.varient.discount)}

                                                    </p>
                                                        <s>MRP  ₹{obj.varient.mrp}</s>
                                                    </>}</td>
                                                    <td> ₹{calculateFinalPrice(obj.varient.mrp, obj.varient.discount) * obj.qty}</td>
                                                </tr>)}
                                                {order.comboMeta.map((obj, index) => {
                                                    const { totalMrp, actualPrice } = calculateFinalPriceOfComboAndThumbnailArray(obj.combo)


                                                    return <tr key={index}>
                                                        <td className="text-content">1</td>
                                                        <td>
                                                            <ul className="text-start item-detail">
                                                                <li>{obj.combo.name}</li>

                                                            </ul>
                                                        </td>
                                                        <td>{obj.qty}</td>
                                                        <td>{parseFloat(obj.combo.discountInPercent) === 0 ? <div className="pro-price">₹{totalMrp}</div> : <><p style={{ color: "green" }}>
                                                            Offer price ₹{actualPrice}

                                                        </p>
                                                            <s>MRP  ₹{totalMrp}</s>
                                                        </>}</td>
                                                        <td> ₹{actualPrice * obj.qty}</td>
                                                    </tr>
                                                })}




                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="price-box">
                                    <ul>
                                        <li>Sub Total - </li>
                                        <li className="theme-color"> ₹{order.subTotal}</li>
                                    </ul>
                                    {order.couponMeta && <ul>
                                        <li>Coupon Discount -</li>
                                        <li className="theme-color"> ₹{getCouponDiscount()}</li>
                                    </ul>}
                                    {order.refralDiscountAbsolute > 0 && <ul>
                                        <li>Referal Discount -</li>
                                        <li className="theme-color"> ₹{order.refralDiscountAbsolute}</li>
                                    </ul>}
                                    <ul>
                                        <li>GST</li>
                                        <li className="theme-color"> ₹{order.taxes}% {`(₹${percentOf((order.subTotal - order.refralDiscountAbsolute - getCouponDiscount()), order.taxes).toPrecision(5)})`}</li>
                                    </ul>
                                    <ul>
                                        <li>Shiping Charges</li>
                                        <li className="theme-color"> ₹{order.shipingCharges}</li>
                                    </ul>

                                    <ul>
                                        <li>Grand Total</li>
                                        <li className="theme-color">₹{Math.round(order.finalPrice)}</li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>}
            </div>


            <button className="btn text-white print-button rounded ms-2" onClick={handlePrint}>Invoice</button>





        </div>
    )
}

export default PrintInvoiceButton
