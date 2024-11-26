/**
 * Created & Developed by Raunak Singh, B00831843
 */

import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Reviews.css";

function Reviews() {
    const navigate = useNavigate();

    const userId = localStorage.getItem("userID");

    const [vendors, setVendors] = useState([]);
    const [selectedVendorId, setSelectedVendorId] = useState("");

    useEffect(() => {
        axios
            .get("https://csci-4177-grp-21.onrender.com/vendors")
            .then((response) => {
                setVendors(response.data);
            })
            .catch((error) => {
                console.error("Error getting vendors:", error);
            });
    }, []);

    const handleReviewVendor = () => {
        if (!selectedVendorId) {
            alert(`Please select a Vendor from the dropdown before clicking the "Review Vendor" button.`);
        } else {
            localStorage.setItem('selectedVendorId', selectedVendorId)
            navigate("/reviewVendor");
        }
    };

    const handleClickToLogin = () => {
        navigate("/login");
    };

    return (
        <div className="main-reviews-page">
            <div className="main-review-form-heading">Vendor Reviews</div>

            <div className="main-review-form-subheading">
                Your voice matters! Share your experience by adding a Vendor Review.
            </div>

            {userId ? (
                <div>
                    <div className="main-review-dropdown-desc">
                        Please select a Vendor from the dropdown first.
                    </div>

                    <div className="review-select-vendor-container">
                        <select
                            className="review-select-vendor"
                            value={selectedVendorId}
                            onChange={(event) => setSelectedVendorId(event.target.value)}
                        >
                            <option value="">Select a Vendor</option>
                            {vendors.map((vendor) => (
                                <option key={vendor.vendor_id} value={vendor.vendor_id}>
                                    {vendor.vendor_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button onClick={handleReviewVendor}>Review Vendor</button>
                </div>
            ) : (
                <div className="main-review-login-msg">
                    Please login to your account to submit a Vendor Review.
                    <br></br>
                    <div
                        className="main-review-login-button"
                        onClick={handleClickToLogin}
                    >
                        <i>
                            <u>Click here to Login</u>
                        </i>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Reviews;
