import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import AddComboForm from '@/components/adminComp/forms/AddComboForm'
import AddVarientForm from '@/components/adminComp/forms/AddVarientForm'



import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {
    const user = await getServerSession(authOptions);
  var varientSlug=[]
  if(user && user.permissions?.length>0&&user.permissions[0].offersAndDiscounts){ 
    varientSlug = await db.varient.findMany({
      select: {
        slug: true,
        id: true,
      },
    
    });
   
  }
   
     
  return (
   <>
     <h3 className="page-title"> Add a Combo</h3>
     {user && user.permissions?.length>0&&user.permissions[0].offersAndDiscounts? <div className={"hide-scrollbar"} style={{height:"90vh",overflow:"scroll",width:"100%"}}><AddComboForm varientSlugs={varientSlug} /></div>:<div>access denied</div>}
    
   </>
  )
}

export default page
