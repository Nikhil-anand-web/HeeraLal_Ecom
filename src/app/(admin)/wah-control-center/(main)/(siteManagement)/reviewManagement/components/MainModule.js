"use client"


import getSearchedProduct from '@/app/actions/getSearchedProduct';
import BlogModel from '@/components/adminComp/BlogModel';
import ProductModel from '@/components/adminComp/ProductModel';
import getSearchedBlogs from '@/components/getSearchedBlogs';
import Spinner from '@/components/global/Spinner';
import debounce from '@/lib/debounce';
import { useRouter } from 'next/navigation';

import React, { useCallback, useEffect, useState } from 'react'
import ReviewModel from './ReviewModel';
import getSearchedReview from '@/app/actions/getSearchedReview';
import formatDateTo12Hour from '@/lib/formatDateTo12Hour';

const MainModule = ({ pageNo, itemsPerPage }) => {


  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRev, setFilteredRev] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refetchComp, setRefetchComp] = useState(false)

  const fetchResults = useCallback(
    debounce(async (searchQuery) => {

      try {
        setIsLoading(true)
        const response = await getSearchedReview(searchQuery, pageNo, itemsPerPage)

      
        setFilteredRev(response.reviews);



      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false)
      }

    }, 100),
    []
  );

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const helper = () => {
      fetchResults(lowercasedQuery)
    }
    helper()


  }, [searchQuery, refetchComp]);



  return (
    <>

      <div style={{ marginBottom: "5rem" }} className="input-group">

        <span className="input-group-text" id="">Search</span>

        <input value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }} type="text" className="form-control" />
      </div>

      {(!isLoading ? <>




        <div style={{ display: "flex" }} className={"hide-scrollbar "} >
          {filteredRev.map((rev, index) => <ReviewModel key={index} isActive={rev.isActive} showOnBanner={rev.showOnBanner} id={rev.id} reviewer={rev.customer.firstName + " " + rev.customer.lastName} productSlug={rev.product.slug} productName={rev.product.name} reviewerEmail={rev.customer.email}  reviewerMobile={rev.customer.mobile}  message={rev.message} stars={rev.stars} date={formatDateTo12Hour(rev.createdAt)} setRefetchComp={setRefetchComp} />)}




        </div></> : <Spinner />)}

    </>
  )
}

export default MainModule
