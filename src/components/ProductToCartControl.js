"use client"
import decValueOfVarientByOne from '@/app/actions/decValueOfVarientByOne'
import getAboutVarientInCart from '@/app/actions/getAboutVarientInCart'
import incValueOfVarientByOne from '@/app/actions/incValueOfVarientByOne'
import isOutOfStock from '@/app/actions/isOutOfStock'
import isRemainingFew from '@/app/actions/isRemainingFew'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSWRConfig } from 'swr'
const ProductToCartControl = ({ varientId, style }) => {
    const isAuthenticated = useSession().status === "authenticated";

    const [noOfVarientInCart, setNoOfVarientInCart] = useState(0)
    const [isOutOfStockState, setIsOutOfStockState] = useState(false)
    const [isRemainingFewState, setIsRemainingFewState] = useState(false)
    const { mutate } = useSWRConfig()
    const pathname = usePathname();
    const rtr = useRouter()


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
                const noOfVarientCurrentInCart = JSON.parse(localStorage.getItem("cart"))?.products[varientId] || null



                setNoOfVarientInCart(cartItem ? cartItem.qty : (noOfVarientCurrentInCart && !isAuthenticated) ? noOfVarientCurrentInCart : 0)

                // Check if the variant has only a few remaining
                const resRemainingFew = await isRemainingFew(varientId)
                setIsRemainingFewState(resRemainingFew.data?.isRemaningFew || false)
            } catch (error) {
                // console.error('Error fetching variant data:', error)

            }
        }

        fetchData()
    }, [varientId]) // Runs whenever `varientId` changes


    const increaseTheValueToOne = async () => {
        try {

            if (isAuthenticated) {
                const res = await incValueOfVarientByOne(varientId)

                if (res && !res.success) throw res

                mutate('/action/getCartCount')
                mutate('/action/applyReferalPoint')

                setNoOfVarientInCart(res ? res.nwCartItem.qty : 0)

            } else {
                console.log(localStorage.getItem("cart"))
                const oldcart = JSON.parse(localStorage.getItem("cart")) || { products: {} }; // Parse or initialize
                console.log(oldcart)
                if (!oldcart.products) {
                    oldcart.products = {}

                }


                if (oldcart?.products[varientId]) {
                    // If the product already exists in the cart

                    oldcart.products[varientId]++;
                    setNoOfVarientInCart(oldcart.products[varientId]);
                } else {
                    // If the product is new
                    console.log(varientId)
                    oldcart.products[varientId] = 1;
                    setNoOfVarientInCart(1);
                }

                // Save the updated cart back to localStorage
                localStorage.setItem("cart", JSON.stringify(oldcart));
                mutate('/action/getCartCount')
                if (pathname.split('/').at(1) && pathname.split('/').at(1) === "guest-cart") {

                    rtr.push("/guest-cart/" + JSON.stringify(oldcart))



                }



            }


        } catch (error) {
            console.error(error)
            toast.warning(error.message || 'Failed to increase quantity')
        }
    }

    const decreaseTheValueToOne = async () => {
        try {
            if (isAuthenticated) {
                const res = await decValueOfVarientByOne(varientId)

                if (res && !res.success) throw res

                mutate('/action/getCartCount')
                mutate('/action/applyReferalPoint')

                setNoOfVarientInCart(res ? res.nwCartItem.qty : 0)

            } else {


                const oldcart = JSON.parse(localStorage.getItem("cart")) || { products: {} };

                // Check if the product exists in the cart
                if (oldcart.products[varientId] > 1) {
                    oldcart.products[varientId]--;
                    setNoOfVarientInCart(oldcart.products[varientId]);
                } else if (oldcart.products[varientId] === 1) {
                    delete oldcart.products[varientId]
                    setNoOfVarientInCart(0);



                }
                else {
                    oldcart.products[varientId] = 0; // Ensure it stays at 0
                    setNoOfVarientInCart(0); // Update the state
                }

                // Save the updated cart back to localStorage
                localStorage.setItem("cart", JSON.stringify(oldcart));
                mutate('/action/getCartCount')
                if (pathname.split('/').at(1) && pathname.split('/').at(1) === "guest-cart") {

                    rtr.push("/guest-cart/" + JSON.stringify(oldcart))



                }


            }

        } catch (error) {
            console.error(error)
            toast.warning(error.message || 'Failed to decrease quantity')
        }
    }


    if (isOutOfStockState) {
        return (
            <div>
                <p>Out Of Stock</p>

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
            <small style={{ margin: "0 5px" }}>{noOfVarientInCart}</small>
            <button onClick={increaseTheValueToOne}>+</button>
            {isRemainingFewState && (
                <p style={{ color: "#cc524c", fontSize: "1.1rem" }}>Remaining Few</p>
            )}
        </div>
    )
}

export default ProductToCartControl
