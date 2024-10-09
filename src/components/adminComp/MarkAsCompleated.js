"use client"
import markAsCompleted from '@/app/actions/markAsCompleted'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const MarkAsCompleated = ({ orderId, className, style }) => {
    const [isloading,setIsloading] = useState(false)

    const onClk = async () => {
        try {
            setIsloading(true)
            const res = await markAsCompleted(orderId)
            if (!res.success) {
                throw res

            }
            toast.success(res.message)

        } catch (error) {
            console.log(error)
            toast.warning(error.message)


        }finally{
            setIsloading(false)
        }
    }
    return (
        <>
            {(!isloading) ? <button className={className} style={style} onClick={onClk} >
                Mark as Compleated
            </button> : "Submiting Request"}
        </>
    )
}

export default MarkAsCompleated
