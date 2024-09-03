import { NextResponse } from "next/server";
import PaytmChecksum from 'paytmchecksum';
export const config = {
    api: {
        bodyParser: false, // Disable automatic body parsing by Next.js
    },
};

const parseUrlEncodedBody = async (req) => {
    const data = await req.text(); // Read raw body data
    const params = new URLSearchParams(data);
    return Object.fromEntries(params.entries());
  };
export async function POST(req) {
    const reqObj = await parseUrlEncodedBody(req)
    console.log(reqObj)
    // const rawBody = await new Promise((resolve, reject) => {
    //     let data = '';
    //     req.on('data', chunk => {
    //       data += chunk;
    //     });
    //     req.on('end', () => {
    //       resolve(data);
    //     });
    //     req.on('error', err => {
    //       reject(err);
    //     });
    //   });

    // Convert the raw body into an object (form-urlencoded data)
    //   const paytmParams = Object.fromEntries(new URLSearchParams(rawBody));
    //   console.log(paytmParams)
    // const paytmChecksum = req.body.CHECKSUMHASH;
    // const paytmParams = { ...req.body };
    // delete paytmParams.CHECKSUMHASH;

    const isValidChecksum = PaytmChecksum.verifySignature(
        reqObj,
        process.env.PAYTM_MERCHANT_KEY,
        reqObj.CHECKSUMHASH
    );
    console.log(isValidChecksum,"is valid")


    if (isValidChecksum) {
        if (req.body.STATUS === 'TXN_SUCCESS') {
            // Transaction successful
            NextResponse.redirect('/payment/success');
        } else {
            // Transaction failed
            NextResponse.redirect('/payment/failure');
        }

    }
}