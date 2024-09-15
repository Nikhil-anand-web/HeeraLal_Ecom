
"use client"
import emptyCart from '@/app/actions/emptyCart'
import React from 'react'
import { toast } from 'react-toastify'
import { useSWRConfig } from 'swr'

const EmptyCartButton = () => {
  const{mutate} = useSWRConfig()
    const ondel = async()=>{
        try {
            const res = await emptyCart()
            if (!res.success) {
                throw res
                
            }
            mutate('/action/getCartCount')
            
          toast.success(res.message)


            
        } catch (error) {
            console.log(error)
            toast.warning(error.message)
            
        }
    }
  return (
    <div className="col">
    <button type="submit" onClick={ondel} className="mt-3 pay-now-button btn">Empty Cart</button>
</div>
  )
}

export default EmptyCartButton
