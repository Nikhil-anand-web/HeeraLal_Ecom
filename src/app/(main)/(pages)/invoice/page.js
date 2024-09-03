"use client"
import { useReactToPrint } from 'react-to-print';
import Image from 'next/image'
import React, { useRef } from 'react'
import logo from "../../../../images/logo.png"
import sign from "../../../../images/sign.png"
const Page = () => {
    const rf = useRef()

    const handlePrint = useReactToPrint({
        content: () => rf.current,
        documentTitle: "Print This Document",
        removeAfterPrint: true,
      });
    return (
        <section className="invoices">
            <div className="container">
                <div className="row justify-content-center p-4"  ref={rf}>
                    <div className="col-md-6">
                        <div className="invoice-wrapper">
                            <div className="invoice-header d-flex mb-3 justify-content-between align-items-center">
                                <div className="header-image">

                                    <Image src={logo} className="img-fluid" alt="logo" />

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
                                                        <li>2345 Tail Ends Road,</li>
                                                        <li>ORADELL, New Jersey</li>
                                                        <li>NJ, 38740</li>
                                                    </ul>
                                                </div>

                                                <div className="address-box">
                                                    <ul>
                                                        <li className="theme-color">Issue Date : <span className="text-content">20
                                                            March, 2022</span></li>
                                                        <li className="theme-color">Invoice No : <span className="text-content">904679</span></li>
                                                        <li className="theme-color">Email : <span className="text-content">user@gmail.com</span></li>
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
                                                    <th>Invoice Date:</th>
                                                    <th>Invoice No:</th>
                                                    <th>Account No:</th>
                                                    <th>Due Amount:</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>27- Nove-2022</td>
                                                    <td>AP 3746908</td>
                                                    <td>3898409291</td>
                                                    <td>$2797.00</td>
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
                                                <tr>
                                                    <td className="text-content">1</td>
                                                    <td>
                                                        <ul className="text-start item-detail">
                                                            <li>Meatigo Premium Goat Curry</li>
                                                            <li className="text-content">Lorem ipsum dolor sit, amet,
                                                                consectetur adipisicing elit.
                                                            </li>
                                                        </ul>
                                                    </td>
                                                    <td>17</td>
                                                    <td>$7.00</td>
                                                    <td>$116.02</td>
                                                </tr>

                                                <tr>
                                                    <td className="text-content">2</td>
                                                    <td>
                                                        <ul className="text-start item-detail">
                                                            <li>Dates Medjoul Premium...</li>
                                                            <li className="text-content">Lorem ipsum dolor sit, amet,
                                                                consectetur adipisicing elit.
                                                            </li>
                                                        </ul>
                                                    </td>
                                                    <td>25</td>
                                                    <td>$60.00</td>
                                                    <td>$156.02</td>
                                                </tr>

                                                <tr>
                                                    <td className="text-content">3</td>
                                                    <td>
                                                        <ul className="text-start item-detail">
                                                            <li>Good Life Walnut Kernels...</li>
                                                            <li className="text-content">Lorem ipsum dolor sit, amet,
                                                                consectetur adipisicing elit.
                                                            </li>
                                                        </ul>
                                                    </td>
                                                    <td>18</td>
                                                    <td>$10.00</td>
                                                    <td>$144.02</td>
                                                </tr>

                                                <tr>
                                                    <td className="text-content">4</td>
                                                    <td>
                                                        <ul className="text-start item-detail">
                                                            <li>Apple Red Premium Imported</li>
                                                            <li className="text-content">Lorem ipsum dolor sit, amet,
                                                                consectetur adipisicing elit.
                                                            </li>
                                                        </ul>
                                                    </td>
                                                    <td>60</td>
                                                    <td>$67.00</td>
                                                    <td>$345.02</td>
                                                </tr>

                                                <tr>
                                                    <td className="text-content">5</td>
                                                    <td>
                                                        <ul className="text-start item-detail">
                                                            <li>Apple Red Premium Imported</li>
                                                            <li className="text-content">Lorem ipsum dolor sit, amet,
                                                                consectetur adipisicing elit.
                                                            </li>
                                                        </ul>
                                                    </td>
                                                    <td>17</td>
                                                    <td>$45.00</td>
                                                    <td>$365.02</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="price-box">
                                    <ul>
                                        <li>GRAND TOTAL</li>
                                        <li className="theme-color">$325.00</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="invoice-footer">
                                <div className="signature-box">

                                    <Image src={sign} className="img-fluid" alt="logo" />
                                    <h5>Authorised Sign</h5>
                                </div>

                                <div className="button-group">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ul style={{display:'flex',justifyContent:'end',paddingRight:'30%'}}>
                                        
                                        <li>
                                            <button className="btn text-white print-button rounded ms-2" onClick={handlePrint}>Print</button>
                                        </li>
                                    </ul>
            </div>
        </section>

    )
}

export default Page
