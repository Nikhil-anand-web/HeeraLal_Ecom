import { NextResponse } from 'next/server';
import PaytmChecksum from 'paytmchecksum';
import { v4 as uuidv4 } from 'uuid';
export async function POST(req) {
    const { amount, email, phone } = req.body;

    const paytmParams = {
        MID: process.env.NEXT_PUBLIC_PAYTM_MID,
        ORDER_ID: uuidv4(),
        CUST_ID: "na52m2002@gmail.com",
        INDUSTRY_TYPE_ID: process.env.NEXT_PUBLIC_PAYTM_INDUSTRY_TYPE_ID,
        CHANNEL_ID: process.env.NEXT_PUBLIC_PAYTM_CHANNEL_ID,
        TXN_AMOUNT: "1",
        WEBSITE: process.env.NEXT_PUBLIC_PAYTM_WEBSITE,
        CALLBACK_URL: process.env.NEXT_PUBLIC_PAYTM_CALLBACK_URL,
        MOBILE_NO: "7979864022",
        EMAIL: "na52m2002@gmail.com",
    };
    console.log(paytmParams)

    const paytmChecksum = await PaytmChecksum.generateSignature(
        paytmParams,
        process.env.PAYTM_MERCHANT_KEY
    );

    paytmParams['CHECKSUMHASH'] = paytmChecksum;
 console.log(paytmChecksum)
 

    return NextResponse.json({
        url: `https://${process.env.PAYTM_ENVIRONMENT === 'TEST' ? 'securegw-stage' : 'securegw'}.paytm.in/order/process`,
        params: paytmParams,
    }, { status: 200 })




}