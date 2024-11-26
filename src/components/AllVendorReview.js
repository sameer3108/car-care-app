/**
 * Created & Developed by Raunak Singh, B00831843
 */

import Rating from "@mui/material/Rating";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllVendorReview.css";

function AllVendorReview() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const vendor_id = localStorage.getItem("selectedVendorId") ?? "";

    axios
      .get(`https://csci-4177-grp-21.onrender.com/review?id=${vendor_id}`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error getting reviews:", error);
      });
  }, []);

  return (
    <div className="all-vendor-review-page">
      <div className="all-vendor-review-page-form-heading">
        All Customer Reviews
      </div>

      {reviews.length === 0 ? (
        <p>No reviews were found for this vendor.</p>
      ) : (
        <div className="review-container">
          {reviews.map((review, index) => (
            <div key={index} className="review-comp">
              <h3>{review.heading}</h3>
              <div className="ind-rating-star ">
                <Rating name="read-only" value={review.rating} readOnly />
              </div>
              <p>{review.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllVendorReview;
