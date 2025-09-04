"use server"

import db from "@/lib/db";


async function createDealershipEnquery(formData) {
    try {

       const res = await db.dealerShipForm.create({data:{...formData,age:parseFloat(formData.age),hasManpower: formData.hasManpower==="true"?true:false }})
       console.log(res,"success")

        return {
            message: "Your request has been submited",
            success: true
        }

    } catch (error) {
console.log(error)
        return {
            success: false,
            message: "Internal server error"
        }

    }










}
export default createDealershipEnquery
