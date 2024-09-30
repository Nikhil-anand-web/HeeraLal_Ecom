"use client"
import refund from '@/app/actions/refund'
import React from 'react'

const RefundButton = ({ orderId ,children}) => {




    const onclk = async () => {
        try {
            const res = await refund(orderId)
            if (!res.success) {

                throw res

            }

        } catch (error) {
            console.log(error)

        }
    }
    return (
        <div>
            <button onClick={onclk} className="mt-3 pay-now-button btn">
                {children}
            </button>


        </div>
    )
}

export default RefundButton
