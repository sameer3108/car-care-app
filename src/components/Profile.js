// Ammar Khan (B00836303) is the author of this page

import React from 'react';
import {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import './Profile.css';
import axios from 'axios';
import {Helmet} from 'react-helmet';
import HondaCivic from '../pages/images/2014-mercedes-benz-s-class.jpg';
import MercedesBenzS from '../pages/images/2014-mercedes-benz-s-class.jpg';
import MercedesBenzE from '../pages/images/2019-mercedes-benz-e-class-coupe.jpg';

const vehicleImages = [HondaCivic, MercedesBenzS, MercedesBenzE];

function Profile() {
    const [firstName, setFirstName] = useState('...');
    const [lastName, setLastName] = useState('...');
    const [email, setEmail] = useState('...');
    const [address, setAddress] = useState('...');
    const [dateJoined, setDateJoined] = useState('...');
    const [editFirstName, setEditFirstName] = useState('...');
    const [editLastName, setEditLastName] = useState('...');
    const [editEmail, setEditEmail] = useState('...');
    const [editAddress, setEditAddress] = useState('...');
    const [edit, setEdit] = useState(false);
    const [vehicles, setVehicles] = useState([]);
    const [editVehicles, setEditVehicles] = useState(false);
    const [vehicleMake, setVehicleMake] = useState('');
    const [vehicleModel, setVehicleModel] = useState('');

    const userId = localStorage.getItem('userID');

    useEffect(() => {
        axios.get(`https://csci-4177-grp-21.onrender.com/user?id=${userId}`)
            .then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setAddress(response.data.address);
                setDateJoined(response.data.dateJoined);
                setEditFirstName(response.data.firstName);
                setEditLastName(response.data.lastName);
                setEditEmail(response.data.email);
                setEditAddress(response.data.address);
                localStorage.setItem('loggedUserFullName', `${response.data.firstName} ${response.data.lastName}`)
            })
            .catch((error) => {
                console.log(`Error: ${error}`);
            })

        axios.get(`https://csci-4177-grp-21.onrender.com/vehicles?id=${userId}`)
            .then((response) => {
                const vehicleImage = response.data.map(vehicle => {
                    return {
                        ...vehicle,
                        image: vehicleImages[Math.floor(Math.random() * vehicleImages.length)]
                    };
                })
                setVehicles(vehicleImage);
            })
            .catch((error) => {
                console.log(`Error: ${error}`);
            })
    }, [userId]);

    const handleLogout = () => {
        localStorage.removeItem('userID');
        window.location.href = '/login';
    }

    const formatDate = (dateString) => {
        // Reference for `toLocaleDateString`, URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: "UTC",
        };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
      };

    const editForm = () => {
        const editUser = {
            firstName: editFirstName,
            lastName: editLastName,
            email: editEmail,
            address: editAddress
        };
        axios.post(`https://csci-4177-grp-21.onrender.com/userUpdate?id=${userId}`, editUser)
            .then(() => {
                setFirstName(editFirstName);
                setLastName(editLastName);
                setEmail(editEmail);
                setAddress(editAddress);
                setEdit(false);
            });
    };

    const editVehicleButton = () => {
        setEditVehicles(v => !v);
    }

    const editVehicleForm = () => {
        const editVehicle = {
            UserID: userId,
            Make: vehicleMake,
            Model: vehicleModel
        };
        axios.post(`https://csci-4177-grp-21.onrender.com/addVehicle`, editVehicle)
            .then(() => {
                setVehicles(v => [...v, editVehicle]);
                setVehicleMake('');
                setVehicleModel('');
                editVehicleButton();
            });
    };

    const deleteVehicleButton = (VehicleID) => {
        axios.delete(`https://csci-4177-grp-21.onrender.com/deleteVehicle?VehicleID=${VehicleID}`)
            .then(() => {
                setVehicles(v => v.filter(vehicle => vehicle.VehicleID !== VehicleID));
            });
    }

    return (
        <div className='container'>
            <Helmet>
                <style>{'body { background-color: #F5F5F5; }'}</style>
            </Helmet>
            <h1>Profile</h1>
            {
                userId === null ?
                <div>
                    <h3>You are not logged in. Log in <Link to="/login" style={{color: '#0066B3', textDecoration: 'underline'}}>here</Link>.</h3>
                </div>
                :
                <div>
                <h3>Hello there!</h3>
                <div className='grid'>
                    <div>
                        <h2>You</h2>
                        <img src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png" alt="Profile" className="profile-image"></img>
                        {
                            edit
                                ? <div>
                                    First Name: <input value={editFirstName} onChange={e => setEditFirstName(e.target.value)} />
                                    <br/>Last Name: <input value={editLastName} onChange={e => setEditLastName(e.target.value)} />
                                    <br/>Email: <input value={editEmail} onChange={e => setEditEmail(e.target.value)} />
                                    <br/>Address: <input value={editAddress} onChange={e => setEditAddress(e.target.value)} placeholder="Please enter your email." required />
                                    <br/><button onClick={editForm} disabled={!editEmail || !editFirstName}>Save Changes</button>
                                </div>
                        : <h3>{firstName} {lastName}</h3>
                        }
                        <br/><button onClick={() => setEdit(!edit)}>{edit ? 'Cancel' : 'Edit Profile'}</button>
                        <br/><button onClick={handleLogout}>Logout</button>
                    </div>
                    <div>
                        <h2>Details</h2>
                        <p><strong-1>Email:</strong-1> {email}</p>
                        <p><strong-1>Address:</strong-1> {address}</p>
                        <p><strong-1>Date Joined:</strong-1> {formatDate(dateJoined)}</p>
                    </div>
                    <div>
                        <h2>Vehicles</h2>
                        {
                            vehicles.map(vehicle => {
                                return (
                                    <div key={vehicle.VehicleID}>
                                        <img src={vehicle.image} alt="Vehicle" className="vehicle-image"></img>
                                        <h4>{vehicle.Make} - {vehicle.Model}</h4>
                                        <button onClick={() => deleteVehicleButton(vehicle.VehicleID)}>Delete Vehicle</button>
                                    </div>
                                )
                            })
                        }
                        {
                            editVehicles
                                ? <div>
                                    Make: <input value={vehicleMake} onChange={e => setVehicleMake(e.target.value)} placeholder="Enter the vehicle make." />
                                    <br/>Model: <input value={vehicleModel} onChange={e => setVehicleModel(e.target.value)} placeholder="Enter the vehicle model." />
                                    <br/><button onClick={editVehicleForm} disabled={!vehicleMake || !vehicleModel}>Save Vehicle</button>
                                    <br/><button onClick={editVehicleButton}>Cancel</button>
                                </div>
                        : <button onClick={editVehicleButton}>Add Vehicle(s)</button>
                        }
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default Profile;
