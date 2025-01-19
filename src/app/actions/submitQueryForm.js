"use server"
import db from "@/lib/db"



export default async function submitQueryForm({name,email,message,mobile,fullAddress}) {




    try {
        if (name === '' || email === ''|| message === '' || mobile==='' ) {
            return {
                success: false,
                message: `please fill all the fields`,
               


            }

        }

        await db.queries.create({
            data:{
                email,
                name,
                message,
                fullAddress,
                mobile
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
