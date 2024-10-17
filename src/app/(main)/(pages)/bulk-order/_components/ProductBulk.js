import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import VarientDetails from './VarientDetails'

const ProductBulk = ({ imageS, procuctName, varients }) => {
    return (
        <div class="col-md-4 product-inner">
            <div class="prod-container">
                <div class="row d-flex">
                    <div class="col-8">
                        <div class="pro-img text-center position-relative">
                            <Link href={`/product-details/${varients[0].product.slug}`}>  <Image layout='responsive' src={imageS} alt='logo' width={100} height={100} /></Link>
                            <div class="hover-view">
                                <a href="#"><i class="fa-solid fa-eye"></i></a>
                                <a href="#"><i class="fa-solid fa-code-compare"></i></a>
                                <a href="#"><i class="fa-solid fa-heart"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="pro-title">
                            <a href="#">{procuctName}</a>

                        </div>
                        <VarientDetails varients={varients}/>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default ProductBulk
