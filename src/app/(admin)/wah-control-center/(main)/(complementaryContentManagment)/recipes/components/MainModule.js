"use client"


import getSearchedProduct from '@/app/actions/getSearchedProduct';
import getSearchedRecipe from '@/app/actions/getSearchedRecipe';
import BlogModel from '@/components/adminComp/BlogModel';
import ProductModel from '@/components/adminComp/ProductModel';
import RecipseModel from '@/components/adminComp/RecipseModel';
import getSearchedBlogs from '@/components/getSearchedBlogs';
import Spinner from '@/components/global/Spinner';
import debounce from '@/lib/debounce';
import { useRouter } from 'next/navigation';

import React, { useCallback, useEffect, useState } from 'react'

const MainModule = ({ pageNo, itemsPerPage }) => {


  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refetchComp, setRefetchComp] = useState(false)

  const fetchResults = useCallback(
    debounce(async (searchQuery) => {

      try {
        setIsLoading(true)
        const response = await getSearchedRecipe(searchQuery, pageNo, itemsPerPage)

        // setArrayOfProduct(response.products)

        setFilteredBlogs(response.recipes);



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
      <h3>Recipe</h3>
      <div style={{ marginBottom: "5rem" }} className="input-group">

        <span className="input-group-text" id="">Search</span>

        <input value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }} type="text" className="form-control" />
      </div>

      {(!isLoading ? <>




        <div className={"hide-scrollbar"} >
          {filteredBlogs.map((blog, index) =>  <RecipseModel setRefetchComp={setRefetchComp} key={index} recipe={blog} />)}




        </div></> : <Spinner />)}

    </>
  )
}

export default MainModule
