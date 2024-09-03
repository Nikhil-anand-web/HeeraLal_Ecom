"use client"
import { useState } from 'react';

export default function Home() {
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/v1/paytm/initiateTransaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, email, phone }),
    });

    const data = await response.json();
   console.log(data)
    // Create a form dynamically to submit to Paytm
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = data.url;

    for (const key in data.params) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = data.params[key];
      form.appendChild(input);
    }
    console.log(form)
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div>
      <h1>Paytm Payment Gateway Integration</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount:</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
           
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          
          />
        </div>
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
}
