import { useFormik } from 'formik'
import React, { useState } from 'react'
import axios from 'axios'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    const [isloading, setisloading] = useState('')

    const login = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values) => {
            try {
                setisloading(true); 
                console.log(values);

                const response = await axios.post('http://localhost:5000/user/login', values);

                if (response?.data?.status) {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("id", response.data.id);

                   
                    setTimeout(() => {
                        navigate(`/dashboard/${response.data.id}`);
                        setisloading(false);
                    }, 1000);
                } else {
                    console.log("Login failed. Try again.");
                    setisloading(false);
                }
            } catch (error) {
                console.error("Login error:", error);
                setisloading(false);
            }
        }
    });

    return (
        <div className="login-page">
            <div className="login-container">
                <h1 className="login-title">Login</h1>
                <form className="login-form">
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name='email'
                            id="email"
                            placeholder="Enter your email"
                            required
                            onChange={login.handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            required
                            name='password'
                            onChange={login.handleChange}
                        />
                    </div>
                    <button type="submit" className="login-button" onClick={login.handleSubmit}>Login</button>
                </form>
                <div className="login-footer">
                    <Link to={'/forgotpass'} className="footer-link">Forgotten Password</Link>
                    <span className="footer-divider">|</span>
                    <Link to={'/register'} className="footer-link">Create Account</Link>
                </div>
            </div>
        </div>
    )
}

export default Login