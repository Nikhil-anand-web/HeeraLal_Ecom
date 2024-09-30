import { authOptions } from '@/app/api/auth/[...nextauth]/options'

import { getServerSession } from 'next-auth'
import Image from 'next/image';
import OrderModel from '@/components/adminComp/OrderModel'
import db from '@/lib/db';

const Page = async (prop) => {
    const user = await getServerSession(authOptions)

    if (!user || (user.role !== 1 && user.role !== 2) || !user.permissions[0].consumerAndOrderManagement) {
        return <div>Access Denied</div>
    }

    const order = await db.orders.findMany({
        where: { customerId: prop.params.customerId, AND:[{paymentStatus:1}]},
        orderBy: {
            createdAt: 'desc', // This will order by the `createdAt` field in descending order
          },
        
    })
    const orderCountSuccess = await db.orders.count({
        where: { customerId: prop.params.customerId, AND: [{ paymentStatus: 1 }] },


    })
    const orderCount = await db.orders.count({
        where: { customerId: prop.params.customerId },


    })
    const customer = await db.user.findUnique({
        where: {
            id: prop.params.customerId, // Assuming this is how you're passing the ID

        },
        include: {
            referedBy: {
                select: {
                    email: true, // Correct way to select specific fields
                },
            },
            lastEditedBy: {
                select: {
                    userName: true, // Correct way to select specific fields
                },
            },
            _count: {
                select: {
                    referal: true, // This will count the number of related `referal` entries
                },
            },
        },
    });




    if (!customer) {
        return <Image src={'/images/pageNotFound.jpg'} layout='responsive' width={100} height={100} />
    }





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

                                    {order.length > 0 && <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="varients-tab" data-bs-toggle="tab" data-bs-target="#varients-tab-pane" type="button" role="tab" aria-controls="varients-tab-pane" >Orders</button>
                                    </li>}


                                </ul>
                                <div className="tab-content pt-4" id="profileTabContent">
                                    <div className="tab-pane fade show active" id="overview-tab-pane" role="tabpanel" aria-labelledby="overview-tab">
                                        <div className='hide-scrollbar' style={{ maxHeight: "62vh", overflowY: "scroll", overflowX: "hidden" }} >



                                            <div className="row g-0">
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">FirstName</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{customer.firstName}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Last Name </div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{customer.lastName}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Mobile </div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{customer.mobile ? customer.mobile : "not provided"}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Email </div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{customer.email ? customer.email : "not provided"}</div>
                                                </div>

                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Address</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{customer.address ? customer.address : "not provided"}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Pincode</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{customer.pinCode ? customer.pinCode : "not provided"}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">City</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{customer.city ? customer.city : "not provided"}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">State</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2"> {customer.state ? customer.state : "not provided"}</div>
                                                </div>


                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Status</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2"> {customer.status ? "activated" : "deactivated"}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Email Verified</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2"> {customer.emailVerified ? "verified" : "not verified"}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Mobile Verified</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2"> {customer.mobileVerified ? "verified" : "not verified"}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Last Edited By</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2"> {customer.lastEditedBy ? customer.lastEditedBy.userName : "not edited"}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Refered Email</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{customer.referedBy ? customer.referedBy.email : "not edited"}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Total user Refered</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{customer._count.referal < 0 ? "not refered any other user" : customer._count.referal}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Order Count</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{orderCount}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Successfull Order Count</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{orderCountSuccess}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Date of register</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{customer.createdAt.toLocaleString()}</div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    {<div className="tab-pane fade show" id="varients-tab-pane" role="tabpanel" aria-labelledby="combo-tab">
                                        <div className='hide-scrollbar' style={{ maxHeight: "62vh", overflowY: "scroll", overflowX: "hidden",padding:"10px" }}  >


                                            {order.map((orde, index) => (

                                                <OrderModel key={index} goTo={`/wah-control-center/orderDetails/${orde.orderId}`} order={orde} />
                                            ))}


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
