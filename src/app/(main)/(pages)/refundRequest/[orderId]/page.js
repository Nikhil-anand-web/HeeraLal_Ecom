import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import CancellationForm from '@/components/clientForm/CancilatinRequestForm'
import isUnderDuration from '@/lib/isUnderDuration'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import React from 'react'

const page = async ({params}) => {
  const user = await getServerSession(authOptions)
  const orderId = params.orderId
  

const order = await db.orders.findUnique({
  where:{
    orderId:orderId,
    AND:[{customerId: user.id,},{orderStatus: {
      lt:3
    }},{paymentStatus:1}]
  },select:{
    createdAt:true,
    orderId:true
  }
})



  if (!user) {
    return <h1> please login</h1>
    
  }
  if (!order  ) {
    return <Image src={'/images/pageNotFound.jpg'} layout='responsive' width={100} height={100} />
    
  }
  

  return (
    <section class="product-page">
      <div class="container">
        <div class="row">
          <CancellationForm orderId={order.orderId} />

        </div>
        </div>
    </section>
  )
}

export default page
