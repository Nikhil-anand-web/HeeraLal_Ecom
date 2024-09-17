"use client"


import getSearchedProduct from '@/app/actions/getSearchedProduct';
import BlogModel from '@/components/adminComp/BlogModel';
import ProductModel from '@/components/adminComp/ProductModel';
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
        const response = await getSearchedBlogs(searchQuery, pageNo, itemsPerPage)

        // setArrayOfProduct(response.products)

        setFilteredBlogs(response.blogs);



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
      <h3>Blogs</h3>
      <div style={{ marginBottom: "5rem" }} className="input-group">

        <span className="input-group-text" id="">Search</span>

        <input value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }} type="text" className="form-control" />
      </div>

      {(!isLoading ? <>




        <div className={"hide-scrollbar"} style={{ height: "63vh", overflow: "scroll", width: "100%" }}>
          {filteredBlogs.map((blog, index) => <BlogModel key={index} blog = {blog} setRefetchComp={setRefetchComp}/>)}




        </div></> : <Spinner />)}

    </>
  )
}

export default MainModule
