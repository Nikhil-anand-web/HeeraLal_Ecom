import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import BannerSettingForm from '@/components/adminComp/forms/BannerSettingForm'
import StaticDataForm from '@/components/adminComp/forms/StaticDataForm'

import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {
    const user = await getServerSession(authOptions);
    
    const statD = await db.staticInfo.findMany({
        distinct: ['key'],
        select: {
            id:true,
            key: true,
        },
      });


     
  return (
   <>
     <h3 className="page-title"> Edit Static Data </h3>
     {user.permissions[0]?.siteManagement? <div className={"hide-scrollbar"} style={{height:"90vh",overflow:"scroll",width:"100%"}}><StaticDataForm statD={statD}/></div>:<div>access denied</div>}
    
   </>
  )
}

export default page
