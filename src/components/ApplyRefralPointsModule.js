"use client"
import applyReferalPoint from '@/app/actions/applyReferalPoint'

import React, { useCallback } from 'react'

import useSWR from 'swr'

const ApplyRefralPointsModule = ({referaldiscountOnCart,referal}) => {
    const helper = useCallback(async () => {
        const res = await applyReferalPoint()
      
    
        
       return res

    })

   const {res ,mutate} = useSWR('/action/applyReferalPoint', helper)
    // const onApply = async () => {
    //     try {
    //         const res =   mutate("/action/applyReferalPoint")

    //         if (!res.success) {
    //             throw res

    //         }
    //         toast.success(res.message)
    //     } catch (error) {

    //         toast.warning(error.message)

    //     }

    // }
    // const onRemove = async()=>{
    //     try {
    //         const res = await  removeReferalDiscount()

    //         if (!res.success) {
    //             throw res

    //         }
    //         toast.success(res.message)
    //     } catch (error) {

    //         toast.warning(error.message)

    //     }

    // }


   

    return (
        referal.coins>0 &&<>
            <div className="col-md-6 p-2 border"><strong>Referal Discount</strong></div>
            <div className="col-md-6 p-2 border text-end">₹{referaldiscountOnCart}</div>

            {/* <div style={{ width: "100%" }} className="pro-add-to-cart-btn">
               { parseFloat(referaldiscountOnCart)<=0?<button onClick={onApply} style={{ width: "100%" }} > Apply refral discount </button>:<button onClick={onRemove} style={{ width: "100%" }} > Remove Referal Discount</button>}


            </div> */}
        </>
    )
}

export default ApplyRefralPointsModule
