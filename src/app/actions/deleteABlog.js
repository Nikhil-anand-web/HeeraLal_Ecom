"use server"
import fs from 'fs';
import path from 'path';
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { revalidatePath } from 'next/cache'

async function deleteABlog(ids) {

    console.log(ids)
    const user = await getServerSession(authOptions)

    if (user.permissions.at(0)?.complementaryContentManagement) {
        try {

            const delBlog = await db.blog.delete({
                where: {
                    id: ids
                }
            })
            const uploadDirectory = path.join(process.cwd(), 'asset', "blog", `${delBlog.urlSlug}`);
            fs.rm(uploadDirectory, { recursive: true, force: true }, (err) => {
                if (err) {
                    throw err

                }

            })
            console.log(delBlog)
            revalidatePath('/wah-control-center/blogs')

            return {
                success: true,
                message: "Blog deleted Successfully"
            }



        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: error.meta?.cause || "internal server error"
            }

        }


    }

}

export default deleteABlog