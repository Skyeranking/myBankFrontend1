import React, { useState } from 'react'
import axios from 'axios';

const Deposite = ({onDeposit}) => {
    
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState('');

    const handleDeposit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            setError('User not authenticated');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:5000/user/deposit',
                { amount: parseFloat(amount) },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            setMessage(response.data.message);
            setBalance(response.data.newBalance);
            setError('');
            setAmount('');
            onDeposit()
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.message || 'An error occurred during deposit.'
            );
            setMessage('');
        }
    };
    return (
        <div className="form-container">
            <h3>Deposit Money</h3>
            <form onSubmit={handleDeposit}>
                <div className="form-group">
                    <label htmlFor="deposit-amount">Amount:</label>
                    <input
                        type="number"
                        id="deposit-amount"
                        placeholder="Enter amount to deposit"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <p>{message}</p>
                <button type="submit" className="btn btn-deposit">
                    Deposit
                </button>
            </form>
        </div>
    )
}

export default Deposite