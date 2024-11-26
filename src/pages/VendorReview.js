/**
 * Created & Developed by Raunak Singh, B00831843
 */

import carWashImage1 from "./images/carwash8-unsplash.avif";
import "./css/VendorReview.css";
import Rating from "@mui/material/Rating";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AllVendorReview from "../components/AllVendorReview";
import { useNavigate } from "react-router-dom";

function VendorReview() {
  const [ratingValue, setRatingValue] = useState(3);
  const [reviewHeading, setReviewHeading] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");

  const [vendorName, setVendorName] = useState("");
  const [vendorAddress, setVendorAddress] = useState("");

  const vendorId = localStorage.getItem("selectedVendorId") ?? "";

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://csci-4177-grp-21.onrender.com/vendors/${vendorId}`)
      .then((response) => {
        setVendorName(response.data.vendor_name);
        setVendorAddress(response.data.location);
      })
      .catch((error) => {
        console.error("Error getting reviews:", error);
      });
  }, [vendorId]);

  const handleHeadingChange = (event) => {
    setReviewHeading(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setReviewDescription(event.target.value);
  };

  const handleBackButton = (event) => {
    navigate("/review");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!reviewHeading || !reviewDescription) {
      alert("Please enter both Review Heading and Review Description.");
      return;
    }

    const newReview = {
      vendor_id: vendorId,
      rating: ratingValue,
      heading: reviewHeading,
      description: reviewDescription,
    };
    axios
      .post("https://csci-4177-grp-21.onrender.com/addReview", newReview)
      .then((response) => {
        alert("Review Added Successfully!");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        alert("There was some error, Please try again.");
      });
  };

  return (
    <div className="vendor-review-page">
      <div className="review-vendor-back-button" onClick={handleBackButton}>
        &lt; <u>Back to Vendor Reviews</u>
      </div>
      <div className="vendor-review-grid">
        <div className="vendor-review-page-form">
          <div className="vendor-review-page-form-heading">{vendorName}</div>
          <h5 style={{ fontSize: "18px" }}>{vendorAddress}</h5>

          <hr className="vendor-review-line"></hr>

          <form onSubmit={handleSubmit}>
            <h5 style={{ fontSize: "18px" }}>Select Overall Rating</h5>

            {/* Reference for Star Rating, Material UI: https://mui.com/material-ui/react-rating/ */}
            <Rating
              name="simple-controlled"
              value={ratingValue}
              size="large"
              onChange={(event, newRatingValue) => {
                setRatingValue(newRatingValue);
              }}
            />

            <br></br>

            <h5>ADD A HEADING</h5>
            <input
              type="text"
              placeholder="Review Heading"
              value={reviewHeading}
              onChange={handleHeadingChange}
            />

            <h5>ADD A WRITTEN REVIEW</h5>
            <textarea
              placeholder="Review Description"
              value={reviewDescription}
              onChange={handleDescriptionChange}
            ></textarea>

            <button type="submit">Add Review</button>
          </form>
        </div>

        <div className="vendor-review-page-image">
          <img
            src={carWashImage1}
            alt="black car getting washed"
            className="car-wash-image"
          ></img>
        </div>
      </div>

      <AllVendorReview></AllVendorReview>
    </div>
  );
}

export default VendorReview;
