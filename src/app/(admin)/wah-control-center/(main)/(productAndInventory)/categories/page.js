"use client"
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import CategoryModel from '@/components/adminComp/CategoryModel'
import Spinner from '@/components/global/Spinner';
import AdminLayout from '@/layouts/AdminLayout'
import db from '@/lib/db';
import axios from 'axios';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

const page =  () => {
  const [stateRefresherDummyValue,setstateRefresherDummyValue] = useState(true)
  const {data:userSession}= useSession();
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [FilteredCategories, setFilteredCategories] = useState([]);
  const [isLoading ,setIsLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get('/api/v1/getCategories'); // Replace with your API endpoint
        console.log(response)
      
        setCategories(response.data.categories);
        setFilteredCategories(response.data.categories); 

      } catch (error) {
       
      }finally{
        setIsLoading(false)
      }
    };

    fetchData();
  }, [stateRefresherDummyValue]);
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = categories.filter(cat =>
      cat.categoryName.toLowerCase().includes(lowercasedQuery) ||
      cat.slug.toLowerCase().includes(lowercasedQuery)

    );
    setFilteredCategories(filtered);
  }, [searchQuery, categories]);
 
 
  return (
    <>
      {userSession && userSession.permissions?.length>0&&userSession?.permissions[0].productAndInventory ? 
      (!isLoading?<>
      <h3>Categories</h3>

         <div style={{marginBottom:"2rem"}} className="input-group">
       
       <span className="input-group-text" id="">Slug or Name</span>
     
     <input value={searchQuery} onChange={(e)=>{setSearchQuery(e.target.value)}} type="text" className="form-control" />
     </div>
      
      <div className={"hide-scrollbar"} style={{ height: "75vh", overflow: "scroll", width: "100%" }}>
      {FilteredCategories.map((category)=><CategoryModel key={category.id} setstateRefresherDummyValue={setstateRefresherDummyValue} setCategories={setCategories} categoriesList ={category} />)}
        
     
     

      </div></>:<Spinner/> ): <div>access denied</div>}

    </>
  )
}

export default page
