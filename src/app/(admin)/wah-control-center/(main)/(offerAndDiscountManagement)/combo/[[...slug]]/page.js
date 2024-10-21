import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import MainModule from '../components/MainModule'
import Pagination from '@/components/Pagination'
import getPaginationLimit from '@/lib/getPaginationLimit'

const page = async ({ params }) => {
  const user = await getServerSession(authOptions)


  var count = 0
  var itemsPerPage = await getPaginationLimit()
  if (user && user.permissions[0].productAndInventory) {
    var pageNo = params.slug?.at(params?.slug?.length - 1)
    if (!pageNo || isNaN(pageNo)) {
      pageNo = 1;

    }


    count = await db.combo.count({

    })
  




  }
  return (
    (user && user.permissions[0].productAndInventory ? <>
      <h3> Total -{count}</h3>

      <MainModule pageNo={pageNo} itemsPerPage={itemsPerPage} />
      <Pagination totalItems={count} itemsPerPage={itemsPerPage} currentPage={pageNo} />


    </> : <p>Access Denied</p>)

  )
}

export default page
