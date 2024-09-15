"use client"
import decValueOfVarientByOne from '@/app/actions/decValueOfVarientByOne'
import getAboutVarientInCart from '@/app/actions/getAboutVarientInCart'
import incValueOfVarientByOne from '@/app/actions/incValueOfVarientByOne'
import isOutOfStock from '@/app/actions/isOutOfStock'
import isRemainingFew from '@/app/actions/isRemainingFew'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSWRConfig } from 'swr'

const ProductToCartControl = ({ varientId = '' ,style }) => {
    const [noOfVarientInCart, setNoOfVarientInCart] = useState(0)
    const [isOutOfStockState ,setIsOutOfStockState] =useState(false)
    const [isRemaningFew , setIsRemainingFew] = useState(false)
    const{mutate} = useSWRConfig()
    
    useEffect(() => {
        const fetch = async () => {
            const res = await  isOutOfStock(varientId)
            if (res.data.isOutOfStock) {
                setIsOutOfStockState(res.data.isOutOfStock)
                return

                
            }
            const data = await getAboutVarientInCart(varientId)
            if (data?.cart?.cartItem.length > 0) {
                setNoOfVarientInCart(data.cart.cartItem[0].qty)
                

            }
            const isrmfew = await isRemainingFew(varientId)
            setIsRemainingFew(isrmfew.data.isRemaningFew)


            
        }
        fetch()


    }, [])
    const increaseTheValueToOne = async () => {
        try {
            const res = await incValueOfVarientByOne(varientId)

            if (!res.success) {
                throw res
                
            }
            mutate('/action/getCartCount')
            mutate('/action/applyReferalPoint')

            setNoOfVarientInCart(res.nwCartItem.qty)

        } catch (error) {
            console.log(error)

        }


    }
    const decreaseTheValueToOne = async () => {

        try {
            const res = await decValueOfVarientByOne(varientId)
            if (!res.success) {
                throw res
                
            }
            mutate('/action/getCartCount')
            mutate('/action/applyReferalPoint')

            setNoOfVarientInCart(res.nwCartItem.qty)

        } catch (error) {
            console.log(error)
            toast.warning(error.message)

        }
    }
    if (isOutOfStockState) {
        return<div> <p>Varient Out Of Stock </p>
        <p> Click To View Other</p>
        </div>
        
    }
    if (noOfVarientInCart === 0) {
   
        return<> <div style={style} className="pro-add-to-cart-btn">


            <button onClick={increaseTheValueToOne}> + Add</button>
            {isRemaningFew&&<p style={{color:"#cc524c",fontSize:"1.1rem"}}>Remaining Few</p>}
        </div>
        
        </>
        

    }
    return (
        <div style={style}  className="pro-add-to-cart-btn">
            <button onClick={decreaseTheValueToOne}> - </button>

            {noOfVarientInCart}

            <button onClick={increaseTheValueToOne}> + </button>
            {isRemaningFew&&<p style={{color:"#cc524c",fontSize:"1.1rem"}}>Remaining Few</p>}
        </div>
    )
}

export default ProductToCartControl
