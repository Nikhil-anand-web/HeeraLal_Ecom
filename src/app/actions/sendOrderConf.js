"use server";

import nodemailer from "nodemailer"; // Use import instead of require for ES modules
import db from "@/lib/db"; // Assuming you have a db module to fetch orders
import calculateFinalPrice from "@/lib/calculateFinalPrice";
import calculateFinalPriceOfComboAndThumbnailArray from "@/lib/calculateFinalPriceOfComboAndThumbnailArray";
import percentOf from "@/lib/percentOf";


export default async function sendOrderConf(order,email) {
    console.log("Sending email...");
    console.log(order)

    
    const getCouponDiscount = () => {
        if (!order.comboMeta.type) {
            return 0

        }
        if (order?.couponMeta?.type === 'absolute') {
            return parseFloat(order?.couponMeta?.discountValue)

        } else if (order?.couponMeta?.type === 'percent') {
            const val = percentOf(order?.subTotal, parseFloat(order?.couponMeta?.discountValue))

            return val


        }
    }
    const add =  await db.staticInfo.findFirst({
        where:{
            key:"companyAddress"
        }
    })
    const companyAddress = {
        value: add.value
    };

    const formattedDate = new Date().toLocaleDateString(); // Adjust date formatting as needed
    const html = `
            <div style="display: flex; justify-content: center; padding: 20px; background-color: #f9f9f9;">
    <div style="flex: 0 0 50%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); padding: 20px;">
        <div style="display: flex; margin-bottom: 20px; justify-content: space-between; align-items: center;">
            <div style="flex: 0 0 auto;">
                <img src="${process.env.SERVER_ADD}/api/v1/asset/banners/root/0.jpeg" width="170" height="70" alt="logo" style="border-radius: 50%;" />
            </div>
            
        </div>
        <div style="margin-bottom: 20px; border-bottom: 2px solid #0da487; padding-bottom: 10px;">
            <div style=${"display: flex; justify-content: space-around;"}>
                <div style="flex: 1; margin-right: 20px;">
                    <ul style="list-style: none; padding: 0; margin: 0; color: #555;">
                        <li>${companyAddress.value[0].area}</li>
                        <li>${companyAddress.value[1].cityAndState}</li>
                        <li>${companyAddress.value[2].country}</li>
                    </ul>
                </div>
                <div style="flex: 0 0 auto; text-align: right; margin-left:20px">
                    <ul style="list-style: none; padding: 0; margin: 0; color: #0da487;">
                        <li>Consumer Name: <strong>${order.CustomerMeta.firstName} ${order.CustomerMeta.lastName}</strong></li>
                        <li>Issue Date: <strong>${formattedDate}</strong></li>
                        <li>Order Id: <strong>${order.orderId || "N/A"}</strong></li>
                    </ul>
                </div>
            </div>
        </div>
        <div>
            <div style="overflow-x: auto; margin-bottom: 20px;">
                <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
                    <thead>
                        <tr style="background-color: #0da487; color: white;">
                            <th style="border: 1px solid #ddd; padding: 10px;">Bank Transaction Id</th>
                            <th style="border: 1px solid #ddd; padding: 10px;">AWB No:</th>
                            <th style="border: 1px solid #ddd; padding: 10px;">Shipping Status:</th>
                            <th style="border: 1px solid #ddd; padding: 10px;">Payment Status:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 10px;">${order.paymentToken?.BANKTXNID || "N/A"}</td>
                            <td style="border: 1px solid #ddd; padding: 10px;">${order.awb || "Not Shipped"}</td>
                            <td style="border: 1px solid #ddd; padding: 10px;">${order.shippingStatus || "N/A"}</td>
                            <td style="border: 1px solid #ddd; padding: 10px;">${order.paymentStatus == 1 ? "Paid" : "Refund Request Raised"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
                    <thead>
                        <tr style="background-color: #0da487; color: white;">
                            <th style="border: 1px solid #ddd; padding: 10px;">No.</th>
                            <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Item Detail</th>
                            <th style="border: 1px solid #ddd; padding: 10px;">Qty</th>
                            <th style="border: 1px solid #ddd; padding: 10px;">Price</th>
                            <th style="border: 1px solid #ddd; padding: 10px;">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.varientMeta.map((obj, index) => `
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 10px;">${index + 1}</td>
                                <td style="border: 1px solid #ddd; padding: 10px;">
                                    <ul style="list-style: none; padding: 0; margin: 0; text-align: left;">
                                        <li>${obj.varient.product.name || "N/A"}</li>
                                        <li style="color: #555;">Weight - ${obj.varient.weight} gm</li>
                                    </ul>
                                </td>
                                <td style="border: 1px solid #ddd; padding: 10px;">${obj.qty}</td>
                                <td style="border: 1px solid #ddd; padding: 10px;">
                                    ${parseFloat(obj.varient.discount) === 0 ? `<div style="font-weight: bold;">₹${obj.varient.mrp}</div>` : `<p style="color: green;">Offer Price ₹${calculateFinalPrice(obj.varient.mrp, obj.varient.discount)}</p><s>MRP ₹${obj.varient.mrp}</s>`}
                                </td>
                                <td style="border: 1px solid #ddd; padding: 10px;"> ₹${calculateFinalPrice(obj.varient.mrp, obj.varient.discount) * obj.qty}</td>
                            </tr>
                        `).join('')}
                        ${order.comboMeta.map((obj, index) => {
                            const { totalMrp, actualPrice } = calculateFinalPriceOfComboAndThumbnailArray(obj.combo);
                            return `
                                <tr>
                                    <td style="border: 1px solid #ddd; padding: 10px;">${index + 1 + order.varientMeta.length}</td>
                                    <td style="border: 1px solid #ddd; padding: 10px;">
                                        <ul style="list-style: none; padding: 0; margin: 0; text-align: left;">
                                            <li>${obj.combo.name || "N/A"}</li>
                                        </ul>
                                    </td>
                                    <td style="border: 1px solid #ddd; padding: 10px;">${obj.qty}</td>
                                    <td style="border: 1px solid #ddd; padding: 10px;">
                                        ${parseFloat(obj.combo.discountInPercent) === 0 ? `<div style="font-weight: bold;">₹${totalMrp}</div>` : `<p style="color: green;">Offer Price ₹${actualPrice}</p><s>MRP ₹${totalMrp}</s>`}
                                    </td>
                                    <td style="border: 1px solid #ddd; padding: 10px;"> ₹${actualPrice * obj.qty}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
            <div style="margin-top: 20px;">
                <ul style="list-style: none; padding: 0; margin: 0; color: #555;">
                    <li>Sub Total:</li>
                    <li style="font-weight: bold; color: #0da487;"> ₹${order.subTotal || "N/A"}</li>
                </ul>
                ${order.couponMeta ? `<ul style="list-style: none; padding: 0; margin: 0; color: #555;"><li>Coupon Discount:</li><li style="font-weight: bold; color: #0da487;"> ₹${getCouponDiscount()}</li></ul>`:""}

                ${order.refralDiscountAbsolute > 0 ? `<ul style="list-style: none; padding: 0; margin: 0; color: #555;"><li>Referral Discount:</li><li style="font-weight: bold; color: #0da487;"> ₹${order.refralDiscountAbsolute}</li></ul>`:""}
                
                <ul style="list-style: none; padding: 0; margin: 0; color: #555;">
                    <li>GST:</li>
                    <li style="font-weight: bold; color: #0da487;"> ₹${order.taxes || "N/A"}% (₹${percentOf((order.subTotal - (order.refralDiscountAbsolute || 0) - (getCouponDiscount() || 0)), order.taxes).toFixed(2) || "N/A"})</li>
                </ul>
                <ul style="list-style: none; padding: 0; margin: 0; color: #555;">
                    <li style="font-size: 20px; font-weight: bold;">Total:</li>
                    <li style="font-size: 20px; font-weight: bold; color: #0da487;"> ₹${order.finalPrice || "N/A"}</li>
                </ul>
            </div>
        </div>
    </div>
</div>



    `;

    try {
        // Create a Nodemailer transporter with SparkPost SMTP details
        const transporter = nodemailer.createTransport({
            host: "smtp.sparkpostmail.com",
            port: 587, // or use 2525 as an alternative
            auth: {
                user: process.env.EMAIL_USERNAME, // your SparkPost SMTP username
                pass: process.env.EMAIL_PASSWORD, // your SparkPost SMTP password
            },
            tls: {
                ciphers: 'SSLv3',
            },
        });

        // Define email options
        const mailOptions = {
            from: '"Heeral wahindia spices" <donotreply@heeralwahindiaspices.com>', // sender address (must be verified in SparkPost)
            to: email, // recipient email

            subject: "Order confirmed", // Subject line
            html, // Use the HTML string created above
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully: ", info);
    } catch (error) {
        console.error("Error sending email: ", error);
    }
}
