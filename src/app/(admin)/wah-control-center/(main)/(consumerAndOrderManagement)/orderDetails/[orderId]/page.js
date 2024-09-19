import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import AdminLayout from '@/layouts/AdminLayout'
import percentOf from '@/lib/percentOf';
import { getServerSession } from 'next-auth'
import Image from 'next/image'; // Ensure Image is imported
import VarientModelMini from '../components/VarientModelMini';
import ComboModelMini from '../components/ComboModelMini';

const Page = async (prop) => {
    const user = await getServerSession(authOptions)

    if (!user || (user.role !== 1 && user.role !== 2) || !user.permissions[0].consumerAndOrderManagement) {
        return <div>Access Denied</div>
    }

    const order = await db.orders.findUnique({
        where: { orderId: prop.params.orderId },
    })
    console.log(order.comboMeta)

    if (!order) {
        return <Image src={'/images/pageNotFound.jpg'} layout='responsive' width={100} height={100} />
    }
    var absoluteCouponDiscount =0
    if (!order.couponMeta) {
        absoluteCouponDiscount=0

        
    }
    else if (order.couponMeta.type ==='absolute') {
        absoluteCouponDiscount= parseFloat(cart.coupon.discountValue)
        
    }else if (order.couponMeta.type==='percent') {
        const val = percentOf(order.subTotal,parseFloat(order.couponMeta.discountValue))
        console.log(val,"val")
        absoluteCouponDiscount=val

        
    }
    var absTax= percentOf((order.subTotal-absoluteCouponDiscount-order.refralDiscountAbsolute),order.taxes)
    

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

                                    {order.comboMeta.length>0 && <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="varients-tab" data-bs-toggle="tab" data-bs-target="#varients-tab-pane" type="button" role="tab" aria-controls="varients-tab-pane" >Combo</button>
                                    </li>}
                                    {order.varientMeta.length>0 && <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="combo-tab" data-bs-toggle="tab" data-bs-target="#combo-tab-pane" type="button" role="tab" aria-controls="combo-tab-pane" >Product Varient</button>
                                    </li>}
                                    { order.paymentToken.TXNID && <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="paymentDetail-tab" data-bs-toggle="tab" data-bs-target="#paymentDetail-pane" type="button" role="tab" aria-controls="paymentDetail-pane">Payment Details</button>
                                    </li>}
                                  
                                </ul>
                                <div className="tab-content pt-4" id="profileTabContent">
                                    <div className="tab-pane fade show active" id="overview-tab-pane" role="tabpanel" aria-labelledby="overview-tab">
                                        <div >



                                            <div className="row g-0">
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Order Id</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{order.orderId}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Customer Name </div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{order.CustomerMeta.firstName}{order.CustomerMeta.lastName}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Mobile </div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{order.CustomerMeta.mobile}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Email </div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{order.CustomerMeta.email ? order.CustomerMeta.email : "not available"}</div>
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
                                                    <div className="p-2">{order.orderStatus}</div>
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
                                                    <div className="p-2"> {order.taxes}% {`(₹${absTax})`}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Shiping Charge</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2"> ₹{order.shipingCharges}</div>
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
                                                    <div className="p-2">{order.paymentStatus === 1 ? <span className="badge badge-success">{" Paid "}</span> : order.paymentToken?.STATUS?.lenght > 0 ? <span className="badge badge-danger">{" Payment Failed "}</span> : <span className="badge badge-danger">{" Un-Paid "}</span>}</div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                   { order.comboMeta.length>0 && <div className="tab-pane fade show" id="varients-tab-pane" role="tabpanel" aria-labelledby="combo-tab">
                                        <div >
                                          
                                       {order.comboMeta.map((combo,index)=> <ComboModelMini key={index} data={combo}/>)}
                                        {/* */}

                                            
                                        </div>
                                    </div>}
                                   { order.varientMeta.length>0 && <div className="tab-pane fade show" id="combo-tab-pane" role="tabpanel" aria-labelledby="varients-tab">
                                        <div >

                                        <VarientModelMini dataArray={order.varientMeta}/>
                                        {/* <ComboModelMini data={order.comboMeta[0]}/> */}

                                            
                                        </div>
                                    </div>}
                                    {order.paymentToken.TXNID &&<div className="tab-pane fade" id="paymentDetail-pane" role="tabpanel" aria-labelledby="paymentDetail-tab">
                                        <div className="row g-0">
                                            <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div className="p-2">Transaction Id</div>
                                            </div>
                                            <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div className="p-2">{order.paymentToken.TXNID}</div>
                                            </div>
                                            <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div className="p-2">Status </div>
                                            </div>
                                            <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div className="p-2">{order.paymentToken.STATUS}</div>
                                            </div>
                                            <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div className="p-2">Message From GateWay </div>
                                            </div>
                                            <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div className="p-2">{order.paymentToken.RESPMSG}</div>
                                            </div>
                                            <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div className="p-2">Bank Txn Id </div>
                                            </div>
                                            <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div className="p-2">{order.paymentToken.BANKTXNID}</div>
                                            </div>

                                            <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div className="p-2">Transaction Amount</div>
                                            </div>
                                            <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div className="p-2"> ₹{order.paymentToken.TXNAMOUNT}</div>
                                            </div>
                                            <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                <div className="p-2">Payment mode</div>
                                            </div>
                                            <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                <div className="p-2"> ₹{order.PaymentMode}</div>
                                            </div>
                                            

                                        </div>
                                    </div>}
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
