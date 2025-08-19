import { useFormik } from 'formik'
import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Navigate, useNavigate } from 'react-router-dom'

const Resetpassword = () => {
  let navigate = useNavigate()
  const { email } = useParams();

  const resetPass = useFormik({
    initialValues: {
      otp: '',
      newPassword: '',
      confirmPassword: ''
    },
    onSubmit: async (values) => {
      if (values.newPassword !== values.confirmPassword) {
        alert("Passwords do not match")
        return
      }

      try {
        const res = await axios.post('https://mybankbackend1.onrender.com/user/forgotPassword', {
          email: email.trim(),
          otp: values.otp.trim(),
          newPassword: values.newPassword.trim()
        })

        alert(res.data.message)
        navigate('/')
      } catch (error) {
        alert(error.response?.data?.message || "Error resetting password")
        console.error(error)
      }
    }
  })
  return (
    <div className="reset-pw-container">
      <div className="reset-pw-card">
        <div className="reset-pw-header">
          <h1>Reset Password</h1>
          <p>Enter the verification code sent to your email and set a new password</p>
        </div>
      
        <form className="reset-pw-form" onSubmit={resetPass.handleSubmit}>
          <div className="input-field">
            <label htmlFor="verificationCode">Verification Code</label>
            <input
              type="text"
              id="verificationCode"
              placeholder="Enter 6-digit code"
              // maxLength="6"
              // pattern="\d{6}"
              required
              name='otp'
              value={resetPass.values.otp}
              onChange={resetPass.handleChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              placeholder="Create new password"
              minLength="8"
              required
              name='newPassword'
              value={resetPass.values.newPassword}
              onChange={resetPass.handleChange}
            />
            <div className="password-hints">
              <p>Minimum 8 characters</p>
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Re-enter new password"
              required
              name='confirmPassword'
              value={resetPass.values.confirmPassword}
              onChange={resetPass.handleChange}
            />
          </div>

          <button type="submit" className="reset-pw-btn">
            Reset Password
          </button>
        </form>

        <div className="reset-pw-footer">
          <a href="/" className="back-to-login">
            ← Return to Login
          </a>
          <a href="/forgotpass" className="resend-code">
            Resend Verification Code
          </a>
        </div>
      </div>
    </div>
  )
}

export default Resetpassword