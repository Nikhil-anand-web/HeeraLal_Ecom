"use client"


import getSearchedProduct from '@/app/actions/getSearchedProduct';
import ProductModel from '@/components/adminComp/ProductModel';
import Spinner from '@/components/global/Spinner';
import debounce from '@/lib/debounce';
import { useRouter } from 'next/navigation';

import React, { useCallback, useEffect, useState } from 'react'

const MainModule = ({ pageNo, itemsPerPage }) => {


  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refetchComp, setRefetchComp] = useState(false)
  const rtr = useRouter()
  const fetchResults = useCallback(
    debounce(async (searchQuery) => {

      try {
        setIsLoading(true)
        const response = await getSearchedProduct(searchQuery, pageNo, itemsPerPage)

        // setArrayOfProduct(response.products)

        setFilteredProduct(response.products);



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
      <h3>Products</h3>
      <div style={{ marginBottom: "2rem" }} className="input-group">

        <span className="input-group-text" id="">Search</span>

        <input value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }} type="text" className="form-control" />
      </div>

      {(!isLoading ? <>




        <div className={"hide-scrollbar"} style={{ height: "63vh", overflow: "scroll", width: "100%" }}>
          {filteredProduct.map((product, index) => <ProductModel setRefetchComp={setRefetchComp} key={index} product={product} />)}




        </div></> : <Spinner />)}

    </>
  )
}

export default MainModule
