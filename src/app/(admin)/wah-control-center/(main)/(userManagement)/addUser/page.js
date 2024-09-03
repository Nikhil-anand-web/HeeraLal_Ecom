import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import AddUserForm from '@/components/adminComp/forms/AddUserForm'
import AdminLayout from '@/layouts/AdminLayout'
import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import React from 'react'

const page = async() => {
  const user = await getServerSession(authOptions)
  
  const result = await db.$queryRaw`SELECT COLUMN_NAME
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = 'wahEcom'
    AND TABLE_NAME = 'permissions'
    AND DATA_TYPE = 'tinyint';`;
  // console.log(result
  return (
   <>
    <h3 className="page-title"> Create a User </h3>
    {(user.role===1)? <div className={"hide-scrollbar"} style={{height:"90vh",overflow:"scroll",width:"100%"}}>< AddUserForm permissions={result}/></div>:<div>access denied</div>}
   
   </>
  )
}

export default page
