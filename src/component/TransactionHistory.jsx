import React, { useEffect, useState } from 'react'
import axios from 'axios'

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const token = localStorage.getItem('token');

    const fetchTransactions = async (page) => {
        try {
            const response = await axios.get(`https://mybankbackend1.onrender.com/user/transaction?page=${page}&limit=7`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.status) {
                setTransactions(response.data.transactions);
                setTotalPages(response.data.totalPages);
                setError('');
            } else {
                setError(response.data.message || 'Failed to fetch transactions');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred while fetching transactions');
        }
    };

    useEffect(() => {
        fetchTransactions(page);
    }, [page]);

    const goToNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const goToPreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    return (
        <div className="transaction-history">
            <h2>Transaction History</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {transactions.length === 0 && !error && <p>No transactions available yet.</p>}

            <div className="transactions-list">
                {transactions.map((transaction) => (
                    <div key={transaction.id} className={`transaction-item ${transaction.type}`}>
                        <div className="transaction-date">{new Date(transaction.date).toLocaleString()}</div>
                        <div className="transaction-description">{transaction.description}</div>
                        <div className="transaction-amount">₦{transaction.amount}</div>
                    </div>
                ))}
            </div>

            <div className="pagination-controls">
                <button onClick={goToPreviousPage} disabled={page === 1}>← Previous</button>
                <span> Page {page} of {totalPages} </span>
                <button onClick={goToNextPage} disabled={page === totalPages}>Next →</button>
            </div>
        </div>
    );
};

export default TransactionHistory