"use client"
import React, { useState } from "react";

const ReviewList = ({ reviews }) => {
  const [filterStars, setFilterStars] = useState(0); // 0 means no filter
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3; // Number of reviews per page

  // Filter reviews based on the selected number of stars
  const filteredReviews = filterStars
    ? reviews.filter((review) => review.stars === filterStars)
    : reviews;

  // Calculate pagination details
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const paginatedReviews = filteredReviews.slice(
    startIndex,
    startIndex + reviewsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate star display for a review
  const renderStars = (stars) => {
    return (
      <>
        {[...Array(5)].map((_, index) => (
          <span key={index} style={{ color: index < stars ? "#ffc107" : "#e4e5e9" }}>
            ★
          </span>
        ))}
      </>
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Customer Reviews</h2>

      {/* Filter Section */}
      <div className="mb-3">
        <h5>Filter by Stars:</h5>
        <div className="d-flex">
          {[...Array(5)].map((_, index) => (
            <button
              key={index}
              className={`btn me-2 ${
                filterStars === index + 1 ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => {
                setFilterStars(index + 1);
                setCurrentPage(1); // Reset to first page after filtering
              }}
            >
              {index + 1} Star{index > 0 ? "s" : ""}
            </button>
          ))}
          <button
            className="btn btn-outline-secondary"
            onClick={() => {
              setFilterStars(0);
              setCurrentPage(1); // Reset to first page after clearing filter
            }}
          >
            All
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div>
        {paginatedReviews.length > 0 ? (
          paginatedReviews.map((review, index) => (
            <div key={index} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{renderStars(review.stars)}</h5>
                <p className="card-text">{review.message}</p>
                <p className="text-muted">{`Reviewed by: ${review.customer.firstName + " " + review.customer.lastName }`}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No reviews available for this filter.</p>
        )}
      </div>

      {/* Pagination Section */}
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-outline-primary me-2"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`btn me-2 ${
              currentPage === index + 1 ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="btn btn-outline-primary"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReviewList;
