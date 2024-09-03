import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";

import db from "@/lib/db";


export async function POST(req) {

  const user = await getServerSession(authOptions)
  const reqObj = await req.json()

  


  if (user) {
    if (user.role == 1 || user.role == 2) {

      try {
      
        if (user.permissions[0].userUpdate) {
            const admin = await db.admin.findUnique({
                where: { id: reqObj.id },
              });
          
              if (!admin) {
                throw new Error('Admin not found');
              }
             

              if (admin.status===1) {
                const updatedAdmin = await db.admin.update({
                    where: {
                        id: reqObj.id ,
                        AND: [
                          { id: reqObj.id },
                          { role: { not: 1 } } 
                        ],
          
                      },
                   
                    data: {
                      status: 0,
                    },
                  });
                 

                  return Response.json({
                    success: true,
                    message: "success",
                    userStatus:0
                  }, { status: 200 })
                
              }else if (admin.status===0) {
                const updatedAdmin = await db.admin.update({
                    where: {
                        id: reqObj.id ,
                        AND: [
                          { id: reqObj.id },
                          { role: { not: 1 } } 
                        ],
          
                      },
                   
                    data: {
                      status: 1,
                    },
                  });

                  return Response.json({
                    success: true,
                    message: "success",
                    userStatus:1
                  }, { status: 200 })
                
              }
        

         

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