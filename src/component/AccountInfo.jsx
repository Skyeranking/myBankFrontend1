import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AccountInfo = ({ reloadFlag }) => {
    const [loading, setloading] = useState(true);
    const [user, setuser] = useState({})
    const [error, seterror] = useState('')
    let params = useParams()
    const { id } = params;

    const token = localStorage.getItem('token');


    useEffect(() => {
        const fetchAccount = async () => {
            try {
                let response = await axios.get(`http://localhost:5000/user/allUser/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                console.log(response.data);
                setuser(response.data);

                if (response.status >= 401 && response.status <= 403) {

                }
            } catch (err) {
                seterror('Failed to load account info');
                console.error(err);
            } finally {
                setloading(false);
            }
        };

        fetchAccount();
    }, [id, token, reloadFlag]);

    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (loading) return <p>Loading account info...</p>;


    return (
        <div className="account-info">
            <h2>Account Information</h2>
            <div className="info-item">
                <span className="info-label">Account Holder:</span>
                <span className="info-value">{user.name}</span>
            </div>
            <div className="info-item">
                <span className="info-label">Account Number:</span>
                <span className="info-value">{user.accountnum}</span>
            </div>
            <div className="info-item">
                <span className="info-label">Account Balance:</span>
                <span className="info-value">₦{user.balance}</span>
            </div>
        </div>
    );
};

export default AccountInfo