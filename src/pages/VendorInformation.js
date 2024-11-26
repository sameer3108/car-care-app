// Created by 
// SAMEER MOHAMED, B00845973
// Displays all the servies that vendor provides 

import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './css/VendorInformation.css';

const VendorInformation = () => {
    const [vendorDetails, setVendorDetails] = useState(null);
    const { id } = useParams();
    const [selectedPackage, setSelectedPackage] = useState(null);
    const navigate = useNavigate();

    const placeOrder = async () => {
        if (!selectedPackage) {
            alert("Please select one of the packages to proceed");
            return;
        }
        try {
            await axios.post('https://csci-4177-grp-21.onrender.com/addOrder', { vendor_id: id, package: selectedPackage });
            navigate(`/purchase-order/${id}`);
        } catch (error) {
            console.error("Error placing order:", error);
        }
    };

    useEffect(() => {
        const fetchVendorDetails = async () => {
            try {
                const response = await axios.get(`https://csci-4177-grp-21.onrender.com/vendors/${id}`);
                setVendorDetails(response.data);
            } catch (error) {
                console.error("Error fetching vendor details:", error);
            }
        };

        if (id) {
            fetchVendorDetails();
        }
    }, [id]);


    return (
        <div className="vendor-container">
            <h1 className="vendor-title">Vendor Information</h1>
            <h2 className="vendor-welcome">WELCOME TO</h2>
            {vendorDetails ? (
                <div className="vendor-info">
                    <h1 className="vendor-name">{vendorDetails.vendor_name}</h1>
                    <p className="vendor-description">{vendorDetails.description}</p>
                    <div className="package-container">
                        <label><input type="radio" name="package" value="Basic Package: $50" onChange={() => setSelectedPackage("Basic Package: $50")} />
                        Basic Package: $50</label>
                        <br></br>
                        <label><input type="radio" name="package" value="Standard Package: $100" onChange={() => setSelectedPackage("Standard Package: $100")} />
                        Standard Package: $100</label>
                        <br></br>
                        <label><input type="radio" name="package" value="Premium Package: $150" onChange={() => setSelectedPackage("Premium Package: $150")} />
                        Premium Package: $150</label>

                        <button className="order-button" onClick={placeOrder}>Place Order</button>
                    </div>
                </div>
            ) : (
                <p>Loading vendor information...</p>
            )}
        </div>
    );
};

export default VendorInformation;