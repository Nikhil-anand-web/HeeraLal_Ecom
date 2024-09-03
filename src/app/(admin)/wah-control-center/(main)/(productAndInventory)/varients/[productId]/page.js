"use client"

import getAllFieldsOfVarientsByProductId from '@/app/actions/getAllFieldsOfVarientsByProductId';
import getProducts from '@/app/actions/getProducts';

import ProductModel from '@/components/adminComp/ProductModel';
import VarientModel from '@/components/adminComp/VarientModel';
import Spinner from '@/components/global/Spinner';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

const page = (props) => {

  const { data: userSession } = useSession();
  const [varient, setvarient] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredvarient, setFilteredvarient] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await getAllFieldsOfVarientsByProductId(props.params.productId)
       
          
     
       
         
        setvarient(response.varient);
        setFilteredvarient(response.varient);

      } catch (error) {

      } finally {
        setIsLoading(false)
      }
    };

    fetchData();
  },[]);
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = varient.filter(cat =>
      cat.slug.toLowerCase().includes(lowercasedQuery) ||
    
      cat.weight.toString().toLowerCase().includes(lowercasedQuery)||
      cat.size.toLowerCase().includes(lowercasedQuery)
    
    );
    
    setFilteredvarient(filtered);
  }, [searchQuery, varient]);


  return (
    <>
      {userSession && userSession.permissions?.length>0&&userSession?.permissions[0].productAndInventory ?
        (!isLoading ? <>
          <h3>
            {varient.length>0 &&`varients of ${varient[0].product.slug}`}
          </h3>

          <div style={{ marginBottom: "5rem" }} className="input-group">

            <span className="input-group-text" id="">Search</span>

            <input value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }} type="text" className="form-control" />
          </div>

          <div className={"hide-scrollbar"} style={{ height: "62vh", overflow: "scroll", width: "100%" }}>
            {filteredvarient.map((varient,index) => <VarientModel setvarient={setvarient} key={index} varient={varient}/>)}




          </div></> : <Spinner />) : <div>access denied</div>}

    </>
  )
}

export default page
