"use client"
import acceptCanRequest from '@/app/actions/acceptCanRequest'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const AcceptCancellationReq = ({ style, className, orderId }) => {
    const [isloading, setIsloading] = useState(false)

    const onclk = async () => {
        try {
            setIsloading(true)
            const res = await acceptCanRequest(orderId)
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
        <>

            {(!isloading) ? <button className="mt-3 pay-now-button btn" onClick={onclk} >
                Accept Request
            </button> : "Submiting Request"}
        </>
    )
}

export default AcceptCancellationReq
