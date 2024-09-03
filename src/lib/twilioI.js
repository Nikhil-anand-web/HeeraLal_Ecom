import twilio from 'twilio';
export default async  function twilioI(message,to) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    try {
      const messageResponse = await client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: to,
      });
      console.log(messageResponse)

    } catch (error) {
      console.log(error)
     
    }
  
    
}