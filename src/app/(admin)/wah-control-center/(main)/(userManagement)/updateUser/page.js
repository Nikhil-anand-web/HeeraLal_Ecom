
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import UpdateUserForm from '@/components/adminComp/forms/UpdateUserForm'
import AdminLayout from '@/layouts/AdminLayout'
import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {
  const user = await getServerSession(authOptions)

  const result = await db.$queryRaw`SELECT COLUMN_NAME
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = 'wahEcom'
    AND TABLE_NAME = 'permissions'
    AND DATA_TYPE = 'tinyint';`;
   
  return (
    <>
      <h3 className="page-title"> Update a User </h3>
      {user.permissions[0].userUpdate? <div className={"hide-scrollbar"} style={{height:"90vh",overflow:"scroll",width:"100%"}}><UpdateUserForm permissions={result} /></div>:<div>access denied</div>}

      
    </>
  )
}

export default page
