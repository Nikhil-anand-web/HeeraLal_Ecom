"use client"
import Image from 'next/image'
import React from 'react'
import p2 from "../images/p1.webp"

import p1 from "../images/p1.webp"
import calculateFinalPrice from '@/lib/calculateFinalPrice'
import ComboToCartControl from './ComboToCartControl'

const ComboThumbnail = ({ combo }) => {
    var totalMrp = 0
    const percentageDiscount = parseFloat(combo.discountInPercent)
    const thumbnails = combo.productVarients.map((varient) => {
        totalMrp += parseFloat(varient.mrp)

        return varient.product.thumbNail[0].url
    })
    const actualPrice = calculateFinalPrice(totalMrp, percentageDiscount)


    return (
        <div className="row mt-5">
            <div className="col-12">
                <h2>{combo.name}</h2>
            </div>
            <div className="col-12 d-flex align-items-center combotext flex-wrap">

                {thumbnails.map((th, index) => <>
                    <div key={index} >
                        <Image style={{ display: "block" }} src={th} width={200} height={300} alt='' />
                        <p>{combo.productVarients[index].product.name}</p> <p>weight - {combo.productVarients[index].weight}gm</p>
                        <p>MRP - {combo.productVarients[index].mrp}</p>
                    </div>
                    {index !== thumbnails.length - 1 ? "+" : ""}
                    </>
                )}

                =  <div className="offerPrice"><div className="strike">  ₹ {totalMrp}</div> <small style={{ color: "green" }}>Offer Price ₹ {actualPrice}</small><br /> <ComboToCartControl comboId={combo.id} /></div>

            </div>
        </div>
    )
}

export default ComboThumbnail
{/* <Image src={p1} width={"100"} alt='' /> + <Image src={p2} width={"100"} alt='logo' />  + <Image src={p2} width={"100"} alt='' /> */ }