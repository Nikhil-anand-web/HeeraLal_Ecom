import { getServerSession } from "next-auth"
import MainModule from "../components/MainModule"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import Pagination from "@/components/Pagination"
import db from "@/lib/db"
import getPaginationLimit from "@/lib/getPaginationLimit"



const page = async ({ params }) => {
  const user = await getServerSession(authOptions)


  var count =0
  var itemsPerPage = await getPaginationLimit()
  if (user) {
    if (user.role === 1 || user.role === 2) {

      if (user.permissions[0].productAndInventory) {

        var pageNo = params.slug?.at(params?.slug?.length - 1)
        // var catFilterSlug = (params?.slug?.length && params?.slug?.length>0) ? params.slug[params?.slug?.length - 2]:undefined
        var catFilterSlug = !isNaN( params.slug?.at(0))?undefined :params.slug?.at(0)
        console.log(catFilterSlug)
        
        
       
        if (!pageNo || isNaN(pageNo)) {
          pageNo = 1;

        }
        

         count =  await db.product.count({
          where:{
            category:{
              slug:catFilterSlug
            }
          }

        })




       









      }



    }

  }


  


  return (
    ( user && user.permissions[0].productAndInventory? <>
    <h3>Total -{count}</h3>
     
      <MainModule pageNo={pageNo} catFilterSlug={catFilterSlug} itemsPerPage={itemsPerPage}  />
      <Pagination totalItems={count} itemsPerPage={itemsPerPage} currentPage={pageNo} />


    </>:<p>Access Denied</p>)
  )
}

export default page
