import { getServerSession } from "next-auth"

import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import Pagination from "@/components/Pagination"
import MainModule from "../components/MainModule"
import db from "@/lib/db"
import getPaginationLimit from "@/lib/getPaginationLimit"





const page = async ({ params }) => {
  const user = await getServerSession(authOptions)



  var count = 0
  var itemsPerPage = await getPaginationLimit()


  var pageNo = params.slug?.at(params?.slug?.length - 1)
  if (!pageNo || isNaN(pageNo)) {
    pageNo = 1;


  }

  count = await db.faqs.count({
    where: {
      status:1

    }


  })
























  return (
    (true? <>
    <div style={{display:"flex",justifyContent:"center"}}> <h2>FAQ's</h2></div>
   
       <MainModule itemsPerPage={itemsPerPage} pageNo={pageNo} />
      <Pagination totalItems={count} itemsPerPage={itemsPerPage} currentPage={pageNo} />

   



    </> : <p>Access Denied</p>)
  )
}

export default page
