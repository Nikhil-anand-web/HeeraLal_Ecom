import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import MainModule from '../components/MainModule'
import Pagination from '@/components/Pagination'

const page = async({params}) => {
    const user = await getServerSession(authOptions)
 

  var count =0
  var itemsPerPage = 2
 if (user && user.permissions?.length>0&&user.permissions.at(0)?.complementaryContentManagment) {
    var pageNo = params.slug?.at(params?.slug?.length - 1)
        if (!pageNo || isNaN(pageNo)) {
          pageNo = 1;

        }
        

         count =  await db.recipe.count({

        })
  
   

    
 }
  return (
    ( user && user.permissions[0].productAndInventory? <>
     
        <MainModule pageNo={pageNo} itemsPerPage={itemsPerPage}  />
        <Pagination totalItems={count} itemsPerPage={itemsPerPage} currentPage={pageNo} />
  
  
      </>:<p>Access Denied</p>)
   
  )
}

export default page
