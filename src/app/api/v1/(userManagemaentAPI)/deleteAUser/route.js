import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

import db from "@/lib/db";
import inputcleaner from "@/lib/inputcleaner";

export async function POST(req) {
  return Response.json({
    success: false,
    message: "This Api is down"
  }, { status: 500 })

  const user = await getServerSession(authOptions)
  const reqObj = await req.json()
  



  if (user) {
    if (user.role == 1 || user.role == 2) {

      try {
     
        if (user.permissions[0].userUpdate) {
          const deletedAdmin = await db.admin.delete({
            where: {
              id: reqObj.id ,
              AND: [
                { id: reqObj.id },
                { role: { not: 1 } } 
              ],

            },
          });
         

          return Response.json({
            success: true,
            message: "success",
            deletedAdmin
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