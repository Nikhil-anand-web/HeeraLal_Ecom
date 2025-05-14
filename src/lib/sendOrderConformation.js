"use server"

import axios from "axios"

export default async function sendOrderConformation(order, userAccount) {
  console.log("lkdfjofjgjoigvjeoigjoigjtroigtoigj")
  const n = userAccount.mobile.length;
  const mobile = userAccount.mobile.substring(1, n );
  const name = userAccount.firstName;

  const orderId = order.orderId
  const date = new Date(order.createdAt);
  const formatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  const items = order.varientIds.length + order.comboIds.length;
  const price = order.finalPrice;



  const res = await axios.post(' https://backend.aisensy.com/campaign/t1/api/v2', {
    "apiKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTMwZmI5NjJiYTQwNDdjOTM0MWY5OSIsIm5hbWUiOiJDb21wbGV0ZSBTcGljZXMiLCJhcHBOYW1lIjoiQWlTZW5zeSIsImNsaWVudElkIjoiNjJhMzBmODQ0ZGM4YWM0NmY1ZmExMzY4IiwiYWN0aXZlUGxhbiI6IlBST19ZRUFSTFkiLCJpYXQiOjE3NDYxOTk2Nzl9.LHzN2mCbv7dya4Sx6ZG6ZH9RURphFnNr9EIYedoyajE",
    "campaignName": "Order Placed Success",
    "destination": mobile.toString(),
    "userName": "Spices",
    "templateParams": [
      name.toString(),
      orderId.toString(),
      formatted.toString(),
      items.toString(),
      price.toString()
    ],
    "source": "new-landing-page form",
    "media": {},
    "buttons": [],
    "carouselCards": [],
    "location": {},
    "attributes": {},
    "paramsFallbackValue": {
      "FirstName": "user5"
    }
  })

  console.log(res)

}