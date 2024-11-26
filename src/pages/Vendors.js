// Created by
// SAMEER MOHAMED, B00845973
// Co-Authored: Raunak Singh, B00831843

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./css/vendor.css";
import orangeCar from "./images/carwash4-unsplash.jpg";
import redCar from "./images/carwash6-unsplash.jpg";
import blackPorsche from "./images/carwash7-unsplash.jpg";
import washingPorche from "./images/car1.jpg";
import blackBMW from "./images/car3.png";
import soapCar from "./images/car4.jpg";

const Vendor = () => {
    const [vendors, setVendors] = useState([]);
    const [shuffledImages, setShuffledImages] = useState([]);

    const loggedUserId = localStorage.getItem("userID");

    useEffect(() => {
        fetchVendors();
    }, []);

    useEffect(() => {
        setShuffledImages(
            shuffleArray([
                blackBMW,
                orangeCar,
                soapCar,
                redCar,
                washingPorche,
                blackPorsche,
            ])
        );
    }, []);

    const fetchVendors = () => {
        axios
            .get("https://csci-4177-grp-21.onrender.com/vendors")
            .then((response) => setVendors(response.data))
            .catch((error) => console.error("Error fetching vendors:", error));
    };

    const shuffleArray = (array) => {
        let currentIndex = array.length,
            randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }
        return array;
    };

    const handleVendorClick = (vendorId) => {
        if (loggedUserId !== null) {
            sessionStorage.setItem("selectedVendorId", vendorId);
        } else {
            alert(
                "Please log in with your registered account before accessing Vendor service booking."
            );
        }
    };

    return (
        <div className="vendor-container">
            <div className="vendors-list-heading">Vendors List</div>

            <div className="vendors-list-subheading">
                All available vendors to book a service from.
            </div>

            {vendors.map((vendor, index) => (
                <Link
                    key={vendor.vendor_id}
                    to={
                        localStorage.getItem("userID")
                            ? `/vendors/${vendor.vendor_id}`
                            : "#"
                    }
                    onClick={() => handleVendorClick(vendor.vendor_id)}
                >
                    <div className="vendor-card">
                        <img
                            src={shuffledImages[index % shuffledImages.length]}
                            alt={vendor.vendor_name}
                            className="vendor-image"
                        />
                        <h2 className="vendor-name">{vendor.vendor_name}</h2>
                        <p className="vendor-description">{vendor.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Vendor;
