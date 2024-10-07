"use server"

import db from "@/lib/db";

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import getShipingJWT from "@/lib/getShipingJWT";
import axios from "axios";


async function getAwbStatus(awb) {





    const user = await getServerSession(authOptions)
    if (user) {
        if (user.role === 1 || user.role === 2) {
            try {

               
                
                const options = {
                    method: 'GET',
                    url: 'https://api-test.dhl.com/track/shipments',
                    params: {trackingNumber: awb},
                    headers: {'DHL-API-Key': process.env.SHIPING_LIC}
                  };
                  
                  axios.request(options).then(function (response) {
                      console.log(response.data);
                  }).catch(function (error) {
                      console.error(error);
                  });





                return {
                    success: true,
                    message: "fetched success",
                    data:null


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
export default getAwbStatus
