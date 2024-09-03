import PaytmChecksum from 'paytmchecksum';
import axios from 'axios';
export  async function GET() {
   
    /*
    * import checksum generation utility
    * You can get this utility from https://developer.paytm.com/docs/checksum/
    */
  

    const paytmParams = {
        body: {
            "mid": "AZTsos31713848449079",
            "txnType": "REFUND",
            "orderId": "0d4bcadf-1558-43ec-83ce-8537c0cc0b9d",
            "txnId": "20240830210630000036252052520530190",
            "refId": "REFUNDID_988ll69",
            "refundAmount": "1.00",
        }
    };

    try {
        const checksum = await PaytmChecksum.generateSignature(
            JSON.stringify(paytmParams.body),
            process.env.PAYTM_MERCHANT_KEY
        );

        paytmParams.head = {
            "signature": checksum
        };

        const post_data = {
            ...paytmParams
        };

        const options = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await axios.post('https://securegw.paytm.in/refund/apply', post_data, options);
        console.log(response,"res")
        console.log(response.data.body.resultInfo)

    }catch(error){
        console.log(error)

    }


}