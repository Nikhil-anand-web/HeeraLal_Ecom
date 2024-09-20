import getShipingJWT from "./getShipingJWT";
import axios from "axios";

export default async function getPinCodeDetails(pincode) {
    try {

        const { jwt } = await getShipingJWT()
        const loginId = process.env.SHIPING_LOGIN_ID
        const licence = process.env.SHIPING_LIC

        const baseUrl = process.env.SHIPING_BASE_URL


        const options = {
            method: 'POST',

            url: `${baseUrl}/transportation/finder/v1/GetServicesforPincode`,
            headers: { 'content-type': 'application/json', JWTToken: jwt },
            data: {
                pinCode: pincode,
                profile: { LoginID: loginId, Api_type: 'T', LicenceKey: licence }
            }
        };

        const res = await axios.request(options)







        return {
            success: true,
            message: "f_pincode success",
            data: res.data

        }

    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "f_pincode failde",
            data: null

        }

    }



}