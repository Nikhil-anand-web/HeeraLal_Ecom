import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import UpdateVarientForm from '@/components/adminComp/forms/UpdateVarientForm'



import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async ({ params }) => {
  const user = await getServerSession(authOptions);
  var categories = []
  var productSlugs = []
  var reqId = params.id?.at(0)||''

  if (user && user.permissions?.length && user.permissions[0].productAndInventory) {
    categories = await db.category.findMany({
      select: {
        slug: true,
        id: true,
        categoryName: true
      },

    });
    productSlugs = await db.product.findMany({
      select: {
        slug: true,
        id: true

      },

    });
  }
  const reqVar =  await db.varient.findUnique({
    where:{
      id:reqId

    }
  })

  return (
    <>
      <h3 className="page-title"> Add a Product's varient</h3>
      {user && user.permissions?.length && user.permissions[0].productAndInventory ? <div className={"hide-scrollbar"} style={{ height: "90vh", overflow: "scroll", width: "100%" }}><UpdateVarientForm reqVar={reqVar} productSlugs={productSlugs} categories={categories} /></div> : <div>access denied</div>}

    </>
  )
}

export default page
