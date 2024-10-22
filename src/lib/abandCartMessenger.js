"use server"
import axios from 'axios';


export default async function abandCartMessenger() {
    const data = {
        apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTMwZmI5NjJiYTQwNDdjOTM0MWY5OSIsIm5hbWUiOiJDb21wbGV0ZSBTcGljZXMiLCJhcHBOYW1lIjoiQWlTZW5zeSIsImNsaWVudElkIjoiNjJhMzBmODQ0ZGM4YWM0NmY1ZmExMzY4IiwiYWN0aXZlUGxhbiI6IkJBU0lDX1RSSUFMIiwiaWF0IjoxNjU1Nzk0MzcwfQ.qUDRbPfr_c73YKuP5dEK_LIJVr8G5aXMAga_DHubp04",
        campaignName: "Abandoned Cart",
        destination: "+917979864022",
        userName: "Complete Spices",
        templateParams: [
            "$FirstName",
            "$FirstName",
            "$FirstName"
        ],
        source: "new-landing-page form",
        media: {},
        buttons: [],
        carouselCards: [],
        location: {},
        paramsFallbackValue: {
            FirstName: "Nikhil"
        }
    };
    axios.post('https://backend.aisensy.com/campaign/t1/api/v2', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log('Success:', response.data);
        })
        .catch(error => {
            console.error('Error:', error.response ? error.response.data : error.message);
        });

}




