import React, { useState } from 'react'
import AccountInfo from '../component/AccountInfo'
import Deposite from '../component/Deposite'
import WithdrawalForm from '../component/WithdrawalForm'
import SendMoney from '../component/SendMoney'
import TransactionHistory from '../component/TransactionHistory'
import NavBar from '../component/NavBar'

const Dashboard = () => {
   const [reloadFlag, setReloadFlag] = useState(false);

  const triggerReload = () => setReloadFlag(prev => !prev);
  return (
    <div className="dashboard">
      {/* <header className="dashboard-header">
        <h1>Bank Dashboard</h1>
      </header> */}
      <NavBar/>
      
      <div className="dashboard-content">
        <div className="dashboard-left">
          <AccountInfo reloadFlag={reloadFlag}/>
          <div className="transaction-forms">
            <Deposite onDeposit={triggerReload}/>
            <WithdrawalForm onWithdraw={triggerReload}/>
            <SendMoney />
          </div>
        </div>
        
        <div className="dashboard-right">
          <TransactionHistory />
        </div>
      </div>
    </div>
  )
}

export default Dashboard