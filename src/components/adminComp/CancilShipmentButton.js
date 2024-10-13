"use client"
import cancilAwb from '@/app/actions/cancilAwb'

import React, { useState } from 'react'
import { toast } from 'react-toastify'

const CancilShipmentButton = ({ orderId, children }) => {
    const [isloading, setIsloading] = useState()
    const onclk = async () => {
        const isConfirmed = window.confirm("Are you sure you want to cancil? This action cannot be undone.");
        if (!isConfirmed) return;  // Exit if the user cancels the action
        try {
            setIsloading(true)
            const res = await cancilAwb(orderId)
            if (!res.success) {
                throw res

            }
            toast.success(res.message)


        } catch (error) {
            console.log(error)
            toast.warning(error.message)

        } finally {
            setIsloading(false)
        }
    }


    return (
        <div>
            {(!isloading) ? <button className="mt-3 pay-now-button btn" onClick={onclk}>
                {children}
            </button> : "Submiting Request"}
        </div>
    )
}

export default CancilShipmentButton
