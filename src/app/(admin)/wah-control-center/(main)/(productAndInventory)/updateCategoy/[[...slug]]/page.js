import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import UpdateCategoryForm from '@/components/adminComp/forms/UpdateCategoryForm'
import AdminLayout from '@/layouts/AdminLayout'
import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async ({params}) => {
    const user = await getServerSession(authOptions);
    const slug = params.slug
    var categories =[]
  if(user && user.permissions?.length&&user.permissions[0].productAndInventory){ 
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
     
  return (
   <>
     <h3 className="page-title"> Update a Category </h3>
     {user && user.permissions?.length &&user.permissions[0].productAndInventory? <div className={"hide-scrollbar"} style={{height:"90vh",overflow:"scroll",width:"100%"}}><UpdateCategoryForm  categories={categories}/></div>:<div>access denied</div>}
    
   </>
  )
}

export default page
