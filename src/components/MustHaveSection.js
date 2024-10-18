"use client"
import React, { useEffect, useState } from 'react'
import ProductGalary from './HomeProductGalary/ProductGalary'
import Image from 'next/image'
import getCategories from '@/app/actions/getCategories'
import getProductByCategoryIdAndTag from '@/app/actions/getProductByCategoryIdAndTag'
import Spinner from './global/Spinner'

const MustHaveSection = ({ mustHaveSectionBanners }) => {
  const [categories, setcategories] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState('')
  const [productsUnderActiveCategory, setproductsUnderActiveCategory] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true)
        const res = await getCategories()
        setcategories(res.categories)
        const highPri = res.categories.reduce((accumulator, currentValue) => {
          // If accumulator is 0 (initial case), set the currentValue as the accumulator
          if (accumulator === 0) {
            return currentValue;
          }
          // Compare the displayOrder and return the one with the higher value
          return accumulator.displayOrder < currentValue.displayOrder ? accumulator : currentValue;
        }, 0);


        setActiveCategoryId(highPri.id)


      } catch (error) {
        console.log(error)

      } finally {
        setIsLoading(false)
      }


    }
    fetch()


  }, [])
  useEffect(() => {
    const fetch = async () => {
      <ProductGalary product={productsUnderActiveCategory} />
      try {
        if (activeCategoryId !== '') {
          setIsLoading(true)
          const res = await getProductByCategoryIdAndTag(activeCategoryId, ["mustHave"])

          setproductsUnderActiveCategory(res.serialProducts)

        }


      } catch (error) {
        console.log(error)

      } finally {
        setIsLoading(false)
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
             
              {categories.map((cat, index) => <button key={index}  onClick={() => {
              
                setActiveCategoryId(cat.id)
               

              }

              } style={{backgroundColor:"transparent" ,border:"none",padding:"10px"}} className={` ${activeCategoryId===cat.id?"active-cat-current":""} active-cat   filter-button`} id={cat.id} data-filter="all">{cat.categoryName}</button>)}
            </div>
            {isLoading === true ? <div style={{marginBottom:"231px",position:"relative",bottom:"-167px"}}>
             <Spinner/>

            </div> : <ProductGalary product={productsUnderActiveCategory} />}
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
