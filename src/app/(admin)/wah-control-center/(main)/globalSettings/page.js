import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import SettingModal from '@/components/adminComp/SettingModal'



import AdminLayout from '@/layouts/AdminLayout'
import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {
    const user = await getServerSession(authOptions);
    var settings = []
    if (user.permissions.at(0)?.globalSetting) {
        const settingsList  =  await db.globalSettings.findMany({
            select:{
                id:true,
                settingName:true,
                value:true,
                dependency:true,
                updatedBy:{
                    select:{
                        userName:true
                    }
                },
                updatedAt:true
            }
        })
        settings = settingsList
        
    }
    
   
 
  console.log(settings)
     
  return (
   <>
     <h3 style={{marginBottom:"40px" ,overflow:"hidden"}} className="page-title">Global Setting</h3>

     {user.permissions.at(0)?.globalSetting? <div className={"hide-scrollbar"} style={{height:"90vh",overflow:"scroll",width:"100%"}}>

        {settings.map((setting,index)=>{
          return  <SettingModal key= {index} setting = {setting}/>

        })}
     </div>:<div>access denied</div>}
    
   </>
  )
}

export default page
