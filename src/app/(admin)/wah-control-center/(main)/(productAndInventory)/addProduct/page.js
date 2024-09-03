import { authOptions } from '@/app/api/auth/[...nextauth]/options'

import AddProductForm from '@/components/adminComp/forms/AddProductForm'

import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {
    const user = await getServerSession(authOptions);
    var categories =[]
  if(user && user.permissions?.length>0&&user.permissions[0].productAndInventory){ 
      categories = await db.category.findMany({
      select: {
        slug: true,
        id: true,
        categoryName:true
      },
    
    });
  }
    console.log(user)
     
  return (
   <>
     <h3 className="page-title"> Add a Product</h3>
     {user && user.permissions?.length>0&&user.permissions[0].productAndInventory? <div className={"hide-scrollbar"} style={{height:"90vh",overflow:"scroll",width:"100%"}}><AddProductForm categories={categories}/></div>:<div>access denied</div>}
    
   </>
  )
}

export default page
