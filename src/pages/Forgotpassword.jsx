import { useFormik } from 'formik'
import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Forgotpassword = () => {
  const navigate = useNavigate();

  const forgotPass = useFormik({
    initialValues: {
      email: ''
    },
    onSubmit: async (values) => {
      try {
        console.log('Submitting email:', values.email);

        const response = await axios.post('http://localhost:5000/user/requestOtp', {
          email: values.email
        });

        console.log('Response:', response.data);

        navigate(`/resetpass/${values.email}`);
      } catch (error) {
        console.error('Error:', error);
        alert(error.response?.data?.message || 'Something went wrong');
      }
    }
  });
    return (
        <div className="forgot-password-page">
            <div className="forgot-password-container">
                <div className="forgot-password-header">
                    <h1 className="forgot-password-title">Forgot Password</h1>
                    <p className="forgot-password-subtitle">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>

                <form className="forgot-password-form"onSubmit={forgotPass.handleSubmit} >
                    <div className="input-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name='email'
                            value={forgotPass.values.email}
                            placeholder="Enter your registered email"
                            required
                            onChange={forgotPass.handleChange}
                        />
                    </div>

                    <button type="submit" className="submit-button"  >
                        Send Code
                    </button>

                </form>

                <div className="back-to-login">
                    <Link to={'/'} className="back-link">← Back to Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Forgotpassword