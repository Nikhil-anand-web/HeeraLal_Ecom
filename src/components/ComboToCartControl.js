"use client"
import decValueOfComboByOne from '@/app/actions/decValueOfComboByOne'
import getAboutComboInCart from '@/app/actions/getAboutComboInCart'
import incValueOfComboByOne from '@/app/actions/incValueOfComboByOne'
import isComboOutOfStock from '@/app/actions/isComboOutOfStock'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSWRConfig } from 'swr'

const ComboToCartControl = ({ comboId = '', style }) => {
    const isAuthenticated = useSession().status === "authenticated";
    const [cmbid, setcmbid] = useState(comboId)
    const [noOfComboInCart, setNoOfComboInCart] = useState(0)
    const [isOutOfStockState, setIsOutOfStockState] = useState(false)
    const { mutate } = useSWRConfig()
    const pathname = usePathname();
    const rtr = useRouter()


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
                const noOfcmbCurrentInCart = JSON.parse(localStorage.getItem("cart"))?.combos[cmbid]

                // Fetch combo details in the cart
                const resCartData = await getAboutComboInCart(comboId)
                const cartComboItem = resCartData?.cart?.cartComboItems[0] || null
                setNoOfComboInCart(cartComboItem ? cartComboItem.qty : (noOfcmbCurrentInCart && !isAuthenticated) ? noOfcmbCurrentInCart : 0)
            } catch (error) {
                console.error('Error fetching combo data:', error)

            }
        }

        fetchComboData()
    }, [comboId]) // Runs whenever comboId changes

    const increaseTheValueToOne = async () => {
        try {
            if (isAuthenticated) {
                const res = await incValueOfComboByOne(comboId)

                if (res && !res.success) throw res

                mutate('/action/getCartCount')
                mutate('/action/applyReferalPoint')

                setNoOfComboInCart(res ? res.nwCartComboItem.qty : 0)


            } else {



                let oldcart = JSON.parse(localStorage.getItem("cart")) || { combos: {} }; // Parse or initialize the object
                if (!oldcart.combos) {
                    oldcart.combos = {}

                }

                if (oldcart.combos[cmbid]) {
                    // If the combo already exists in the cart
                    oldcart.combos[cmbid]++;
                    setNoOfComboInCart(oldcart.combos[cmbid]);
                } else {
                    // If the combo is new
                    oldcart.combos[cmbid] = 1;
                    setNoOfComboInCart(1);
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
            toast.warning(error.message || 'Failed to increase combo quantity')
        }
    }

    const decreaseTheValueToOne = async () => {
        try {
            if (isAuthenticated) {


                const res = await decValueOfComboByOne(comboId)

                if (res && !res.success) throw res

                mutate('/action/getCartCount')
                mutate('/action/applyReferalPoint')

                setNoOfComboInCart(res ? res.nwCartComboItem.qty : 0)
            } else {
                let oldcart = JSON.parse(localStorage.getItem("cart")) || { combos: {} }; // Parse or initialize the object

                if (oldcart.combos[cmbid] && oldcart.combos[cmbid] > 1) {
                    // If the combo exists and has a quantity greater than 0
                    oldcart.combos[cmbid]--;
                    setNoOfComboInCart(oldcart.combos[cmbid]);
                } else if (oldcart.combos[cmbid] === 1) {
                    delete oldcart.combos[cmbid]
                    setNoOfComboInCart(0);

                } else {
                    // If the combo doesn't exist or the quantity is already 0
                    oldcart.combos[cmbid] = 0;
                    setNoOfComboInCart(0);
                }
                if (pathname.split('/').at(1) && pathname.split('/').at(1) === "guest-cart") {

                    rtr.push("/guest-cart/" + JSON.stringify(oldcart))



                }
                // Save the updated cart back to localStorage
                localStorage.setItem("cart", JSON.stringify(oldcart));
                mutate('/action/getCartCount')

            }
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
