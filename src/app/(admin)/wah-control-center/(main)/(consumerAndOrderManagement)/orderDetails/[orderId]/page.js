import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import AdminLayout from '@/layouts/AdminLayout'
import percentOf from '@/lib/percentOf';
import { getServerSession } from 'next-auth'
import Image from 'next/image'; // Ensure Image is imported
import VarientModelMini from '../components/VarientModelMini';
import ComboModelMini from '../components/ComboModelMini';
import ReadyToShipButton from '@/components/adminComp/ReadyToShipButton';
import DatePickerAndAwb from '@/components/global/DatePickerAndAwb';
import CancilShipmentButton from '@/components/adminComp/CancilShipmentButton';
import RefundButton from '@/components/adminComp/RefundButton';
import db from '@/lib/db';
import PrintLabel from '@/components/adminComp/PrintLabel';


const Page = async (prop) => {
    const user = await getServerSession(authOptions)

    if (!user || (user.role !== 1 && user.role !== 2) || !user.permissions[0].consumerAndOrderManagement) {
        return <div>Access Denied</div>
    }

    const order = await db.orders.findUnique({
        where: { orderId: prop.params.orderId },

    })


    if (!order) {
        return <Image src={'/images/pageNotFound.jpg'} layout='responsive' width={100} height={100} />
    }
    var absoluteCouponDiscount = 0
    if (!order.couponMeta) {
        absoluteCouponDiscount = 0


    }
    else if (order.couponMeta.type === 'absolute') {
        absoluteCouponDiscount = parseFloat(cart.coupon.discountValue)

    } else if (order.couponMeta.type === 'percent') {
        const val = percentOf(order.subTotal, parseFloat(order.couponMeta.discountValue))

        absoluteCouponDiscount = val


    }
    var absTax = percentOf((order.subTotal - absoluteCouponDiscount - order.refralDiscountAbsolute), order.taxes)


    return (
        <section className="bg-light py-3 py-md-5 py-xl-8">
            <div className="container">
                <div className="row gy-lg-0">
                    <div className="col-12 col-lg-8 col-xl-9">
                        <div className="card widget-card border-light shadow-sm">

                            <div className="card-body p-4">
                                <ul className="nav nav-tabs" id="profileTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview-tab-pane" type="button" role="tab" aria-controls="overview-tab-pane" aria-selected="true">Overview</button>
                                    </li>
                                   {order.awb&& <li className="nav-item" role="presentation">
                                        <PrintLabel className="nav-link"orderId={order.awb}/>
                                    </li>}


                                    {order.comboMeta?.length > 0 && <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="varients-tab" data-bs-toggle="tab" data-bs-target="#varients-tab-pane" type="button" role="tab" aria-controls="varients-tab-pane" >Combo</button>
                                    </li>}
                                    {order.varientMeta?.length > 0 && <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="combo-tab" data-bs-toggle="tab" data-bs-target="#combo-tab-pane" type="button" role="tab" aria-controls="combo-tab-pane" >Product Varient</button>
                                    </li>}
                                    {order.paymentToken?.TXNID && <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="paymentDetail-tab" data-bs-toggle="tab" data-bs-target="#paymentDetail-pane" type="button" role="tab" aria-controls="paymentDetail-pane">Payment Details</button>
                                    </li>}
                                    {!order.awb && <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="ship-tab" data-bs-toggle="tab" data-bs-target="#ship-pane" type="button" role="tab" aria-controls="ship-pane">Ship</button>
                                    </li>}

                                    {((order.orderStatus < 2)) ? <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="shipCancil-tab" data-bs-toggle="tab" data-bs-target="#shipCancil-pane" type="button" role="tab" aria-controls="shipCancil-pane">Cancilation </button>
                                    </li> : ""}
                                    {order.paymentStatus == 1 ? <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="refund-tab" data-bs-toggle="tab" data-bs-target="#refund-pane" type="button" role="tab" aria-controls="refund-pane">Refund </button>
                                    </li> : ""}

                                </ul>
                                <div className="tab-content pt-4" id="profileTabContent">
                                    <div className="tab-pane fade show active" id="overview-tab-pane" role="tabpanel" aria-labelledby="overview-tab">
                                        <div className='hide-scrollbar' style={{ maxHeight: "62vh", overflowY: "scroll", overflowX: "hidden" }}>


                                            
                                            <div className="row">
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Order Id</div>
                                                </div>
                                                {/* <ReadyToShipButton orderId={order.orderId} /> */}
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{order.orderId}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Customer Name </div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{order?.CustomerMeta?.firstName}{order?.CustomerMeta?.lastName}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Mobile </div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{order?.CustomerMeta?.mobile}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Email </div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{order?.CustomerMeta?.email ? order?.CustomerMeta?.email : "not available"}</div>
                                                </div>

                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Date of order</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{order.createdAt.toString()}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Order Status</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{order.orderStatus === 0 ? "pending" : order.orderStatus === 1 ? "processing" : order.orderStatus === 2 ? "compleated" : "cancelled"}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Shiping Status</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{order.shipingStatus}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Subtotal</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2"> ₹{order.subTotal}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Total weight</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2"> {order.totalWeight}gm</div>
                                                </div>


                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Coupon Discount</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2"> ₹{absoluteCouponDiscount.toPrecision(5)}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Referal Discount</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2"> ₹{order.refralDiscountAbsolute}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Taxes</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2"> {order.taxes}% {`(₹${absTax.toPrecision(5)})`}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Shiping Charge</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2"> ₹{order.shipingCharges}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">AWB</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2"> {order.awb ? order.awb : "not available"}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Final Price</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2"> ₹{order.finalPrice}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Payment Status</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">

                                                        {order.paymentStatus === 1 && <span className="badge badge-success">{" Paid "}</span>}
                                                        {order.paymentStatus === 2 && <span className="badge badge-danger">{" Refunded "}</span>}
                                                        {(order.paymentStatus === 0 && order.paymentToken?.STATUS?.lenght > 0) && <span className="badge badge-danger">{" Payment Failed "}</span>}
                                                        {(order.paymentStatus === 0 && !order.paymentToken) && <span className="badge badge-danger">{" Unpaid "}</span>}


                                                    </div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Short Item Status</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">

                                                        {order.shortItmStatus === 0 && <span className="badge badge-success">{" Ideal "}</span>}
                                                        {order.paymentStatus === 1 && <span className="badge badge-danger">{" Short Item "}</span>}
                                                        {order.paymentStatus === 2 && <span className="badge badge-success">{" Fullfilled "}</span>}



                                                    </div>
                                                </div>

                                            </div>


                                        </div>
                                    </div>
                                    {order.comboMeta?.length > 0 && <div className="tab-pane fade show" id="varients-tab-pane" role="tabpanel" aria-labelledby="combo-tab" >
                                        <div style={{ maxHeight: "62vh", overflowY: "scroll", overflowX: "hidden" }} >

                                            {order.comboMeta?.map((combo, index) => {

                                                const result = order.shortItmsMeta.shortCombo.find(item => item.id === combo.id);




                                                return <ComboModelMini shortComboQty={result?.shortQty ?? 0} key={index} data={combo} />
                                            })}
                                            {/* */}


                                        </div>
                                    </div>}
                                    {order.varientMeta?.length > 0 && <div className="tab-pane fade show" id="combo-tab-pane" role="tabpanel" aria-labelledby="varients-tab" >
                                        <div style={{ maxHeight: "62vh", overflowY: "scroll", overflowX: "hidden" }} >

                                            <VarientModelMini shortVarientIds={order.shortItmsMeta?.shortVarients} dataArray={order.varientMeta} />



                                        </div>
                                    </div>}

                                    {order.paymentToken?.TXNID && <div className="tab-pane fade" id="paymentDetail-pane" role="tabpanel" aria-labelledby="paymentDetail-tab" style={{ maxHeight: "62vh", overflowY: "scroll", overflowX: "hidden" }}>
                                        <div className="row g-0" style={{ maxHeight: "62vh", overflowY: "scroll", overflowX: "hidden" }}>
                                            <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div className="p-2">Transaction Id</div>
                                            </div>
                                            <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div className="p-2">{order.paymentToken?.TXNID}</div>
                                            </div>
                                            <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div className="p-2">Status </div>
                                            </div>
                                            <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div className="p-2">{order.paymentToken?.STATUS}</div>
                                            </div>
                                            <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div className="p-2">Message From GateWay </div>
                                            </div>
                                            <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div className="p-2">{order.paymentToken?.RESPMSG}</div>
                                            </div>
                                            <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div className="p-2">Bank Txn Id </div>
                                            </div>
                                            <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div className="p-2">{order.paymentToken?.BANKTXNID}</div>
                                            </div>

                                            <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div className="p-2">Transaction Amount</div>
                                            </div>
                                            <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div className="p-2"> ₹{order.paymentToken?.TXNAMOUNT}</div>
                                            </div>
                                            <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div className="p-2">Payment mode</div>
                                            </div>
                                            <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div className="p-2"> ₹{order.PaymentMode}</div>
                                            </div>


                                        </div>
                                    </div>}
                                    {!order.awb && <div className="tab-pane fade" id="ship-pane" role="tabpanel" aria-labelledby="ship-tab" style={{ maxHeight: "62vh", overflowY: "scroll", overflowX: "hidden" }}>
                                        <DatePickerAndAwb orderId={order.orderId} />

                                    </div>}
                                    {((order.orderStatus < 2)) ? <div className="tab-pane fade" id="shipCancil-pane" role="tabpanel" aria-labelledby="shipCancil-tab" style={{ maxHeight: "62vh", overflowY: "scroll", overflowX: "hidden" }}>
                                        <CancilShipmentButton orderId={order.orderId}>
                                            Cancil This Shipment
                                        </CancilShipmentButton>

                                    </div> : ""}
                                    {order.paymentStatus == 1 ? <div className="tab-pane fade" id="refund-pane" role="tabpanel" aria-labelledby="refund-tab" style={{ maxHeight: "62vh", overflowY: "scroll", overflowX: "hidden" }}>
                                        {!order.refundRequest ? <RefundButton orderId={order.orderId}>
                                            Raise refund Request
                                        </RefundButton> : <div>
                                            <h3>Refund request details</h3>

                                            <div className="row">
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Transaction Id</div>
                                                </div>

                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{order.refundRequest?.txnId}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Transaction Amount</div>
                                                </div>

                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">₹{order.refundRequest?.refundAmount}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Status</div>
                                                </div>

                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{order.refundRequest?.resultStatus}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Message</div>
                                                </div>

                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{order.refundRequest?.resultMsg}</div>
                                                </div>


                                            </div>




                                        </div>}

                                    </div> : ""}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Page;
