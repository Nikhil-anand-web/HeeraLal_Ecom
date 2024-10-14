import { authOptions } from '@/app/api/auth/[...nextauth]/options'

import FaqsModel from '@/components/adminComp/FaqsModel'
import AdminLayout from '@/layouts/AdminLayout'
import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {
  const user = await getServerSession(authOptions)
  var faqs = []
  if (user.permissions.at(0)?.complementaryContentManagement) {
    const faqList = await db.faqs.findMany({
      select: {
        id: true,
        question: true,
        answer: true,
        status: true


      }
    })
    faqs = faqList
    console.log(faqList)


  }
  return (
    <>
      <h3 className="page-title"> FAQs</h3>
      <div className={"hide-scrollbar"} style={{ height: "85vh", overflow: "scroll", width: "100%" }}>
      {faqs.map((faq, index) => {
        return <FaqsModel key={index} faq={faq} />

      })}
      </div>

    </>
  )
}

export default page
