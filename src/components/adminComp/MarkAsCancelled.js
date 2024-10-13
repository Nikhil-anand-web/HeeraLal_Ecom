"use client"
import markAsCancelled from '@/app/actions/markAsCancelled'
import markAsCompleted from '@/app/actions/markAsCompleted'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const MarkAsCancelled = ({ orderId, className, style }) => {
    const [isloading,setIsloading] = useState(false)

    const onClk = async () => {
        try {
            const isConfirmed = window.confirm("Are you sure you want to mark as canceled? This action cannot be undone.");
        if (!isConfirmed) return;  // Exit if the user cancels the action
            setIsloading(true)
            const res = await markAsCancelled(orderId)
            if (!res.success) {
                throw res

            }
            toast.success(res.message)

        } catch (error) {
            console.log(error)
            toast.warning(error.message)


        }finally{
            setIsloading(true)
        }
    }
    return (
        <>
            {(!isloading) ? <button className={className} style={style} onClick={onClk} >
                Mark as Cancelled
            </button> : "Submiting Request"}
        </>
    )
}

export default MarkAsCancelled
