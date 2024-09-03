import React, { useState } from 'react';
import axios from 'axios';

const PaytmPayment = () => {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);

        const paymentData = {
            amount: '100.00', // example amount
            customerId: 'CUST_001',
            email: 'customer@example.com',
            phone: '1234567890'
        };

        try {
            const { data: paytmParams } = await axios.post('/api/paytm/initiateTransaction', paymentData);

            // Redirect to Paytm
            const form = document.createElement('form');
            form.setAttribute('method', 'post');
            form.setAttribute('action', 'https://securegw-stage.paytm.in/theia/processTransaction');

            Object.keys(paytmParams).forEach(key => {
                const input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', key);
                input.setAttribute('value', paytmParams[key]);
                form.appendChild(input);
            });

            document.body.appendChild(form);
            form.submit();
        } catch (error) {
            console.error('Payment initiation failed:', error);
        }

        setLoading(false);
    };

    return (
        <div>
            <button onClick={handlePayment} disabled={loading}>
                {loading ? 'Processing...' : 'Pay Now'}
            </button>
        </div>
    );
};

export default PaytmPayment;
