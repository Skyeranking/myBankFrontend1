import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SendMoney = () => {
    const [recipientAccount, setRecipientAccount] = useState('');
    const [accountName, setAccountName] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [resolving, setResolving] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const resolveAccount = async () => {
            if (recipientAccount.length !== 10) {
                setAccountName('');
                setError('');
                return;
            }

            setResolving(true);
            try {
                const response = await axios.post(
                    'https://mybankbackend1.onrender.com/user/resolve',
                    { accountnum: recipientAccount },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.data.status) {
                    setAccountName(response.data.accountName);
                    setError('');
                } else {
                    setAccountName('');
                    setError(response.data.message || 'Account not found');
                }
            } catch (err) {
                console.error('Resolve error:', err);
                setAccountName('');
                setError('Could not resolve account');
            } finally {
                setResolving(false);
            }
        };

        resolveAccount();
    }, [recipientAccount]);

    const handleTransfer = async (e) => {
        e.preventDefault();

        if (!recipientAccount || !amount || !accountName) {
            return setMessage('Please fill all fields and resolve account.');
        }

        try {
            setIsLoading(true);
            const response = await axios.post(
                'http://localhost:5000/user/transfer',
                { recipientAccount, amount },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessage(response.data.message);
            setRecipientAccount('');
            setAccountName('');
            setAmount('');
        } catch (error) {
            console.error('Transfer failed:', error);
            setMessage(error.response?.data?.message || 'Transfer failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h3>Send Money</h3>
            <form onSubmit={handleTransfer}>
                <div className="form-group">
                    <label htmlFor="recipient-account">Recipient Account:</label>
                    <input
                        type="text"
                        id="recipient-account"
                        placeholder="Enter account number"
                        value={recipientAccount}
                        onChange={(e) => setRecipientAccount(e.target.value)}
                    />
                    {accountName && <p>Account Name: <strong>{accountName}</strong></p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="send-amount">Amount:</label>
                    <input
                        type="number"
                        id="send-amount"
                        placeholder="Enter amount to send"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <p>{message}</p>
                <button
                    type="submit"
                    className="btn btn-send"
                    disabled={resolving || !recipientAccount || !accountName || !amount || isLoading}
                >
                    {isLoading ? 'Sending...' : 'Send Money'}
                </button>
            </form>
        </div>
    );
};

export default SendMoney;
