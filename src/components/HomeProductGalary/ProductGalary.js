"use client"
import React, { Suspense } from 'react'
import GalaryProduct from './_components/GalaryProduct'
import itm from '../../images/pavbhaji.jpg'
import Spinner from '../global/Spinner'
const ProductGalary = ({ product }) => {
  console.log(product, "bdgywdgywdgweu")

  return (
    <div className="gallerybox row g-0">
      {product.map((pro, index) =>
       
          <GalaryProduct varientId={pro.varient[0].id} key={index} goTo={`/product-details/${pro.slug}`} stars={pro.stars < 1 ? 1 : pro.stars > 5 ? 5 : pro.stars} imageS={pro.thumbNail[0].url} price={pro.varient[0].mrp.toString()} discount={pro.varient[0].discount.toString()} nameOfProduct={pro.name} />

      )}



    </div>
  )
}

export default ProductGalary
