import ProductToCartControl from '@/components/ProductToCartControl';
import calculateFinalPrice from '@/lib/calculateFinalPrice';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const RecommendedProduct = ({ imageS, productName, price, stars, goTo = "/productDetails", discount ,varientId}) => {
    const strel = Array(stars).fill(null).map((_, index) => <i key={index} className="fa-solid fa-star"></i>);
    return (
        <div className="col-md-2  product-inner">
            <div className="prod-container">

                <div className="pro-img text-center position-relative">
                    <Link href={goTo}>  <Image src={imageS} alt="logo" layout='responsive' height={71} width={150} /> </Link>

                    <div className="hover-view">
                        <Link href={goTo}><i className="fa-solid fa-eye"></i></Link>
                        <Link href={goTo}><i className="fa-solid fa-code-compare"></i></Link>
                        <Link href={goTo}><i className="fa-solid fa-heart"></i></Link>


                    </div>
                </div>

                <div className="pro-title">
                    <Link href={goTo}>  {productName}</Link>

                </div>
                <div className="pro-details d-flex justify-content-between">
                    <div className="pro-rating-price">
                        <div className="pro-rating">{strel}</div>

                        {parseFloat(discount) === 0 ? <div className="pro-price">₹{price}</div> : <p style={{ color: "green" }}>Offer price ₹{calculateFinalPrice(price, discount)}</p>}
                    </div>
                    
                    

                </div>
                <ProductToCartControl varientId={varientId} />
                


            </div>
        </div>
    )
}

export default RecommendedProduct
