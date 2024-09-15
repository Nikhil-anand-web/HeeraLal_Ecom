import { getServerSession } from "next-auth"
import MainModule from "../components/MainModule"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import Pagination from "@/components/Pagination"



const page = async ({ params }) => {
  const user = await getServerSession(authOptions)


  var count =0
  var itemsPerPage = 2
  if (user) {
    if (user.role === 1 || user.role === 2) {

      if (user.permissions[0].productAndInventory) {

        var pageNo = params.slug?.at(params?.slug?.length - 1)
        if (!pageNo || isNaN(pageNo)) {
          pageNo = 1;

        }
        

         count =  await db.product.count({

        })




       









      }



    }

  }


  


  return (
    ( user && user.permissions[0].productAndInventory? <>
     
      <MainModule pageNo={pageNo} itemsPerPage={itemsPerPage}  />
      <Pagination totalItems={count} itemsPerPage={itemsPerPage} currentPage={pageNo} />


    </>:<p>Access Denied</p>)
  )
}

export default page
