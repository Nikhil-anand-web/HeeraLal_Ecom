"use client"
import decValueOfComboByOne from '@/app/actions/decValueOfComboByOne'
import decValueOfVarientByOne from '@/app/actions/decValueOfVarientByOne'
import getAboutComboInCart from '@/app/actions/getAboutComboInCart'
import getAboutVarientInCart from '@/app/actions/getAboutVarientInCart'
import incValueOfComboByOne from '@/app/actions/incValueOfComboByOne'
import incValueOfVarientByOne from '@/app/actions/incValueOfVarientByOne'
import isComboOutOfStock from '@/app/actions/isComboOutOfStock'

import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSWRConfig } from 'swr'

const ComboToCartControl = ({ comboId = '', style }) => {
    const [noOfComboInCart, setNoOfComboInCart] = useState(0)
    const [isOutOfStockState, setIsOutOfStockState] = useState(false)
    const {mutate} = useSWRConfig()


    useEffect(() => {
        const fetch = async () => {
            const res = await isComboOutOfStock(comboId)
            if (res.data.isOutOfStock) {
                setIsOutOfStockState(res.data.isOutOfStock)
                return


            }
            const data = await getAboutComboInCart(comboId)
            if (data?.cart?.cartComboItems.length > 0) {
                setNoOfComboInCart(data.cart.cartComboItems[0].qty)


            }




        }
        fetch()


    }, [])
    const increaseTheValueToOne = async () => {
        try {
            const res = await incValueOfComboByOne(comboId)
            if (!res.success) {
                throw res

            }
            mutate('/action/getCartCount')

            setNoOfComboInCart(res.nwCartComboItem.qty)

        } catch (error) {
            console.log(error)

        }


    }
    const decreaseTheValueToOne = async () => {

        try {
            const res = await decValueOfComboByOne(comboId)
            if (!res.success) {
                throw res

            }
            mutate('/action/getCartCount')
            setNoOfComboInCart(res.nwCartComboItem.qty)

        } catch (error) {
            console.log(error)
            toast.warning(error.message)

        }
    }
    if (isOutOfStockState) {
        return <div> <p>combo Out Of Stock </p>

        </div>

    }
    if (noOfComboInCart === 0) {

        return <> <div style={style} className="pro-add-to-cart-btn">


            <button onClick={increaseTheValueToOne} className="btn single-product-addtocart-template-product"><i className="fa fa-shopping-bag"></i>Add Combo to cart</button>

        </div>

        </>


    }
    return (
        <div style={style} className="pro-add-to-cart-btn">
            <button onClick={decreaseTheValueToOne}> - </button>

            {noOfComboInCart}

            <button onClick={increaseTheValueToOne}> + </button>

        </div>
    )
}

export default ComboToCartControl
