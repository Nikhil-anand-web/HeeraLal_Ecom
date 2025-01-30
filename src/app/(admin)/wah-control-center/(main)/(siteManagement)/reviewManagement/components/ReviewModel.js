"use client"
import toggleRevBannerStatus from "@/app/actions/toggleRevBannerStatus";
import toggleRevStatus from "@/app/actions/toggleRevStatus";
import React from "react";
import { toast } from "react-toastify";

const ReviewCard = ({ reviewer, stars, message, date,isActive,showOnBanner,id,setRefetchComp ,productSlug,productName,reviewerMobile,reviewerEmail}) => {
    const onStatusToggle = async ()=>{
        try {
            const res = await toggleRevStatus(id)
            if (!res.success) {
                throw res
                
            }
            setRefetchComp((e)=>!e)
            toast.success(res.message)
        } catch (error) {
            console.log(error)
            toast.warning(error.message)
            
        }
    }
    const onBannerVisToggle = async ()=>{
        try {
            const res = await toggleRevBannerStatus(id)
            if (!res.success) {
                throw res
                
            }
            setRefetchComp((e)=>!e)
            toast.success(res.message)
        } catch (error) {
            console.log(error)
            toast.warning(error.message)
            
        }
    }


    
  return (
    <div style={cardStyles.container}>
      <h3 style={cardStyles.heading}>{reviewer}</h3>
      <p style={cardStyles.stars}>{"⭐".repeat(stars)}</p>
      <p style={cardStyles.message}>Message :- {message}</p>
      <p style={cardStyles.message}>Product slug :- {productSlug}</p>
      <p style={cardStyles.message}>Product Name :- {productName}</p>
      <p style={cardStyles.message}>Customer email :- {reviewerEmail}</p>
      <p style={cardStyles.message}>Customer email :- {reviewerMobile}</p>
      <p style={cardStyles.date}>Reviewed on: {date}</p>
      <div style={cardStyles.buttons}>
       
        {showOnBanner ? (
            <button style={cardStyles.button} onClick={onBannerVisToggle}>
              Hide from banner
            </button>
          ) : (
            <button style={cardStyles.button} onClick={onBannerVisToggle}>
              Show on banner
            </button>
          )}
        {isActive ? (
            <button style={cardStyles.button} onClick={onStatusToggle}>
              Deactivate
            </button>
          ) : (
            <button style={cardStyles.button} onClick={onStatusToggle}>
              Activate
            </button>
          )}
      </div>
    </div>
  );
};

const cardStyles = {
  container: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    margin: "16px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    backgroundColor: "#fff",
  },
  heading: {
    margin: "0 0 8px",
    fontSize: "20px",
    color: "#333",
  },
  stars: {
    margin: "0 0 8px",
    color: "#f5a623",
  },
  message: {
    margin: "0 0 16px",
    fontSize: "16px",
    color: "#555",
  },
  date: {
    margin: "0 0 16px",
    fontSize: "14px",
    color: "#777",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    
  },
  button: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "14px",
    margin:"6px"
  },
};

export default ReviewCard;
