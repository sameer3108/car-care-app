// Created by Sameer Mohamed
// Welcome/Landing Page

import React from "react";
import mGTR from "./images/car1.jpg";
import bCar from "./images/car3.png";
import "./css/HomePage.css";

export default function HomePage() {
    return (
        <>
            <div className="title"><h1>AutoCare</h1></div>
            <div className="bg-image" style={{ backgroundImage: `url(${bCar})` }}></div>
            <div className="subtitle"><h2>Maintenance Made Manageable, <br /> Services at Your Reach</h2></div>

            <div className="main-content">
                <div className="text-section">
                    <div className="home-content">
                        <p>
                            AutoCare is streamlining vehicle maintenance in Nova Scotia. As we
                            understand the various struggles that come with maintaining a
                            vehicle, we have created a user-friendly platform that allows you to
                            access and book locally-provided car services, while simultaneously
                            managing your vehicle’s maintenance schedule. Keep your vehicle in
                            prime condition with AutoCare.
                        </p>
                        <p>
                            Join us at AutoCare as we make vehicle maintenance stress-free and straightforward. Together, we can
                            ensure that your car remains reliable and safe on the road. Keep your vehicle in prime condition with
                            AutoCare – your partner for smarter, more efficient car care.
                        </p>
                        <div className="button-container">
                            <a href="/register"><button className="join-button">Join Today</button></a>
                        </div>
                    </div>

                </div>
                <div className="bg-image2" style={{ backgroundImage: `url(${mGTR})` }}></div>
            </div>
        </>
    );
}