"use server"

import db from "@/lib/db";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import axios from 'axios';
import { revalidatePath } from 'next/cache';
import getShipingJWT from '@/lib/getShipingJWT';





async function cancilAwb(awb) {
    "use server"

    function validateSlug(value) {

        if (!(/^[a-z][a-zA-Z0-9]*$/.test(value))) {
            return false;
        }
        return true;
    }


    const user = await getServerSession(authOptions)
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {
                if (user.permissions[0].consumerAndOrderManagement) {


                    const res = await getShipingJWT()
                    const url = process.env.SHIPING_BASE_URL


                    const options = {
                      method: 'POST',
                      url: `${url}/transportation/waybill/v1/CancelWaybill`,
                      headers: {'content-type': 'application/json', JWTToken: res.jwt},
                      data: {
                        Request: {AWBNo: awb},
                        Profile: {LoginID: process.env.SHIPING_LOGIN_ID, Api_type: 'S', LicenceKey: process.env.SHIPING_LIC}
                      }
                    };
                    
                   const response = await axios.request(options)

                   console.log(response)
                   const cancledWaybill = response.data.CancelWaybillResult.AWBNo

                   await db.orders.update({
                    where:{
                        awb:cancledWaybill
                    },data:{
                        orderStatus:3,
                        shipingStatus:"cancelled"
                    }
                    
                   })










                    revalidatePath('/wah-control-center/orderDetails/')

                    return {

                        success: true,
                        message: `AWB ${cancilAwb} cancelled`
                    }


                }



            } catch (error) {
                console.log(error)
                console.log(error?.response?.data['error-response'][0]?.Status[0]?.StatusInformation)

                return {
                    success: false,
                    message: error.code === 'P2002' ? "Slug  is already used" : error.meta?.cause || error?.response?.data['error-response'][0]?.Status[0]?.StatusInformation || "internal server error",

                }

            }

        }

    }


}
export default cancilAwb
