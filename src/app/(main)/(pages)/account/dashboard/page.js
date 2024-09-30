import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'

const page = async () => {
    const user = await getServerSession(authOptions)
    const userInfo = await db.user.findUnique({
        where: {
            id: user.id
        }, select: {
            address: true,
            pinCode: true,
            city: true,
            state: true,
            mobile: true

        }
    })

    const orderCount = await db.orders.count({
        where: {


            AND: [{ paymentStatus: 1 }, { customerId: user.id }]

        }
    })
    const orderCountTobeDel = await db.orders.count({
        where: {

            AND: [{ paymentStatus: 1 }, { customerId: user.id },{OR:[{ orderStatus: 0 }, { orderStatus: 1 }]} ]



        }
    })
    return (
        <div className="col-md-9 ps-5 border-start">
            <div className="row">
                <div className="col-md-12">
                    <h3>Welcome {user.firstName} </h3>
                </div>

                <div className="dashboard-status">
                    <p>Hello, <br />
                        From your My Account Dashboard you have the ability to view a snapshot of your recent
                        account activity and update your account information. Select a link below to view or
                        edit information.</p>


                </div>
            </div>
            <div className="row mt-2">

                <div className="col-md-4">
                    <div className="dashboard-status d-flex">
                        <div className="dashboard-img">
                            <i className="fa-solid fa-money-bills"></i>
                        </div>
                        <div className="dashboard-txt">
                            <h4>Total Orders</h4>
                            <div className="dashboard-total">
                                {orderCount}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="dashboard-status d-flex">
                        <div className="dashboard-img">
                            <i className="fa-solid fa-object-ungroup"></i>
                        </div>
                        <div className="dashboard-txt">
                            <h4>To Be Delivered Orders</h4>
                            <div className="dashboard-total">
                                {orderCountTobeDel}
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-md-4">

                </div>

            </div>

            <div className="row mt-5">
                <div className="col-md-6">
                    <div className="contact-information">
                        <div className="d-flex justify-content-between border-bottom mb-3 pb-3">
                            <h6 className="contact-header">Contact Information</h6>
                            <div className="edit"><Link href="/account/profile">Edit</Link></div>
                        </div>

                        <div className="user-name mb-2">{user.firstName} {user.lastName}</div>
                        <div className="user-name mb-2">Address- {userInfo.address + `,${userInfo.city},${userInfo.state}` || <Link>Update Address</Link>}</div>
                        <div className="user-name mb-2">Mobile- {userInfo.mobile}</div>
                        <div className="user-email mb-2">
                            <a>{user.email ? user.email : <Link>Add Email</Link>}</a>
                        </div>
                        <Link href={'/account/changePassword'}><div className="change-pass">Change Password</div></Link>

                    </div>
                </div>

                <div className="col-md-6">

                </div>
            </div>


        </div>
    )
}

export default page
