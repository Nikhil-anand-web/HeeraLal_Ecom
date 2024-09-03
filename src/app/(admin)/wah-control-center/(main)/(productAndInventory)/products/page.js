"use client"

import getProducts from '@/app/actions/getProducts';

import ProductModel from '@/components/adminComp/ProductModel';
import Spinner from '@/components/global/Spinner';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

const page = () => {

  const { data: userSession } = useSession();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await getProducts()
       
          
       
       
         
        setProducts(response.products);
        setFilteredProduct(response.products);

      } catch (error) {

      } finally {
        setIsLoading(false)
      }
    };

    fetchData();
  },[]);
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = products.filter(cat =>
      cat.name.toLowerCase().includes(lowercasedQuery) ||
      cat.highLights.toLowerCase().includes(lowercasedQuery) ||
      cat.description.toLowerCase().includes(lowercasedQuery)||
      cat.category.slug.toLowerCase().includes(lowercasedQuery)

    );
    
    setFilteredProduct(filtered);
  }, [searchQuery, products]);
  // console.log(filteredProduct)

  return (
    <>
      {userSession && userSession.permissions?.length>0&&userSession?.permissions[0].productAndInventory ?
        (!isLoading ? <>
          <h3>Products</h3>

          <div style={{ marginBottom: "5rem" }} className="input-group">

            <span className="input-group-text" id="">Search</span>

            <input value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }} type="text" className="form-control" />
          </div>

          <div className={"hide-scrollbar"} style={{ height: "68vh", overflow: "scroll", width: "100%" }}>
            {filteredProduct.map((product,index) => <ProductModel setProducts={setProducts} key={index} product={product} />)}




          </div></> : <Spinner />) : <div>access denied</div>}

    </>
  )
}

export default page
