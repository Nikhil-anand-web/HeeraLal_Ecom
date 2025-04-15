"use server"

import db from "@/lib/db"


export default async function getStaticDatabyKey(key){

    try {
        const res  = (await db.staticInfo.findFirst({
            where: {
                key: key
            }
        })).value[0].data
        console.log(res)

        return {
            success:true,
            data:res
        }

        
    } catch (error) {

        return {success:false,data:null,message:"something went wrong"}
        
    }

}