"use server"

const nodemailer = require("nodemailer");

export default async function sendEmail() {
    console.log("reci")
    try {
        // Create a Nodemailer transporter with SparkPost SMTP details
        const transporter = nodemailer.createTransport({
            host: 'smtp.sparkpostmail.com',
            port: 587, // or use 2525 as an alternative
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'SMTP_Injection', // your SparkPost SMTP username
                pass: '2fa54083e7eaab4cc76552d4cf85e7bbecb19aef', // your SparkPost SMTP password
            },
            tls: {
                ciphers: 'SSLv3',
            },
        });

        // Define the email options
        const mailOptions = {
            from: '"Nikhil" <donotreply@heeralwahindiaspices.com>', // sender address (must be verified in SparkPost)
            to: "donotreply@heeralwahindiaspices.com", // recipient email
            bcc:"anandnikhil799@gmail.com,na62m2002@gmail.com",
            subject: "test", // Subject line
            html: `
            <div style="text-align: center;">
    <div style="margin-bottom: 20px;">
        <img height="250" style="margin-left: auto; margin-right: auto; border-radius: 109px;" src="https://m.media-amazon.com/images/S/aplus-media-library-service-media/08b7eebd-3b94-4a16-8df7-ed837370f482.__CR0,0,970,600_PT0_SX970_V1___.jpg"/>
    </div>
    <div style="margin-bottom: 30px;">
        <div style="color: #0DA487; font-size: 20px;">
            Oops! Looks like you left something behind:
        </div>
        <div style="color: #0DA487; font-size: 50px;">
            Your Cart is Waiting!
        </div>
    </div>
    <div style="margin-bottom: 20px;">
        <p style="font-size: 16px; color: #828282;">
            Don't miss out on your favorite items. Complete your purchase now and get back to shopping!
        </p>
    </div>
    <div style="margin-bottom: 20px;">
        <a href="${process.env.NEXT_PUBLIC_BASE_URL}/cart" style="background-color: #0DA487; color: white; padding: 10px 20px; text-decoration: none; font-size: 16px; border-radius: 5px;">
            Return to Cart
        </a>
    </div>
    
</div>
`, // HTML body content
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);

    } catch (error) {
        console.error('Error sending email:', error);
    }
}
