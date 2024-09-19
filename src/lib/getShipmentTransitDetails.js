import getShipingJWT from "./getShipingJWT";
import axios from "axios";
export default async function getShipmentTransitDetails(pinCodeOrigin, pinCodeDest, pickupdate,productCode='A') {
    try {

        const { jwt } = await getShipingJWT()
        const loginId = process.env.SHIPING_LOGIN_ID
        const licence = process.env.SHIPING_LIC

        const baseUrl = process.env.SHIPING_BASE_URL
        const pickuptm =  await db.globalSettings.findFirst({
            where:{
                settingName:"pickupTiming"
            }
        })
        const str = pickuptm.value.toString()
        const formatedTime = str.slice(0, 2) + ":" + str.slice(2);
        



        const options = {
            method: 'POST',
            url: `${baseUrl}/transportation/transit/v1/GetDomesticTransitTimeForPinCodeandProduct`,
            headers: { 'content-type': 'application/json', JWTToken: jwt },

            data: {
                pPinCodeFrom: pinCodeOrigin.toString(),
                pPinCodeTo: pinCodeDest.toString(),
                pProductCode: productCode.toString(),
                pPudate: `/Date(${pickupdate})/`,
              

                pPickupTime: formatedTime,
                profile: {
                    Api_type: "S",
                    LicenceKey: licence,
                    LoginID: loginId
                }
            }
        };

        const res = await axios.request(options)


        console.log(res.data)


        return {
            success: true,
            message: "f_pincode success",
            data: res.data

        }

    } catch (error) {
        console.log(error)

    }



}