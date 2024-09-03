
"use client"
import React, { useState } from 'react'



import AdminLayout from '@/layouts/AdminLayout'
import CustomModal from '@/components/global/CustomModal'


const Page = () => {
   const [visible ,setvisible] = useState(true)
  return (
    <AdminLayout>
      
      {/* <CustomModal show={visible} onConform={()=>console.log("hello")} onHide={()=>setvisible(false)} title='test'  subtitle="test"body="test"  /> */}
    </AdminLayout>


  )
}

export default Page
