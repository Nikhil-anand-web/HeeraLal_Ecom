"use client"
import abandCartMessenger from '@/lib/abandCartMessenger'
import React from 'react'

const SendAbandWhap = () => {
    const ondub = async () => {
        await abandCartMessenger()

    }
    return (
        <div>
            <button onClick={ondub}>
                i am 
            </button>
        </div>
    )
}

export default SendAbandWhap
