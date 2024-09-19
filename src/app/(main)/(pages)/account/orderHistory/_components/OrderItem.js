
import React from 'react'

import Link from 'next/link'

const OrderItem = ({orderId,date,qty,status,amount,goTo,paymentStatus}) => {
  return (
    <tr>
                             
                              <td className="align-middle border-top-0">
                                 <Link href={`${paymentStatus ===1?goTo:"#"}` }className="text-inherit">{orderId}</Link>
                              </td>
                              <td className="align-middle border-top-0">{date}</td>
                              <td className="align-middle border-top-0">{qty}</td>
                              <td className="align-middle border-top-0">
                                 <span className="badge bg-warning">{status===0?"pending":status===1?"processing":"compleated"}</span>
                              </td>
                              <td className="align-middle border-top-0">{paymentStatus ===1?`₹${amount}`:"payment failed"}</td>
                              <td className="text-muted align-middle border-top-0">
                                 {paymentStatus ===1 && <Link href={goTo} className="text-inherit" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="View"><i className="fa-regular fa-eye"></i></Link>}
                              </td>
                           </tr>
  )
}

export default OrderItem
