"use server"

import db from "@/lib/db"
import getShipmentTransitDetails from "@/lib/getShipmentTransitDetails"



export default async function checkPinCodeAv(dest) {
    const origin = await db.globalSettings.findFirst({
        where:{
            settingName:'originPincode'
        }
    })
    console.log(
    origin
    )
    try {
        const res = await getShipmentTransitDetails(origin.value, dest, Date.now())
         console.log(res)

        return {
            success: true,
            message: "success",
            res
        }

    } catch (error) {
        console.log(error)
        return{
            success: false,
            message: "failed to fetch",

        }

    }





}