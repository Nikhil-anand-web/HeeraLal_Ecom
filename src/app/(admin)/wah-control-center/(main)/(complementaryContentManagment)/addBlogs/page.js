import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import AddBlogForm from '@/components/adminComp/forms/AddBlogForm'
import AddCategoriesForm from '@/components/adminComp/forms/AddCategoriesForm'
import AdminLayout from '@/layouts/AdminLayout'
import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {
    const user = await getServerSession(authOptions);
    
 
 

     
  return (
   <>
     <h3 className="page-title"> Add a Blog </h3>
     {user && user.permissions.length>0 &&  user.permissions[0]?.complementaryContentManagment? <div className={"hide-scrollbar"} style={{height:"90vh",overflow:"scroll",width:"100%"}}><AddBlogForm/></div>:<div>access denied</div>}
    
   </>
  )
}

export default page
