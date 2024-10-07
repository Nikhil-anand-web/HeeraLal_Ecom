"use client"
import decValueOfVarientByOne from '@/app/actions/decValueOfVarientByOne'
import getAboutVarientInCart from '@/app/actions/getAboutVarientInCart'
import incValueOfVarientByOne from '@/app/actions/incValueOfVarientByOne'
import isOutOfStock from '@/app/actions/isOutOfStock'
import isRemainingFew from '@/app/actions/isRemainingFew'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSWRConfig } from 'swr'

const ProductToCartControl = ({ varientId, style }) => {
    const [noOfVarientInCart, setNoOfVarientInCart] = useState(0)
    const [isOutOfStockState, setIsOutOfStockState] = useState(false)
    const [isRemainingFewState, setIsRemainingFewState] = useState(false)
    const { mutate } = useSWRConfig()

    useEffect(() => {
        const fetchData = async () => {
            if (!varientId) return; // Check if varientId is provided

            try {
                // Check if the variant is out of stock
                const resOutOfStock = await isOutOfStock(varientId)
                if (resOutOfStock.data?.isOutOfStock) {
                    setIsOutOfStockState(true)
                    return
                } else {
                    setIsOutOfStockState(false)
                }

                // Fetch variant information in the cart
                const resCartData = await getAboutVarientInCart(varientId)
                const cartItem = resCartData?.cart?.cartItem[0] || null
                setNoOfVarientInCart(cartItem ? cartItem.qty : 0)

                // Check if the variant has only a few remaining
                const resRemainingFew = await isRemainingFew(varientId)
                setIsRemainingFewState(resRemainingFew.data?.isRemaningFew || false)
            } catch (error) {
                console.error('Error fetching variant data:', error)
                toast.error("Failed to load product data")
            }
        }

        fetchData()
    }, [varientId]) // Runs whenever `varientId` changes

    const increaseTheValueToOne = async () => {
        try {
            const res = await incValueOfVarientByOne(varientId)

            if (res &&!res.success) throw res

            mutate('/action/getCartCount')
            mutate('/action/applyReferalPoint')

            setNoOfVarientInCart(res?res.nwCartItem.qty:0)
        } catch (error) {
            console.error(error)
            toast.warning(error.message || 'Failed to increase quantity')
        }
    }

    const decreaseTheValueToOne = async () => {
        try {
            const res = await decValueOfVarientByOne(varientId)

            if (res &&!res.success) throw res

            mutate('/action/getCartCount')
            mutate('/action/applyReferalPoint')

            setNoOfVarientInCart(res?res.nwCartItem.qty:0)
        } catch (error) {
            console.error(error)
            toast.warning(error.message || 'Failed to decrease quantity')
        }
    }

    
    if (isOutOfStockState) {
        return (
            <div>
                <p>Variant Out Of Stock</p>
                <p style={{color:"green"}} >Click To View Other</p>
            </div>
        )
    }

    // Handle zero quantity in cart
    if (noOfVarientInCart === 0) {
        return (
            <div style={style} className="pro-add-to-cart-btn">
                <button onClick={increaseTheValueToOne}>+ Add</button>
                {isRemainingFewState && (
                    <p style={{ color: "#cc524c", fontSize: "1.1rem" }}>Remaining Few</p>
                )}
            </div>
        )
    }

    // Handle when there are items in the cart
    return (
        <div style={style} className="pro-add-to-cart-btn">
            <button onClick={decreaseTheValueToOne}>-</button>
            {noOfVarientInCart}
            <button onClick={increaseTheValueToOne}>+</button>
            {isRemainingFewState && (
                <p style={{ color: "#cc524c", fontSize: "1.1rem" }}>Remaining Few</p>
            )}
        </div>
    )
}

export default ProductToCartControl
