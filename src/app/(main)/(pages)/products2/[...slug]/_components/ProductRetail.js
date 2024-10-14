import ProductToCartControl from '@/components/ProductToCartControl'
import calculateFinalPrice from '@/lib/calculateFinalPrice'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductRetail = ({ imageS, ProductName, varienId, discount, Price, goto = "/product-details" }) => {
    return (
        <div className="col-md-3 product-inner">
            <div className="prod-container">

                <div className="pro-img text-center position-relative">
                    <Link href={goto}>  <Image layout='responsive' src={imageS} alt='logo' height={450} width={400} /></Link>

                    <div className="hover-view">
                        <a href="#"><i className="fa-solid fa-eye"></i></a>
                        <a href="#"><i className="fa-solid fa-code-compare"></i></a>
                        <a href="#"><i className="fa-solid fa-heart"></i></a>


                    </div>
                </div>

                <div className="pro-title">
                    <Link href={goto}> {ProductName}</Link>

                </div>
                <div className="pro-details d-flex justify-content-between">
                    <div className="pro-rating-price">
                        <div className="pro-rating"> <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></div>


                        {parseFloat(discount) === 0 ? <div className="pro-price">₹{Price}</div> : <><p style={{ color: "green" }}>Offer price ₹{calculateFinalPrice(Price, discount)}


                        </p>
                        <s>
                         MRP ₹ {Price}
                        </s>
                        
                        </>}
                    </div>
                    <ProductToCartControl varientId={varienId} />

                </div>


            </div>
        </div>
    )
}

export default ProductRetail
