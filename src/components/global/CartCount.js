"use client"
import getCartCount from '@/app/actions/getCartCount'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useCallback } from 'react'
import useSWR from 'swr'

const CartCount = () => {
    const isAuthenticated = useSession().status === "authenticated";
    const helper = useCallback(async () => {
        if (isAuthenticated) {
            const res = await getCartCount()

            var value = 0
            res.data.forEach(element => {
                value += parseInt(element.qty)


            });

            return value

        }else{

            const localCart =  JSON.parse(localStorage.getItem("cart"))
            let count = 0 ;
            if (localCart && localCart.products) {
                for(const key in localCart.products){
                    count += localCart.products[key]
                }
                
            }
            if (localCart && localCart.combos) {

                for(const key in localCart.combos){
                    count+=localCart.combos[key]
                }
            }
            return count
            

        }


    })
    const { data, mutate } = useSWR('/action/getCartCount', helper)
  

    return (

        data


    )
}

export default CartCount
