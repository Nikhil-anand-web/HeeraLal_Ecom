"use client"
import createAWB from '@/app/actions/createAWB'
import React from 'react'
import { toast } from 'react-toastify'

const ReadyToShipButton = ({ orderId, pickupTime, pickupdate, children, setIsloading, isloading, dimentions }) => {
    const onclk = async () => {
        const isConfirmed = window.confirm("Are you sure you want to schedule the shipment");
        if (!isConfirmed) return;  // Exit if the user cancels the action
        try {
            setIsloading(true)

            const dimendarr = []
            let cnt=0
            Object.values(dimentions).forEach(value => {
                const arr = value.split("X")
                cnt +=parseInt(arr[3])

                const obj = {
                    Breadth: parseFloat(arr[1]),
                    Count: arr[3],
                    Height:parseFloat( arr[2]),
                    Length: parseFloat(arr[0])
                }
                dimendarr.push(obj)

            });
            console.log(cnt,dimendarr)


            const res = await createAWB(orderId, pickupTime, pickupdate,dimendarr,cnt)
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
            </button> : isloading === true ? "Scheduling.." : "enter date and time"}
        </div>
    )
}

export default ReadyToShipButton
