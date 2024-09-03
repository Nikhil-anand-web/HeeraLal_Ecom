import { getServerSession } from "next-auth";
import { authOptions } from "../../../../auth/[...nextauth]/options";

import db from "@/lib/db";


export async function DELETE(req) {

  const user = await getServerSession(authOptions)
  const reqObj = await req.json()
 
  



  if (user) {
    if (user.role == 1 || user.role == 2) {

      try {
     
        if (user.permissions[0].productAndInventory) {
          const deletedCat = await db.category.delete({
            where: {
              id: reqObj[0].id ,
              
            },
          });
          const uploadDirectory = path.join(process.cwd(), 'public', 'asset', "categories", `${deletedCat.urlSlug}`);
            fs.rm(uploadDirectory, { recursive: true, force: true }, (err) => {
                if (err) {
                    throw err

                }

            })

          return Response.json({
            success: true,
            message: "success",
            deletedCat
            
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