"use client"
import ProductToCartControl from '@/components/ProductToCartControl'
import calculateFinalPrice from '@/lib/calculateFinalPrice'
import React, { useState } from 'react'

const VarientControl = ({ varients }) => {
  var defvar = null

  const ac = varients.filter(((varient) => {
    if (varient.isDefault) {
      defvar = varient


    }

    return parseFloat(  varient.discount) !== 0


  }))
 
  if (ac.length === 0) {
    ac.push(defvar)

  }
  const [activeVarient, setActiveVarient] = useState(ac[0])

  return (
    <div>

      <h3>Variants</h3>
      <div className="qty-selector mb-5">
        {varients.map((varient,index) => <button key={index} onClick={() => setActiveVarient(varient)} className={activeVarient.id === varient.id ? "active" : " "}>{varient.weight} gm</button>)}

      </div>

      <div className="price-and-quantity my-2">
        <p className="single-product-price">
          {activeVarient.discount !== '0' ? <span className="single-product-price-template-product">
            <span style={{ color: "green" }} className="money-heading me-2 d-inline-block" >Offer ₹{calculateFinalPrice(activeVarient.mrp, activeVarient.discount)}</span>


            <span className="me-2 d-inline-block money-sale" > <s>MRP ₹{activeVarient.mrp}</s></span>
            <span style={{ color: "red" }} className=" font-c me-2 d-inline-block ">-{activeVarient.discount}%</span>

          </span> : <span><span className="money-heading me-2 d-inline-block" >Price ₹{calculateFinalPrice(activeVarient.mrp, activeVarient.discount)}</span></span>}
        </p>


      </div>
      <div className="quantity_box mt-4">
        <div className="input-group">

          <ProductToCartControl varientId={activeVarient.id} />
        </div>

      </div>



    </div>
  )
}

export default VarientControl
