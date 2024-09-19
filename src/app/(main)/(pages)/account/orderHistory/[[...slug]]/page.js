import React from 'react'

import Pagination from '@/components/Pagination'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import OrderItem from '../_components/OrderItem'


const page = async ({ params }) => {
    const user = await getServerSession(authOptions)
    var pageNo = params.slug?.at(params?.slug?.length - 1)
    if (!pageNo || isNaN(pageNo)) {
        pageNo = 1;

    }
    var itemsPerPage = 5
    const count = await db.orders.count({
        where: {
            customerId: user.id,
            paymentStatus:1
        }, 

    })
    const orders = await db.orders.findMany({
        where: {
            customerId: user.id,
            paymentStatus:1
        }, select: {
            orderId: true,
            createdAt: true,
            varientMeta: true,
            comboMeta: true,
            orderStatus: true,
            finalPrice:true,
            paymentStatus:true
        },
        skip: (pageNo - 1) * itemsPerPage, 
        take: itemsPerPage,
        orderBy: {
            createdAt: 'desc'
        }
    })



    return (

        <div className="col-md-9 ps-5 border-start">
            <div className="col-md-12">
                <h3>Your Orders </h3>
            </div>

            <div className="order-status">
                <table className="table mb-0 text-nowrap table-centered">

                    <thead className="bg-light">
                        <tr>


                            <th>Order Id</th>
                            <th>Date</th>
                            <th>Items</th>
                            <th>Status</th>
                            <th>Amount</th>

                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => {
                            var total = 0
                            for (let i = 0; i < order?.varientMeta?.length; i++) {
                                total += order.varientMeta[i].qty



                            }
                            for (let i = 0; i < order?.comboMeta?.length; i++) {
                                total += order.comboMeta[i].qty



                            }
                            const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
                            const formattedDate = order.createdAt.toLocaleDateString('en-US', options);


                            return <OrderItem key={index} paymentStatus={order.paymentStatus} orderId={order.orderId} date={formattedDate} qty={total} status={order.orderStatus} amount={order.finalPrice} goTo={`/invoice/${order.orderId}`}  />
                        })}


                    </tbody>
                </table>
            </div>
            <Pagination totalItems={count} itemsPerPage={itemsPerPage} currentPage={pageNo} />
        </div>





    )
}

export default page
