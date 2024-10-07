"use client"
import refund from '@/app/actions/refund'
import React, { useState } from 'react'

const RefundButton = ({ orderId ,children}) => {
    const [isloading,setIsloading] =useState(false)




    const onclk = async () => {
        try {
            setIsloading(true)
            const res = await refund(orderId)
            if (!res.success) {

                throw res

            }

        } catch (error) {
            console.log(error)

        }finally{
            setIsloading(false)
        }
    }
    return (
        <div>
          
            {(!isloading) ? <button className="mt-3 pay-now-button btn" onClick={onclk} >
                {children}
            </button> : "Submiting Request"}


        </div>
    )
}

export default RefundButton
