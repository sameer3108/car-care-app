// Created by Sameer Mohamed
// Confirms orders and displays past vendor orders, maintains a database for order history

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './css/PurchaseOrder.css';

const PurchaseOrder = () => {
    const { id } = useParams();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`https://csci-4177-grp-21.onrender.com/getOrders/${id}`);
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        fetchOrders();
    }, [id]);

    return (
        <div className="order-container">
            <h1 className="order-title">Thanks for your order!</h1>
            <h2 className="order-subtitle">Our Previous Orders</h2>
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Package</th>
                        <th>Order Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.order_id}>
                            <td>{order.order_id}</td>
                            <td>{order.package}</td>
                            <td>{new Date(order.order_date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PurchaseOrder;

