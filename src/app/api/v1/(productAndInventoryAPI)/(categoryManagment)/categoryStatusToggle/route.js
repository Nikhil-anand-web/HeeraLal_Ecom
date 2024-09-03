import { getServerSession } from "next-auth";
import { authOptions } from "../../../../auth/[...nextauth]/options";

import db from "@/lib/db";

const updateDb = async (id, value, updatedBy) => {
  const updatedCategory = await db.category.update({
    where: {
      id: id,


    },

    data: {
      status: value,
      createdBy: { connect: { id: updatedBy } }
    },
  });
  const childrenCat = await db.category.findUnique({
    where: {
      id: id
    },
    select: {
      children: {
        select: {
          id: true
        }
      }

    }


  })
  childrenCat.children.forEach(async (element) => {
    await updateDb(element.id, value)


  });


}


export async function POST(req) {

  const user = await getServerSession(authOptions)
  const reqObj = await req.json()




  if (user) {
    if (user.role == 1 || user.role == 2) {

      try {

        if (user.permissions[0].productAndInventory) {
          const category = await db.category.findUnique({
            where: { id: reqObj.id },
          });

          if (!category) {
            throw new Error('category not found');
          }


          if (category.status === 1) {


            await updateDb(reqObj.id, 0, user.id)
            
            const products = await db.product.findMany({
              where: {
                categoryId: reqObj.id,
              },
            });
            
            for (const product of products) {
              await db.product.update({
                where: {
                  id: product.id,
                },
                data: {
                  status: false,
                  createdBy: { connect: { id: user.id } },
                },
              });
            }
           
            const varients = await db.varient.findMany({
              where: {
                product: {
                  categoryId: reqObj.id,
                },
              },
            });
            
            for (const varient of varients) {
              await db.varient.update({
                where: {
                  id: varient.id,
                },
                data: {
                  status:false,
                  createdBy: { connect: { id: user.id } },
                },
              });
            }
            
           




            return Response.json({
              success: true,
              message: "success",
              categoryStatus: 0
            }, { status: 200 })

          } else if (category.status === 0) {
            const category = await db.category.findUnique({
              where: { id: reqObj.id },
              include: { parent: true }
            });

            if (category.parent && category.parent.status === 0) {
              return Response.json({
                success: false,
                message: "Parent is deactivated",
                categoryStatus: 0
              }, { status: 400 })

            }

            await updateDb(reqObj.id, 1, user.id)

            return Response.json({
              success: true,
              message: "success",
              categoryStatus: 1
            }, { status: 200 })

          }




        } else {
          return Response.json({
            success: false,
            message: "unAuthorised Request"
          }, { status: 400 })

        }

      } catch (error) {
        console.log(error)

        return Response.json({
          success: false,
          message: error.meta?.cause || "internal server error"
        }, { status: 500 })






      }

    }


    return Response.json({
      success: false,
      message: "Bad Request"
    }, { status: 400 })
  }
}