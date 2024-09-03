// var request = {
//     "order_amount": 1.00,
//     "order_currency": "INR",
//     "order_id": "devstudio_97356397",
//     "customer_details": {
//         "customer_id": "devstudio_user",
//         "customer_phone": "8474090589"
//     },
//     "order_meta": {
//         "return_url": "https://www.cashfree.com/devstudio/preview/pg/web/popupCheckout?order_id={order_id}"
//     }
// };

import { Cashfree } from "cashfree-pg"; 

Cashfree.XClientId = process.env.CASH_FREE_CLIENT_ID
Cashfree.XClientSecret = process.env.CASH_FREE_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;
import { NextResponse } from "next/server";




export async function GET(req) {
    // console.log(cashfree.XClientSecret)
  var request = {
    "order_amount": 1.00,
    "order_currency": "INR",
    "order_id": "devstudio_97356397",
    "customer_details": {
        "customer_id": "devstudio_user",
        "customer_phone": "8474090589"
    }
   }

    try {
        const resOrderObj =  await Cashfree.PGCreateOrder("2023-08-01",request)

      return  NextResponse.json({
            resOrderObj
        })
        
    } catch (error) {
        console.log(error)
       return NextResponse.json({
            success:false
        })
        
    }
};

  
