"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { useSWRConfig } from 'swr'

const LocalCartEmpty = () => {
    const { mutate } = useSWRConfig()
    const rtr = useRouter()
    const ondel = () => {
        localStorage.removeItem("cart")
        mutate('/action/getCartCount')
        rtr.replace("/guest-cart")

    }

    return (
        <div className="col">
            <button type="submit" onClick={ondel} className="mt-3 pay-now-button btn">Empty Cart</button>
        </div>
    )
}

export default LocalCartEmpty
