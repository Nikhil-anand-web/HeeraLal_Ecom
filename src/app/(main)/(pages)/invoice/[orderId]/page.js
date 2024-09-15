

import React from 'react'

import Invoice from '../components/Invoice';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import Image from 'next/image';
const Page = async ({params}) => {
    const user = await getServerSession(authOptions)
    const orderId = params.orderId
    const order =  await db.orders.findUnique({
        where:{
            orderId:orderId,
            AND:[{customerId:user.id},{paymentStatus:1}]
        },select:{
            orderId:true,
            createdAt:true,
            shipingStatus:true,
            awb:true,
            paymentStatus:true,
            paymentToken:true,
            subTotal:true,
            taxes:true,
            shipingCharges:true,
            finalPrice:true,
            varientMeta:true,
            comboMeta:true,
            CustomerMeta:true,
            couponMeta:true,
            refralDiscountAbsolute:true



        }
    })
    const companyAddress = await db.staticInfo.findUnique({
        where:{
            key:"companyAddress"
        }
    })
    console.log(companyAddress)

    

    if (!order) {
        return <Image src={'/images/pageNotFound.jpg'} layout='responsive' width={100} height={100} />

        
    }
      
    return (
        <section className="invoices">
            <Invoice companyAddress={companyAddress} order={order}/>
        </section>

    )
}

export default Page
