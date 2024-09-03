import ProductToCartControl from '@/components/ProductToCartControl';
import calculateFinalPrice from '@/lib/calculateFinalPrice';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
 
const GalaryProduct = ({imageS,discount,nameOfProduct,price,stars,goTo="/productDetails",varientId}) => {
    const strel = Array(stars).fill(null).map((_, index) => <i key={index} className="fa-solid fa-star"></i>);
  return (
    <div style={{marginBottom:"52px"}} className="gallery_product col-lg-2 col-md-2 col-sm-3 col-xs-6 filter border flours-instances p-3 col-6">
       <div className="prod-container">
    
          <div className="pro-img text-center position-relative">
            <Link href={goTo}>  <Image layout='responsive' height={71} width={150} src={imageS} alt='logo'/></Link>
          
            <div className="hover-view">
              <Link href={goTo}><i className="fa-solid fa-eye"></i></Link>
              <Link href={goTo}><i className="fa-solid fa-code-compare"></i></Link>
              <Link href={goTo}><i className="fa-solid fa-heart"></i></Link>
             
             
             </div>
          </div>
        
          <div className="pro-title">
            <Link href={goTo}> {nameOfProduct}</Link>
          
          </div>
          <div className="pro-details d-flex justify-content-between">
            <div className="pro-rating-price">
              <div className="pro-rating"> 
                {strel}
              </div>
         
              {parseFloat(discount)===0?<div className="pro-price">₹{price}</div>:<><p style={{color:"green"}}>
                Offer price ₹{calculateFinalPrice(price,discount)}
               
                </p>
                <s>MRP {price}</s>
                </>}
            </div>
           
  
          </div>
          <ProductToCartControl varientId={varientId}/>
      
       
       </div>
    </div>
  )
}

export default GalaryProduct
