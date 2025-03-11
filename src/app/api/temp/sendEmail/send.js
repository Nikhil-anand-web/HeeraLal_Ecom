"use server";

import nodemailer from "nodemailer"; // Use import instead of require for ES modules



export default async function sendEmail({body ,to , bcc,subject,fromName}) {
    
    
    
    try {
        // Create a Nodemailer transporter with SparkPost SMTP details
        const transporter = nodemailer.createTransport({
            host: "smtp.sparkpostmail.com",
            port: 587, // or use 2525 as an alternative
            auth: {
                user: process.env.EMAIL_USERNAME_TEMP, // your SparkPost SMTP username
                pass: process.env.EMAIL_PASSWORD_TEMP, // your SparkPost SMTP password
            },
            tls: {
                ciphers: 'SSLv3',
            },
        });

        // Define email options
        const mailOptions = {
            from: `"${fromName}" <noreply@copper11.com>`, // Sender address
            to: to, // Primary recipient
            bcc: bcc.join(','), // BCC recipients
            subject: subject, // Subject line
            html:body, // HTML body content
        };
        

        // Send email
        const info = await transporter.sendMail(mailOptions);
        return info
    } catch (error) {
       throw error
    }
}
