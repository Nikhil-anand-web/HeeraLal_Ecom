"use server"
import db from "@/lib/db"



export default async function submitQueryForm({name,email,message}) {




    try {
        if (name === '' || email === ''|| message === '') {
            return {
                success: false,
                message: `please fill all the fields`,
               


            }

        }

        await db.queries.create({
            data:{
                email,
                name,
                message
            }
        })

     
















        return {
            success: true,
            message: `Thanks for your feedback`,
            


        }







    } catch (error) {
        console.log(error)

        return {
            success: false,
            message: error.meta?.cause || "internal server error",

        }

    }
}
