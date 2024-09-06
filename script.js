
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();
// const bcrypt = require('bcryptjs');
// updateStockAfterOrder
// // const { default: db } = require('./src/lib/db');

const { default: updateStockAfterOrder } = require("./src/lib/updateStockAfterOrder");

// async function main() {
//     // Define the data for the new admin
//     async function main2() {
   
//       const hasedpass = await bcrypt.hash("test", 10)
//       return hasedpass
  
      
//   }
//     const newAdmin = await prisma.admin.create({
//         data: {
//             fullName: 'Nikhil Anand',
//             userName: 'na52m2002',
//             password: await main2(), // Ensure to hash passwords before storing
//             profilePic: JSON.stringify({
//                 url: '/images/userImages/adminImages/superUser/profileImage.png',
//                 alt: 'Profile Picture',
//             }), // Assuming profilePic is a JSON object
//             role: 1, // Example role value
//             status: 1, // Example status value
//             lastLogin: new Date(), // Current date and time
//             lastLoginIp: '127.0.0.1', // Example IP address
//             // blog and globalSettings are assumed to be relations, so you may need to manage these separately
//         },
//     });

//     console.log('New Admin Created:', newAdmin);
// }

// function trimObjectAttributes(obj) {
//     // Helper function to trim strings
//     function trimStrings(value) {
//       if (typeof value === 'string') {
//         return value.trim();
//       }
//       return value;
//     }
  
//     // Iterate over the object keys
//     for (const key in obj) {
//       if (obj.hasOwnProperty(key)) {
//         if (typeof obj[key] === 'object' && obj[key] !== null) {
//           // Recursively trim nested objects
//           trimObjectAttributes(obj[key]);
//         } else {
//           // Trim string values
//           obj[key] = trimStrings(obj[key]);
//         }
//       }
//     }
//   }
//   const obj={
//     a:" dafckdnj skjdncjksdnksj    fvjhsfh",
//     b:[{
//         d:"dajkfcnsdijcndkjn,]    ",
//         c:44

//     }]
//   }


  updateStockAfterOrder('172554216703041569')