"use client"
import decValueOfComboByOne from '@/app/actions/decValueOfComboByOne'
import getAboutComboInCart from '@/app/actions/getAboutComboInCart'
import incValueOfComboByOne from '@/app/actions/incValueOfComboByOne'
import isComboOutOfStock from '@/app/actions/isComboOutOfStock'

import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSWRConfig } from 'swr'

const ComboToCartControl = ({ comboId = '', style }) => {
    const [noOfComboInCart, setNoOfComboInCart] = useState(0)
    const [isOutOfStockState, setIsOutOfStockState] = useState(false)
    const { mutate } = useSWRConfig()

    useEffect(() => {
        const fetchComboData = async () => {
            if (!comboId) return; // Ensure comboId is provided

            try {
                // Check if combo is out of stock
                const resOutOfStock = await isComboOutOfStock(comboId)
                if (resOutOfStock.data?.isOutOfStock) {
                    setIsOutOfStockState(true)
                    return
                } else {
                    setIsOutOfStockState(false)
                }

                // Fetch combo details in the cart
                const resCartData = await getAboutComboInCart(comboId)
                const cartComboItem = resCartData?.cart?.cartComboItems[0] || null
                setNoOfComboInCart(cartComboItem ? cartComboItem.qty : 0)
            } catch (error) {
                console.error('Error fetching combo data:', error)
                toast.error('Failed to load combo data')
            }
        }

        fetchComboData()
    }, [comboId]) // Runs whenever comboId changes

    const increaseTheValueToOne = async () => {
        try {
            const res = await incValueOfComboByOne(comboId)

            if (res &&!res.success) throw res

            mutate('/action/getCartCount')
            mutate('/action/applyReferalPoint')

            setNoOfComboInCart(res?res.nwCartComboItem.qty:0)
        } catch (error) {
            console.error(error)
            toast.warning(error.message || 'Failed to increase combo quantity')
        }
    }

    const decreaseTheValueToOne = async () => {
        try {
            const res = await decValueOfComboByOne(comboId)

            if (res &&!res.success) throw res

            mutate('/action/getCartCount')
            mutate('/action/applyReferalPoint')

            setNoOfComboInCart(res?res.nwCartComboItem.qty:0)
        } catch (error) {
            console.error(error)
            toast.warning(error.message || 'Failed to decrease combo quantity')
        }
    }

    if (isOutOfStockState) {
        return (
            <div>
                <p>Combo Out Of Stock</p>
            </div>
        )
    }

    if (noOfComboInCart === 0) {
        return (
            <div style={style} className="pro-add-to-cart-btn">
                <button
                    onClick={increaseTheValueToOne}
                    className="btn single-product-addtocart-template-product"
                >
                    <i className="fa fa-shopping-bag"></i> Add Combo to Cart
                </button>
            </div>
        )
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
