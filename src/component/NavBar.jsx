import React from 'react'
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate()
  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

    return (
          <nav className="bank-navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="bank-logo">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 11V16M8 11V16M16 11V16M3 17.8L12 21L21 17.8M3 7L12 10L21 7M12 3L3 7L12 10L21 7L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>My Bank</span>
          </div>
        </div>

        <div className="navbar-controls">
         
          <button className="nav-button">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="nav-text">Profile</span>
          </button>

          {/* Logout Button with Text */}
          <button className="nav-button" name='Logout' onClick={Logout}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 16L21 12M21 12L17 8M21 12H7M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="nav-text">Logout</span>
          </button>
        </div>
      </div>
    </nav>
    )
}

export default NavBar