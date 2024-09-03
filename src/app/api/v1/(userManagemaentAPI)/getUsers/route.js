import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";

import db from "@/lib/db";

export async function GET(req) {

  const user = await getServerSession(authOptions)




  if (user) {
    if (user.role == 1 || user.role == 2) {

      try {
        
        if (user.permissions[0].userUpdate) {
          const users = await db.admin.findMany({
            select: {
              fullName: true,
              id: true,
              userName: true,
              email: true,
              status: true
            }
          });//if user increase here we can optimise

          return Response.json({
            success: true,
            message: "success",
            users
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