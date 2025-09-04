import db from '@/lib/db'
import React from 'react'
import MainModule from '../_components/MainModule'

import getPaginationLimit from '@/lib/getPaginationLimit'
import { getServerSession } from 'next-auth'
import Pagination from '@/components/Pagination'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'

const page = async ({ params }) => {
 
    const res = await db.dealerShipForm.findMany()
   console.log(res)
   const user = await getServerSession(authOptions)



   var count = 0
   var itemsPerPage =await getPaginationLimit()
 
 
   var pageNo = params.slugs?.at(params?.slug?.length - 1)
   
   if (!pageNo || isNaN(pageNo)) {
     pageNo = 1;
 
 
   }
 
   count = await db.dealerShipForm.count({
     
   })
    return (

    <div>
      <div style={{ display: "flex", justifyContent: "center" }}> <h2>Dealer Applications</h2></div>
      <h3> Total { count }</h3>
      <MainModule  itemsPerPage={itemsPerPage} pageNo={pageNo}/>
      <Pagination totalItems={count} itemsPerPage={itemsPerPage} currentPage={pageNo} />
    </div>
  )
}

export default page
