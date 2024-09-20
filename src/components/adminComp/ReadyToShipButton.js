"use client"
import createAWB from '@/app/actions/createAWB'
import React from 'react'
import { toast } from 'react-toastify'

const ReadyToShipButton = ({ orderId, pickupTime, pickupdate, children, setIsloading, isloading }) => {
    const onclk = async () => {
        try {
            setIsloading(true)
            const res = await createAWB(orderId,pickupTime,pickupdate)
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
            {(!isloading && pickupdate && pickupTime) ? <button className="mt-3 pay-now-button btn" onClick={onclk}>
                {children}
            </button> :isloading===true?"Scheduling..": "enter date and time"}
        </div>
    )
}

export default ReadyToShipButton
