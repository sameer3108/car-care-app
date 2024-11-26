// Yara Ahmed (B00830192) is the author of this page
// Modified by Ammar Khan (B00836303)

import React, { useState} from "react";
import axios from 'axios';
import "./css/RegistrationPage.css";
import logInImage from "./images/login-image.png";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate(email, password);

        if(Object.keys(errors).length === 0) {
            try {
                const response = await axios.post('https://csci-4177-grp-21.onrender.com/login', {
                    email: email,
                    password: password,
                });
                localStorage.setItem('userID', response.data.userID);
                window.location.href = '/profile';
            } catch(error) {
                console.error('Login error: ', error);
            }
        }
        else {
            setFormErrors(errors);
        }
    }
    
    const validate = (email, password) => {
        const errors = {}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;

        
        if (!email) {
            errors.email = "Email is required!";
        } else if (!emailRegex.test(email)) {
            errors.email = "This is an invalid email format!";
        }
        if (!password) {
            errors.password = "Password is required!";
        } else if (!passwordRegex.test(password)) {
            errors.password = "Password must contain at least 1 alphabet, 1 number, 1 special character, and 1 upper case letter.";
        }
        return errors;

    }

    return (
        <section class="sign-in">
            <div class="container">
                <div class="signin-content">
                    <div class="signin-image">
                        <figure><img src={logInImage} alt="blue-vintage-car"/></figure>
                        <a href="/register" class="signup-image-link">Create an account</a>
                    </div>

                    <div class="signin-form">
                        <h2 class="form-title">Log In</h2>
                        <form onSubmit={handleSubmit} method="POST" class="register-form" id="login-form">
                            
                            <div class="form-group">
                                <label for="email"><i class="zmdi zmdi-email"></i></label>
                                <input value={email} type={'text'} onChange={(e) => setEmail(e.target.value)} name="email" id="email" placeholder="Email"/>
                                {formErrors.email && <span className="error">{formErrors.email}</span>}
                            </div>
                            
                            <div class="form-group">
                                <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="your_pass" id="your_pass" placeholder="Password"/>
                                {formErrors.password && <span className="error">{formErrors.password}</span>}
                            </div>
                            
                            <div class="form-group form-button">
                                <input type="submit" name="signin" id="signin" class="form-submit" value="Log in"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>  
        </section>      
    );

};

export default LoginPage;