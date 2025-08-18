import React, { useState } from 'react'
import axios from 'axios'

const WithdrawalForm = ({onWithdraw}) => {
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const token = localStorage.getItem('token')

  const handleWithdraw = async (e) => {
    e.preventDefault()

    if (!token) {
      setError('User not authenticated')
      return
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/user/withdraw',
        { amount: parseFloat(amount) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.data.status) {
        setMessage(response.data.message)
        setAmount('')
        setError('')
        onWithdraw() 
      } else {
        setMessage('')
        setError(response.data.message)
      }
    } catch (err) {
      console.error(err)
      setError('Withdrawal failed')
      setMessage('')
    }
  }
  return (
    <div className="form-container">
      <h3>Withdraw Money</h3>
      <form onSubmit={handleWithdraw}>
        <div className="form-group">
          <label htmlFor="withdraw-amount">Amount:</label>
          <input
            type="number"
            id="withdraw-amount"
            placeholder="Enter amount to withdraw"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            
          />
        </div>
        <p>{message}</p>
        <button type="submit" className="btn btn-withdraw">
          Withdraw
        </button>
      </form>
    </div>
  )
}

export default WithdrawalForm