import { getServerSession } from "next-auth"

import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import Pagination from "@/components/Pagination"
import MainModule from "../components/MainModule"
import db from "@/lib/db"





const page = async ({ params }) => {
  const user = await getServerSession(authOptions)


 
  var count = 0
  var itemsPerPage = 1
  
  if (user) {
    if (user.role === 1 || user.role === 2) {

      if (user.permissions[0].consumerAndOrderManagement) {
        var pageNo = params.slug?.at(params?.slug?.length - 1)
        if (!pageNo || isNaN(pageNo)) {
          pageNo = 1;
          

        }

        count = await db.user.count({


        })
       















      }



    }

  }

 



  return (
    (user && user.permissions[0].consumerAndOrderManagement ? <>
      <Pagination totalItems={count} itemsPerPage={itemsPerPage} currentPage={pageNo} />

      <MainModule itemsPerPage={itemsPerPage} pageNo={pageNo} />



    </> : <p>Access Denied</p>)
  )
}

export default page
