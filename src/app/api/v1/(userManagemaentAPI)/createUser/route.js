import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
import bcrypt from "bcryptjs"
import db from "@/lib/db";
import inputcleaner from "@/lib/inputcleaner";


export async function POST(req) {

  const user = await getServerSession(authOptions)
  const reqObj = await req.json()


  if (user) {
    if (user.role == 1) {
      // console.log(reqObj)
      try {
        const { fullName, email, userName, password, gender, userUpdate, faqPost, productAndInventory, blog, globalSetting, recipes, profilePic } = reqObj
        
        const permissionObj = {}
        for (const [key, value] of Object.entries(reqObj)) {
          
          if (typeof(value)==='boolean') {
            permissionObj[key] = value
          }
        }
        console.log(permissionObj)
        const clientIp = req.headers['x-forwarded-for']
          ? req.headers['x-forwarded-for'].split(',')[0].trim()
          : req.connection?.remoteAddress || req.socket?.remoteAddress || req.connection?.socket?.remoteAddress || "localhost";


        const encryptedPassWord = await bcrypt.hash(password, 10)
        const reqip = clientIp.split(',')[0].trim();
        const existingUser = await db.admin.findFirst({
          where: {
            OR: [
              { email: email },
              { userName: userName },
            ],
          },
        });
        if (existingUser) {
          return Response.json({
            success: false,
            message: "user already exist",
          }, { status: 400 })

        }
        const newAdmin = await db.admin.create({
          data: {
            fullName,
            userName,
            password: encryptedPassWord,
            profilePic: profilePic !== undefined ? JSON.parse(profilePic) : null,
            role: 2,
            status: 1,
            lastLogin: new Date(),
            lastLoginIp: reqip,
            email,
            gender,
          },
        });
        var newAdminPermissions = null
        console.log(newAdmin)
        if (newAdmin) {
          newAdminPermissions = await db.permissions.create({
            data: {
              adminId: newAdmin.id,
              userUpdate: userUpdate ?? false,
              ...permissionObj
            },
          });

        }
        if (newAdmin && newAdminPermissions) {
          return Response.json({
            success: true,
            message: "User Crested Successfully",
            newUser: {
              ...newAdmin,
              permissions: {
                ...newAdminPermissions
              }

            }
          }, { status: 200 })


        }
        


      } catch (error) {
        console.log(error)
        return Response.json({
          success: false,
          message: error.meta?.cause || "internal server error"
        }, { status: 500 })

      }



    }

  }


  return Response.json({
    success: false,
    message: "Bad Request"
  }, { status: 400 })
}