import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

import db from "@/lib/db";
import bcryptjs from "bcryptjs";


export async function POST(req) {

  const user = await getServerSession(authOptions)
  const reqObj = await req.json()
 
  

  if (user) {
    if (user.role == 1 || user.role == 2) {

      try {
      
        if (user.permissions[0].userUpdate) {
          const permissionObj = {}
          for (const [key, value] of Object.entries(reqObj)) {
            
            if (typeof(value)==='boolean') {
              permissionObj[key] = value
            }
          }
            const updateData ={}
            if (reqObj.fullName) {
                updateData.fullName = reqObj.fullName
                
            }
            if (reqObj.email) {
                updateData.email = reqObj.email
                
            }
            if (reqObj.password) {
              const hasedpass = await bcryptjs.hash(reqObj.password, 10)

                updateData.password = hasedpass
                
            }
            if (reqObj.userName) {
                updateData.userName = reqObj.userName
                
            }
            if (reqObj.gender) {
                updateData.gender = reqObj.gender
                
            }
            const admin = await db.admin.findFirst({
              where: {
              
                OR: [
                  { email: reqObj.identifire },
                  { userName:reqObj.identifire} 
                ],
              },
              select: {
                id: true 
              }
            });
            
            
            if (!admin) {
              throw new Error('Admin not found');
            }
          
         

           
            const updatedAdmin = await db.admin.update({
                where: {
                    id: admin.id ,
                    AND: [
                      { id: admin.id },
                      { role: { not: 1 } } 
                    ],
      
                  },
               
                data: {
                  ...updateData,

                permissions: {
                  update: {
                    where: {
                      adminId: admin.id
                    },
                    data: {
                      ...permissionObj
                    }
                  }
                }
              }
              });
              return Response.json({
                success: true,
                message: "updated successfully",
                updatedAdmin

              }, { status: 200 })

            
        

         

        }

      } catch (error) {
        
        
        
        return Response.json({
          success: false,
          message:error.code==='P2002'?"Either username or email is already used": error.meta?.cause||"internal server error",
         
        }, { status: 500 })






      }

    }


    return Response.json({
      success: false,
      message: "Bad Request"
    }, { status: 400 })
  }
}