/**
 * Co-Developed by Raunak Singh, B00831843 | Ammar Khan, B00836303
 */

import React from "react";
import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import "./NavBar.css";
import WheelIcon from "./steering-wheel-512.gif";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const navigate = useNavigate();

  const handleLogout = () => {  
    localStorage.removeItem('userID');
    localStorage.removeItem('loggedUserFullName')
    setIsLoggedIn(false);
    navigate('/login');
  }

  useEffect(() => {
    const userId = localStorage.getItem('userID');
    setIsLoggedIn(!!userId);
  }, []);

  return (
    <nav className="nav-bar">
      <div className="logo">
        <a href="/"><img src={WheelIcon} className="nav-bar-icon" alt="auto care logo" /></a>
      </div>
      <div className="menu-options">
        <ul>
          <a href="/"><li>Home</li></a>
          <a href="/vendors"><li>Vendors</li></a>
          <a href="/review"><li>Reviews</li></a>
          <a href="/blogs"><li>Blogs</li></a>
          <a href="/faq"><li>FAQ</li></a>
          <a href="/contact"><li>Contact Us</li></a>
          {isLoggedIn && <a href="/profile"><li>Profile</li></a>}
          {isLoggedIn && <li onClick={handleLogout}>Logout</li>}
          {!isLoggedIn && <a href="/login"><li>Login</li></a>}
          {!isLoggedIn && <a href="/register"><li>Register</li></a>}
        </ul>
      </div>
    </nav>
  )
}

export default NavBar;