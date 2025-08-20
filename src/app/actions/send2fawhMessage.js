"use server"

import axios from "axios"


export default async function send2fawhMessage(otp,phone) {
    

    try {
        const res = axios.post('https://backend.aisensy.com/campaign/t1/api/v2', {
            "apiKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTMwZmI5NjJiYTQwNDdjOTM0MWY5OSIsIm5hbWUiOiJDb21wbGV0ZSBTcGljZXMiLCJhcHBOYW1lIjoiQWlTZW5zeSIsImNsaWVudElkIjoiNjJhMzBmODQ0ZGM4YWM0NmY1ZmExMzY4IiwiYWN0aXZlUGxhbiI6IlBST19ZRUFSTFkiLCJpYXQiOjE3NDYxOTk2Nzl9.LHzN2mCbv7dya4Sx6ZG6ZH9RURphFnNr9EIYedoyajE",
            "campaignName": "ADMIN_OTP",
            "destination": phone,
            "userName": "",
            "templateParams": [
                otp
            ],
            "source": "new-landing-page form",
            "media": {},
            "buttons": [
                {
                    "type": "button",
                    "sub_type": "url",
                    "index": 0,
                    "parameters": [
                        {
                            "type": "text",
                            "text": "TESTCODE20"
                        }
                    ]
                }
            ],
            "carouselCards": [],
            "location": {},
            "attributes": {},
            "paramsFallbackValue": {
                "FirstName": "user"
            }
        })
        console.log(res)

    } catch (error) {
        console.log(error)

    }



}