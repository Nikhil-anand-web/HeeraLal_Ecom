import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import AddBlogForm from '@/components/adminComp/forms/AddBlogForm'
import AddCategoriesForm from '@/components/adminComp/forms/AddCategoriesForm'
import BannerSettingForm from '@/components/adminComp/forms/BannerSettingForm'
import SliderSettingForm from '@/components/adminComp/forms/SliderSettingForm'
import AdminLayout from '@/layouts/AdminLayout'
import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {
    const user = await getServerSession(authOptions);
    
    const uniquePageSlugs = await db.slider.findMany({
        distinct: ['pageSlug'],
        select: {
            id:true,
          pageSlug: true,
        },
      });
  console.log(uniquePageSlugs)

     
  return (
   <>
     <h3 className="page-title"> Edit a slider </h3>
     {user.permissions[0]?.siteManagement? <div className={"hide-scrollbar"} ><SliderSettingForm pages={uniquePageSlugs}/></div>:<div>access denied</div>}
    
   </>
  )
}

export default page
