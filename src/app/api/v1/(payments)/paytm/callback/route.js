import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import updateStockAfterOrder from "@/lib/updateStockAfterOrder";
import { getServerSession } from "next-auth";
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
    // const user = await getServerSession(authOptions)

    const isValidChecksum = PaytmChecksum.verifySignature(
        reqObj,
        process.env.PAYTM_MERCHANT_KEY,
        reqObj.CHECKSUMHASH
    );
    console.log(isValidChecksum, "is valid")
    if (isValidChecksum) {
        const { CURRENCY, RESPMSG, STATUS, TXNAMOUNT, TXNID, CHECKSUMHASH } = reqObj;
        const tokenObj = {
            BANKTXNID: reqObj.BANKTXNID || null, // Assign null if BANKTXNID is undefined
            CURRENCY,
            RESPMSG,
            STATUS,
            TXNAMOUNT,
            TXNID,
            CHECKSUMHASH
        };
        if (tokenObj.STATUS === 'TXN_SUCCESS') {

            //payment status paid ,, payment token, reduce the stock
            const updatedOrder = await db.orders.update({
                where: {
                    orderId: reqObj.ORDERID,



                }, data: {
                    paymentToken: tokenObj,
                    paymentStatus: 1,


                }
            })
            updateStockAfterOrder(updatedOrder.orderId)
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,303);// whenever redirect happens it do the same request 303 is to tell boruser that we have to do a get requst





        } else {
            const updatedOrder = await db.orders.update({
                where: {
                    orderId: reqObj.ORDERID,



                }, data: {
                    paymentToken: tokenObj,



                }
            })
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment/failure`, 303);



        }



    }



}