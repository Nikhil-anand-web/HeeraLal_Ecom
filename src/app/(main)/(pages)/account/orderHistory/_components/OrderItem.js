import Image from 'next/image'
import React from 'react'
import ecom from '../../../../../../images/pavbhaji.jpg'
import Link from 'next/link'

const OrderItem = () => {
  return (
    <tr>
                              <td className="align-middle border-top-0 w-0">
                                 <Link href="/productDetails">
                                    
                                    <Image src={ecom} alt="Ecommerce" />
                                    </Link>
                              </td>
                              <td className="align-middle border-top-0">
                                 <Link href="/productDetails" className="fw-semibold text-inherit">
                                    <h6 className="mb-0">{"Haldiram's"} Nagpur Aloo Bhujia</h6>
                                 </Link>
                                 <span><small className="text-muted">400g</small></span>
                              </td>
                              <td className="align-middle border-top-0">
                                 <Link href="#" className="text-inherit">#14899</Link>
                              </td>
                              <td className="align-middle border-top-0">March 5, 2023</td>
                              <td className="align-middle border-top-0">1</td>
                              <td className="align-middle border-top-0">
                                 <span className="badge bg-warning">Processing</span>
                              </td>
                              <td className="align-middle border-top-0">$15.00</td>
                              <td className="text-muted align-middle border-top-0">
                                 <Link href="/invoice" className="text-inherit" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="View"><i className="fa-regular fa-eye"></i></Link>
                              </td>
                           </tr>
  )
}

export default OrderItem
