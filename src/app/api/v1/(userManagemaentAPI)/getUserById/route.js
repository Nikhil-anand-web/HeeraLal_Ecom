import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";

import db from "@/lib/db";

export async function POST(req) {

  const user = await getServerSession(authOptions)




  if (user) {
    if (user.role == 1 || user.role == 2) {

      try {
        
        if (user.permissions[0].userUpdate) {
          const users = await db.admin.findUnique({
            where: { id: req.id},
            select: {
              fullName: true,
              userName: true,
              email: true,
              status: true,
              gender:true,
              lastLogin:true,
              lastLoginIp:true,
              role:true,
              createdAt:true,
              updatedAt:true
            }
          });

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