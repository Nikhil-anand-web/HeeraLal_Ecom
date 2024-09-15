"use client"
import getCartCount from '@/app/actions/getCartCount'
import Link from 'next/link'
import React, { useCallback } from 'react'
import useSWR from 'swr'

const CartCount = () => {
    const helper = useCallback(async () => {
        const res = await getCartCount()
      
        var value = 0
        res.data.forEach(element => {
            value += parseInt(element.qty)


        });
        
       return value

    })
    const { data, mutate } = useSWR('/action/getCartCount', helper)
    console.log(data,"helper")

    return (
        
         data
               
        
    )
}

export default CartCount
