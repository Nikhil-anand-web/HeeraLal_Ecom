import { getServerSession } from "next-auth";
import { authOptions } from "../../../../auth/[...nextauth]/options";

import db from "@/lib/db";
async function findAllDescendants(nodeId) {
  const descendants= [];

  async function fetchChildren(parentId) {
    const children = await db.category.findMany({
      where: { parentId },
    });
    
    for (const child of children) {
      descendants.push(child.id);
      await fetchChildren(child.id); // Recursively fetch children
    }
  }

  await fetchChildren(nodeId);
  return descendants;
}
async function findNonDescendantCategories(nodeId,presentParentId) {
  const descendantIds = await findAllDescendants(nodeId);

  const nonDescendantCategories = await db.category.findMany({
    where: {
      NOT: {
        id: {
          in: [...descendantIds,nodeId,presentParentId],
        },
      },
    },
  });

  return nonDescendantCategories;
}

export async function POST(req) {

  const user = await getServerSession(authOptions)
  
  const reqObj = await req.json()


  


  if (user) {
    if (user.role == 1 || user.role == 2) {

      try {
        
        if (user.permissions[0].productAndInventory) {
            
            const requestedObj = await db.category.findUnique({
              where:{
                id:reqObj.id
              },
              select:{
                parentId: true
              }
            })
            
            var categories=[]
            if (requestedObj?.parentId) {
             categories = await findNonDescendantCategories(reqObj.id,requestedObj.parentId)
              
            }else{
              categories = await db.category.findMany({
                where:{
                  id:{not:reqObj.id}
                }
              })

            }


            
             console.log(categories)

          return Response.json({
            success: true,
            message: "success",
            categories
          }, { status: 200 })

        }else{
          return Response.json({
              success: false,
              message: "unAuthorised Request"
            }, { status: 400 })

      }

      } catch (error) {
        console.log(error)
        
        return Response.json({
          success: false,
          message: error.meta?.cause||"internal server error"
        }, { status: 500 })







      }

    }


    return Response.json({
      success: false,
      message: "Bad Request"
    }, { status: 400 })
  }
}