import axios from 'axios';

export default async function messageOtp(otp, to, firstName) {
  const accountUsername = process.env.SMS_USERNAME;
  const accountPassword = process.env.SMS_PASSWORD;

  const message = encodeURIComponent(`Hi ${firstName+"4"}, Here's your one-time password ${otp}: Enter it to complete your purchase and spice up your cooking! Keep this OTP confidential and do not share it with anyone. Thank you, Heeral Wah India Spices Team`);
  
  const url = `https://sms.dappify.tech/api.php?username=${accountUsername}&password=${accountPassword}&route=1&sender=WAHIND&mobile[]=${to}&message[]=${message}&te_id=1307172554028046531`;

  try {
    const messageResponse = await axios.post(url, {
      withCredentials: true, // Ensures credentials (cookies, etc.) are sent with the request
    });
    console.log('SMS Sent Successfully:', messageResponse.data);
    return messageResponse.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status outside the 2xx range
      console.error('Error Response Data:', error.response.data);
      console.error('Error Status:', error.response.status);
      console.error('Error Headers:', error.response.headers);
    } else if (error.request) {
      // Request was made but no response received
      console.error('No Response:', error.request);
    } else {
      // Error setting up the request
      console.error('Request Setup Error:', error.message);
    }
  }
}
