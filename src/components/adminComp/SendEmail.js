"use client"
import sendEmail from '@/app/actions/sendEmail'
import React from 'react'
import { toast } from 'react-toastify'

const SendEmail = () => {
    const sbt = async () => {
        try {

            const re = await sendEmail()
            if (!re.success) {
                throw re

            }
            toast.success(re.message)
            console.log("dwcwdcw")

        } catch (error) {
            console.log(error)
            toast.warning(error.message)

        }
    }

    return (
        <button onClick={sbt}>
            send
        </button>
    )
}

export default SendEmail
