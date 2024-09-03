import { authOptions } from '@/app/api/auth/[...nextauth]/options'

import AddCouponForm from '@/components/adminComp/forms/AddCouponForm'





import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {
    const user = await getServerSession(authOptions);

 
     
  return (
   <>
     <h3 className="page-title"> Add a Combo</h3>
     {user && user.permissions?.length>0&&user.permissions[0].offersAndDiscounts? <div className={"hide-scrollbar"} style={{height:"90vh",overflow:"scroll",width:"100%"}}><AddCouponForm /></div>:<div>access denied</div>}
    
   </>
  )
}

export default page
