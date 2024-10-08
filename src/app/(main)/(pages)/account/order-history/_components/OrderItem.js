
import React from 'react'

import Link from 'next/link'

const OrderItem = ({orderId,date,qty,status,amount,goTo,paymentStatus,order}) => {
  return (
    <tr>
                             
                              <td className="align-middle border-top-0">
                                 <Link href={`${paymentStatus >0?goTo:"#"}` }className="text-inherit">{orderId}</Link>
                              </td>
                              <td className="align-middle border-top-0">{date}</td>
                              <td className="align-middle border-top-0">{qty}</td>
                              <td className="align-middle border-top-0">
                                 <span className="badge bg-warning">{status===0?"pending":order.orderStatus===1?"processing":order.orderStatus===2?"shiped":"cancelled"}</span>
                              </td>
                              <td className="align-middle border-top-0">{paymentStatus >0?`₹${amount}`:"payment failed"}</td>
                              <td className="text-muted align-middle border-top-0">
                                 {paymentStatus >0 && <Link href={goTo} className="text-inherit" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="View"><i className="fa-regular fa-eye"></i></Link>}
                              </td>
                           </tr>
  )
}

export default OrderItem
