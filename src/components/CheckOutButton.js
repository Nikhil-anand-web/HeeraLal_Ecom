"use client"
import checkOutCart from '@/app/actions/checkOutCart'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

const CheckOutButton = () => {
    const rtr = useRouter()
    const onChkOut = async () => {
        try {
            const res = await checkOutCart()
            if (!res.success) {
                throw res

            }
             rtr.push(`checkout/${res.order.orderId}`)
            console.log(res)

        } catch (error) {
            console.log(error)
            toast.warning(error.message)

        }

    }
    return (
        <div className="col">
            <button type="button" onClick={onChkOut} className="mt-3 pay-now-button btn mr-5">Checkout</button>
        </div>
    )
}

export default CheckOutButton
