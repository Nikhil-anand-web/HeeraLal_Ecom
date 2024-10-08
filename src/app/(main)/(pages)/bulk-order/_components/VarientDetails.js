"use client"
import ProductToCartControl from '@/components/ProductToCartControl'
import gramsToKg from '@/lib/gramToKg'
import React, { useState } from 'react'

const VarientDetails = ({varients,stars}) => {
    

    const initialActiveVarient= varients.filter((varient)=>parseFloat(varient.discount)!==0)
    if (initialActiveVarient.length===0) {
        initialActiveVarient.push(varients[0])

        
    }
    const [activeVarient,setActiveVarient] = useState(initialActiveVarient[0])
    const strel = Array(stars).fill(null).map((_, index) => <i key={index} className="fa-solid fa-star"></i>);
    return (
        <div className="pro-details ">
            <div className="pro-rating-price">
                <div className="pro-rating"> 
                    {strel}
                </div>

                <div className="pro-price">₹{activeVarient.mrp}</div>
            </div>
            <div className="qty-selector mb-5">
                {varients.map((varient)=> <button onClick={()=>setActiveVarient(varient)} className= {` ${varient.id===activeVarient.id &&"active"} mb-2`}>{gramsToKg(parseFloat(varient.weight))} kg</button>)}
          
            </div>
            {/* {activeVarient.id} */}
            <ProductToCartControl varientId={activeVarient.id}/>
        </div>
    )
}

export default VarientDetails
