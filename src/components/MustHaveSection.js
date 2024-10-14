"use client"
import React, { useEffect, useState } from 'react'
import ProductGalary from './HomeProductGalary/ProductGalary'
import Image from 'next/image'
import logo2 from "../images/logo1.png"
import banner3 from "../images/banner3.jpg"
import spices from "../images/spices.png"
import getCategories from '@/app/actions/getCategories'

import getProductByCategoryIdAndTag from '@/app/actions/getProductByCategoryIdAndTag'
const MustHaveSection = ({mustHaveSectionBanners}) => {
  const [categories, setcategories] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState('')
  const [productsUnderActiveCategory, setproductsUnderActiveCategory] = useState([])
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getCategories()
        setcategories(res.categories)

      } catch (error) {
        console.log(error)

      }


    }
    fetch()


  }, [])
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getProductByCategoryIdAndTag(activeCategoryId,["mustHave"])
        
        setproductsUnderActiveCategory(res.serialProducts)

      } catch (error) {
        console.log(error)

      }


    }
    fetch()


  }, [activeCategoryId])



  return (
    <section className="product-tabs position-relative">
      <div className="container">
        <div className="row text-center">
          <h2 className="white">The Must Have Spices</h2>
          <p className="white">At WAH INDIA, we believe, that natual goodness is the way to go for healthy, balanced life.</p>
        </div>
        <div className="container">
          <div className="row">
            <div className="d-flex justify-content-center my-3 flex-wrap">
              <button className="btn btn-default filter-button" onClick={()=>setActiveCategoryId('')}  data-filter="all">All Products</button>
              {categories.map((cat,index)=><button key={index} onClick={()=>setActiveCategoryId(cat.id)} className="btn btn-default filter-button" id={cat.id} data-filter="spices">{cat.categoryName}</button>)}
            </div>
            <ProductGalary product={productsUnderActiveCategory} />
            <section className="spices-add pt-0">
              <div className="container">
                <div className="row mb-4">
                  <div className="col-md-4">

                    <Image src={mustHaveSectionBanners[0].images[0].url} alt="logo" width={18} height={9} layout="responsive" />
                  </div>
                  <div className="col-md-8">

                  <Image src={mustHaveSectionBanners[1].images[0].url} alt="logo" width={18} height={9} layout="responsive" />

                  </div>
                </div>
              </div>
              <div className="ban-img">
              <Image src={mustHaveSectionBanners[2].images[0].url} alt="logo" width={18} height={9} layout="responsive" />
              </div>
            </section>

          </div>
        </div>
      </div>
    </section>
  )
}

export default MustHaveSection
