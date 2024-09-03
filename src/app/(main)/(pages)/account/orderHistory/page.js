import React from 'react'
import ecom from "../../../../../images/pavbhaji.jpg"
import Image from 'next/image'
import OrderItem from './_components/OrderItem'
const page = () => {
  return (
    <div className="col-md-9 border-start">
             <div className="row">
                <div className="col-md-12">
                    <h3>Your Orders </h3>
                </div>

                <div className="order-status">
                    <table className="table mb-0 text-nowrap table-centered">
                     
                        <thead className="bg-light">
                           <tr>
                              <th>&nbsp;</th>
                              <th>Product</th>
                              <th>Order</th>
                              <th>Date</th>
                              <th>Items</th>
                              <th>Status</th>
                              <th>Amount</th>

                              <th></th>
                           </tr>
                        </thead>
                        <tbody>
                          <OrderItem/>
                          <OrderItem/>
                          <OrderItem/>
                          <OrderItem/>
                          <OrderItem/>
                         
                        </tbody>
                     </table>
                </div>
             </div>   
            </div>
  )
}

export default page
