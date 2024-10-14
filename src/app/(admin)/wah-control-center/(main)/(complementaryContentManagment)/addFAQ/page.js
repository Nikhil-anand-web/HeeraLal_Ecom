import { authOptions } from '@/app/api/auth/[...nextauth]/options'

import AddFAQForm from '@/components/adminComp/forms/AddFAQForm'

import AdminLayout from '@/layouts/AdminLayout'
import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {
    const user = await getServerSession(authOptions);
    
 
 

     
  return (
   <>
     <h3 className="page-title"> Add a FAQ </h3>
     {user && user.permissions.length>0 &&user.permissions.at(0)?.complementaryContentManagement? <div className={"hide-scrollbar"} style={{height:"90vh",overflow:"scroll",width:"100%"}}><AddFAQForm/></div>:<div>access denied</div>}
    
   </>
  )
}

export default page
