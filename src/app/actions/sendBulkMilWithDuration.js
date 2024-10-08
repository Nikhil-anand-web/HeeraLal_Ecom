"use server"


import { getServerSession } from "next-auth";
import getSearchedCarts from "./getSearchedCarts";
import sendBulkMailForCart from "@/lib/sendBulkMailForCart";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { subDays } from 'date-fns';


async function sendBulkMilWithDuration(duration) {




    const user = await getServerSession (authOptions)
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {
                if (user.permissions[0].consumerAndOrderManagement) {
                    const parsedRange = parseInt(duration, 10) || 0;

                    const res = await getSearchedCarts('', 20, 1, subDays(new Date(), parsedRange))
                    if (res.carts.length == 0) {
                        return {
                            success: false,
                            message: "no user present in the range",



                        }

                    }
                    const emailArr = res.carts.map((cart) => {
                        return cart.user.email

                    })

                    sendBulkMailForCart(emailArr)
                    






                    return {
                        success: true,
                        message: "request sent to email server",



                    }








                }

            } catch (error) {
                console.log(error)

                return {
                    success: false,
                    message: error.meta?.cause || "internal server error",

                }

            }

        }

    }


}
export default sendBulkMilWithDuration
