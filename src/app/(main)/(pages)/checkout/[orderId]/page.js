import React from 'react'
import Image from 'next/image'
import ContactInfoForm from '@/components/clientForm/ContactInfoForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import db from '@/lib/db'
import OrderSummary from '@/components/OrderSummary'
import percentOf from '@/lib/percentOf'
import CheckOutContent from '@/components/CheckOutContent'
const page = async ({params}) => {
    const orderId = params.orderId
 

    const user = await getServerSession(authOptions)
    const userInfo = await db.user.findUnique({
        where: {
            id: user.id
        }, select: {
            address: true,
            pinCode: true
        }
    })
    const userHaveAddress = userInfo.pinCode && userInfo.address
    const order = await db.orders.findUnique({

        where: {
            orderId: orderId,
            AND:[{customerId:user.id}]
        }
    })

    if (!order) {
        return <Image src={'/images/pageNotFound.jpg'} layout='responsive' width={100} height={100} />
        
    }
    

    const getcouponDiscount =   ()=>{
        
        
        if (!order.couponMeta) {
            return 0
            
        }
        if (order.couponMeta.type==='absolute') {
            return order.couponMeta.discountValue
            
        }else if (order.couponMeta.type==='percent') {
            const val = percentOf(order.subTotal,parseFloat(order.couponMeta.discountValue))
            return val
            
        }
    }
    

    return (
        <section className="login-page">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <h1 className="text-center mb-5">Check Out</h1>

                    </div>
                </div>

                <CheckOutContent  absoluteCouponDiscount={getcouponDiscount()} userInfo={userInfo} userHaveAddress={userHaveAddress} order={order}/>

                
            </div>

        </section>
    )
}

export default page
