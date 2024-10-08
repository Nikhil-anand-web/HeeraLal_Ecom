import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ProductToCartControl from './ProductToCartControl'
import calculateFinalPrice from '@/lib/calculateFinalPrice'
const TopSellingProduct = ({ imageS, productName, discount, price,varientId, stars=1, goTo = "/product-details" }) => {
  const strel = Array(stars).fill(null).map((_, index) => <i key={index} className="fa-solid fa-star"></i>);
   console.log(price,discount,"jygjty")
  return (
    <div className="top-selling-product">
      <div className="top-slling-img">
        <Link href={goTo}><Image height={71} width={150}src={imageS} alt="logo" className='img-fluid' /></Link>
      </div>
      <div className="top-selling-pro-box">
        <div className="product-heding"><Link href={goTo}>{productName} </Link></div>
        <div className="product-rating">{strel}</div>
      
        {(discount==0 || !discount)?<div className="pro-price">₹{price.toString()}</div>:<p style={{color:"green"}}>Offer price ₹{calculateFinalPrice(parseFloat(price),parseFloat(discount))}</p>}
       <ProductToCartControl style={{marginTop:"20px"}} varientId={varientId}/>
      </div>
    </div>
  )
}
export default TopSellingProduct
