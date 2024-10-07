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

  if (user) {
    if (user.role === 1 || user.role === 2) {

      if (user.permissions[0].consumerAndOrderManagement) {
        var pageNo = params.slug?.at(params?.slug?.length - 1)
        if (!pageNo || isNaN(pageNo)) {
          pageNo = 1;


        }

        count = await db.cart.count({
          where: {
            OR: [
              {
                cartItem: {
                  some: {}  // This checks if there is at least one item in `cartItem`
                }
              },
              {
                cartComboItems: {
                  some: {}  // This checks if there is at least one item in `cartComboItems`
                }
              }
            ]
          },


        })
















      }



    }

  }





  return (
    (user && user.permissions[0].consumerAndOrderManagement ? <>
     
      <MainModule itemsPerPage={itemsPerPage} pageNo={pageNo} />
      <Pagination totalItems={count} itemsPerPage={itemsPerPage} currentPage={pageNo} />




    </> : <p>Access Denied</p>)
  )
}

export default page