import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import MainModule from '../components/MainModule'
import Pagination from '@/components/Pagination'
import getPaginationLimit from '@/lib/getPaginationLimit'

const page = async({params}) => {
    const user = await getServerSession(authOptions)
 

  var count =0
  var itemsPerPage =await getPaginationLimit()
 if (user && user.permissions?.length>0&&user.permissions.at(0)?.complementaryContentManagement) {
    var pageNo = params.slug?.at(params?.slug?.length - 1)
        if (!pageNo || isNaN(pageNo)) {
          pageNo = 1;

        }
        

         count =  await db.blog.count({

        })
  
   

    
 }

  return (
    ( user && user.permissions[0].complementaryContentManagement? <>
    <h3> Total{count}</h3>
     
        <MainModule pageNo={pageNo} itemsPerPage={itemsPerPage}  />
        <Pagination totalItems={count} itemsPerPage={itemsPerPage} currentPage={pageNo} />
  
  
      </>:<p>Access Denied</p>)
   
  )
}

export default page
