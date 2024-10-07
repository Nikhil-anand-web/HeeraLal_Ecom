

const nodemailer = require("nodemailer");

export default async function resend(otp, to) {
  try {
    // Create a Nodemailer transporter with SparkPost SMTP details
    const transporter = nodemailer.createTransport({
      host: 'smtp.sparkpostmail.com',
      port: 587, // or use 2525 as an alternative
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USERNAME, // your SparkPost SMTP username
        pass: process.env.EMAIL_PASSWORD, // your SparkPost SMTP password
      },
      tls: {
        ciphers: 'SSLv3',
      },
    });

    // Define the email options
    const mailOptions = {
      from: `"Heeral wahindia spices" <${process.env.EMAIL_ID}>`, // sender address (must be verified in SparkPost)
      to: to, // recipient email
      subject: "Otp for Your Account", // Subject line
      html: `
        <div style="text-align: center;">
            <div style="margin-bottom: 20px;">
                <img height="250" style="margin-left: auto; margin-right: auto; border-radius: 109px;" src="https://m.media-amazon.com/images/S/aplus-media-library-service-media/08b7eebd-3b94-4a16-8df7-ed837370f482.__CR0,0,970,600_PT0_SX970_V1___.jpg"/>
            </div>
            <div style="margin-bottom: 30px;">
                <div style="color: #0DA487; font-size: 20px;">
                   Your OTP for email verification is:
                </div>
                <div style="color: #0DA487; font-size: 50px;">
                   ${otp}
                </div>
            </div>
            <div>
               <ul style="list-style-type: none; padding-left: 0;">
                <li style="font-size: 13px; color: #828282;">
                    Please don't share this OTP with anyone else.
                </li>
               </ul>
            </div>
        </div>`, // HTML body content
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

  } catch (error) {
    console.error('Error sending email:', error);
  }
}