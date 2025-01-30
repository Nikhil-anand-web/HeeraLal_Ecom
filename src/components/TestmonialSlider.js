import db from "@/lib/db";
import React from "react";


const TestimonialSlider = async () => {
    
//   const testimonials = [
//     {
//       message: "This product is amazing! Highly recommended.",
//       customer: "John Doe",
//       role: "Software Engineer",
//       stars: 5,
//     },
//     {
//       message: "Great value for money. Exceeded my expectations!",
//       customer: "Jane Smith",
//       role: "Marketing Specialist",
//       stars: 4,
//     },
//     {
//       message: "Excellent customer service and quality.",
//       customer: "Chris Lee",
//       role: "Entrepreneur",
//       stars: 5,
//     },
//     {
//       message: "I will definitely buy again. Loved it!",
//       customer: "Sarah White",
//       role: "Designer",
//       stars: 4,
//     },
//   ];

  // Generate star display for a review
  const testimonials = await db.ratingAndReviews.findMany({
    where:{
        isActive:true,
        showOnBanner:true
    },include:{
        customer:{
            select:{
                firstName:true,
                lastName:true
            }
        }
    }
  })
  if (testimonials.length===0) {
    return null
    
  }
  const renderStars = (stars) => {
    return (
      <div>
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            style={{
              color: index < stars ? "#ffc107" : "#e4e5e9",
              fontSize: "1.2rem",
            }}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="container mt-5 mb-4">
      <h2 className="text-center mb-4">What Our Customers Say</h2>
      <div
        id="testimonialCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000" // Auto-scroll every 3 seconds
      >
        <div className="carousel-inner">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div
                className="card mx-auto p-4 shadow"
                style={{
                  maxWidth: "600px",
                  borderRadius: "15px",
                  background: "linear-gradient(to right, #ffffff, #f7f8fc)",
                  border: "none",
                }}
              >
                <div className="card-body text-center">
                  <div
                    style={{
                      fontSize: "3rem",
                      color: "#f7c948",
                      marginBottom: "15px",
                    }}
                  >
                    <i className="bi bi-chat-quote-fill"></i>
                  </div>
                  <p
                    className="card-text text-muted mb-4"
                    style={{
                      fontStyle: "italic",
                      fontSize: "1.1rem",
                      lineHeight: "1.5",
                    }}
                  >
                    "{testimonial.message}"
                  </p>
                  {renderStars(testimonial.stars)}
                  <h5
                    className="card-title mt-3"
                    style={{ fontWeight: "bold", color: "#333" }}
                  >
                    {testimonial.customer.firstName + " " + testimonial.customer.lastName }
                  </h5>
                 
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Beautifully Aligned Navigation Buttons */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#testimonialCarousel"
          data-bs-slide="prev"
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: "-5%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
          }}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#testimonialCarousel"
          data-bs-slide="next"
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            right: "-5%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
          }}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
