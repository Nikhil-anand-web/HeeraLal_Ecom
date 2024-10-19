"use client"


import getSearchedProduct from '@/app/actions/getSearchedProduct';
import getSearchedVarients from '@/app/actions/getSearchedVarients';
import ProductModel from '@/components/adminComp/ProductModel';
import VarientModel from '@/components/adminComp/VarientModel';
import Spinner from '@/components/global/Spinner';
import debounce from '@/lib/debounce';
import { useRouter } from 'next/navigation';

import React, { useCallback, useEffect, useState } from 'react'

const MainModule = ({ pageNo, itemsPerPage }) => {


  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVarients, setFilteredVarients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refetchComp, setRefetchComp] = useState(false)
  const rtr = useRouter()
  const fetchResults = useCallback(
    debounce(async (searchQuery) => {

      try {
        setIsLoading(true)
        const response = await getSearchedVarients(searchQuery, pageNo, itemsPerPage)

   
        setFilteredVarients(response.varients);



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
      <h3>Varients</h3>
      <div style={{ marginBottom: "2rem" }} className="input-group">

        <span className="input-group-text" id="">Search</span>

        <input value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }} type="text" className="form-control" />
      </div>

      {(!isLoading ? <>




        <div className={"hide-scrollbar"} style={{ height: "63vh", overflow: "scroll", width: "100%" }}>
          {filteredVarients.map((varient, index) => <VarientModel setRefetchComp={setRefetchComp} key={index} varient={varient} />)}




        </div></> : <Spinner />)}

    </>
  )
}

export default MainModule
