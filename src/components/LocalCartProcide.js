"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const LocalCartProcide = () => {
    const rtr = useRouter()
    const onChkOut = () => {
        rtr.push("/sign-in")


    }

    return (
        <div className="col">
            <button type="button" onClick={onChkOut} className="mt-3 pay-now-button btn mr-5">Procide</button>
        </div>
    )
}

export default LocalCartProcide
