import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import AddCategoriesForm from '@/components/adminComp/forms/AddCategoriesForm'
import AdminLayout from '@/layouts/AdminLayout'
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
        image:true,
        categoryName:true
        
      },
    
    });
   await categories.forEach(element => {
      element.image = JSON.parse(element.image)

      
    });}
    console.log(user)
     
  return (
   <>
     <h3 className="page-title"> Add a Category </h3>
     {user && user.permissions?.length>0&&user.permissions[0].productAndInventory? <div className={"hide-scrollbar"} style={{height:"90vh",overflow:"scroll",width:"100%"}}><AddCategoriesForm categories={categories}/></div>:<div>access denied</div>}
    
   </>
  )
}

export default page
