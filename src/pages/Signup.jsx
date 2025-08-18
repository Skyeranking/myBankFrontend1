import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const Signup = () => {
    let navigate = useNavigate()
    const [submitError, setSubmitError] = useState('')


    let signUp = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        onSubmit: async (values) => {
            // let firstName = signUp.values.firstName
            // let lastName = signUp.values.lastName
            // let email = signUp.values.email
            // let password = signUp.values.password

            console.log(values);

            try {
                const response = await axios.post(
                    'http://localhost:5000/user/signup',
                    {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        password: values.password
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );

                if (response.data.status === false) {
                    setSubmitError(response.data.message || 'Registration failed');
                } else {
                    localStorage.setItem('token', response.data.token);
                    navigate('/');
                }
            } catch (error) {
                console.error('Signup error:', error);
                setSubmitError(error.response?.data?.message || 'Registration failed');
            }
        },
        validationSchema: yup.object({
        firstName: yup.string().required('first name is required'),
        lastName: yup.string().required('last name is required'),
        email: yup
            .string()
            .email("input a valid email")
            .required("email is required"),
        password: yup.string().required("password is required"),
    })
    });
    

    console.log(signUp.values);
console.log(signUp.touched);



return (
    <div className="signup-page">
        <div className="signup-container">
            <h1 className="signup-title">Create Account</h1>
            <form className="signup-form">
                <div className="form-row">
                    <div className="input-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Enter your first name"
                            required
                            value={signUp.values.fieldName}
                            onChange={signUp.handleChange}
                            onBlur={signUp.handleBlur}
                            className={`form-control w-50 mt-5  ${signUp.touched.firstName && signUp.errors.firstName
                                ? "is-invalid"
                                : ""
                                }`}
                        />
                        {signUp.touched.firstName && signUp.errors.firstName ? (
                            <small className="text-danger">{signUp.errors.firstName}</small>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="input-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Enter your last name"
                            required
                            value={signUp.values.fieldName}
                            onChange={signUp.handleChange}
                            onBlur={signUp.handleBlur}
                            className={`form-control w-50 mt-5  ${signUp.touched.lastName && signUp.errors.lastName
                                ? "is-invalid"
                                : ""
                                }`}
                        />
                        {signUp.touched.lastName && signUp.errors.lastName ? (
                            <small className="text-danger">{signUp.errors.lastName}</small>
                        ) : (
                            ""
                        )}
                    </div>
                </div>

                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        value={signUp.values.fieldName}
                        onChange={signUp.handleChange}
                        onBlur={signUp.handleBlur}
                        className={`form-control w-50 mt-5  ${signUp.touched.email && signUp.errors.email
                            ? "is-invalid"
                            : ""
                            }`}
                    />
                    {signUp.touched.email && signUp.errors.email ? (
                        <small className="text-danger">{signUp.errors.email}</small>
                    ) : (
                        ""
                    )}
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Create a password"
                        required
                        value={signUp.values.fieldName}
                        onChange={signUp.handleChange}
                        onBlur={signUp.handleBlur}
                        className={`form-control w-50 mt-5  ${signUp.touched.password && signUp.errors.password
                            ? "is-invalid"
                            : ""
                            }`}
                    />
                    {signUp.touched.password && signUp.errors.password ? (
                        <small className="text-danger">{signUp.errors.password}</small>
                    ) : (
                        ""
                    )}
                    <span className="password-hint">Must be at least 8 characters</span>
                </div>

        

                <div className="terms-group">
                    <input type="checkbox" id="terms" required />
                    <label htmlFor="terms">I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a></label>
                </div>

                <button type="submit" className="signup-button" onClick={signUp.handleSubmit}>Sign Up</button>
            </form>

            <div className="login-redirect">
                Already have an account? <Link to={'/'}>Login</Link>
            </div>
        </div>
    </div>
)
}

export default Signup