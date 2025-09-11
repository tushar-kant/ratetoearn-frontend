import React from 'react';
import { Link } from 'react-router-dom';

function Footer({ isLoggedIn, handleLogout }) {
  return (
    <nav 
      className="navbar fixed-bottom"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #7209b7 100%)',
        boxShadow: '0 -2px 10px rgba(114, 9, 183, 0.2)',
        borderTop: '1px solid rgba(114, 9, 183, 0.3)'
      }}
    >
      <div className="container">
        <div className="d-flex justify-content-between align-items-center w-100 ">
          {isLoggedIn ? (
            <>
            
              <Link 
                to="/home" 
                className="text-decoration-none d-flex flex-column align-items-center"
                style={{
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  minWidth: '60px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#a855f7';
                  e.currentTarget.style.textShadow = '0 0 10px rgba(168, 85, 247, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.textShadow = 'none';
                }}
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="mb-1"
                  style={{ stroke: 'currentColor' }}
                >
                  <path 
                    d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <polyline 
                    points="9,22 9,12 15,12 15,22" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                Home
              </Link>
              
           
              <Link 
                to="/offers" 
                className="text-decoration-none d-flex flex-column align-items-center"
                style={{
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  minWidth: '60px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#a855f7';
                  e.currentTarget.style.textShadow = '0 0 10px rgba(168, 85, 247, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.textShadow = 'none';
                }}
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="mb-1"
                  style={{ stroke: 'currentColor' }}
                >
                  <path 
                    d="M21 16V8C20.9996 7.64928 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64928 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <polyline 
                    points="7.5,4.21 12,6.81 16.5,4.21" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <polyline 
                    points="7.5,19.79 7.5,14.6 3,12" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <polyline 
                    points="21,12 16.5,14.6 16.5,19.79" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <polyline 
                    points="12,22.08 12,12" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                Offers
              </Link>
              
           
              <Link 
                to="/tasks" 
                className="text-decoration-none d-flex flex-column align-items-center"
                style={{
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  minWidth: '60px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#a855f7';
                  e.currentTarget.style.textShadow = '0 0 10px rgba(168, 85, 247, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.textShadow = 'none';
                }}
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="mb-1"
                  style={{ stroke: 'currentColor' }}
                >
                  <path 
                    d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <polyline 
                    points="14,2 14,8 20,8" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <line 
                    x1="16" 
                    y1="13" 
                    x2="8" 
                    y2="13" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                  <line 
                    x1="16" 
                    y1="17" 
                    x2="8" 
                    y2="17" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                  <polyline 
                    points="10,9 9,9 8,9" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                Tasks
              </Link>
               <Link 
                to="/review" 
                className="text-decoration-none d-flex flex-column align-items-center"
                style={{
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  minWidth: '60px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#a855f7';
                  e.currentTarget.style.textShadow = '0 0 10px rgba(168, 85, 247, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.textShadow = 'none';
                }}
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="mb-1"
                  style={{ stroke: 'currentColor' }}
                >
                  <path 
                    d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <polyline 
                    points="14,2 14,8 20,8" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <line 
                    x1="16" 
                    y1="13" 
                    x2="8" 
                    y2="13" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                  <line 
                    x1="16" 
                    y1="17" 
                    x2="8" 
                    y2="17" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                  <polyline 
                    points="10,9 9,9 8,9" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                Review
              </Link>

              
              
              {/* Logout Button */}
              <button 
                className="btn d-flex flex-column align-items-center"
                onClick={handleLogout}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  borderRadius: '15px',
                  padding: '8px 12px',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  minWidth: '60px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(168, 85, 247, 0.2)';
                  e.target.style.borderColor = '#a855f7';
                  e.target.style.boxShadow = '0 0 15px rgba(168, 85, 247, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="mb-1"
                  style={{ stroke: 'currentColor' }}
                >
                  <path 
                    d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <polyline 
                    points="16,17 21,12 16,7" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <line 
                    x1="21" 
                    y1="12" 
                    x2="9" 
                    y2="12" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                </svg>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/auth/login" 
                className="text-decoration-none d-flex align-items-center"
                style={{
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#a855f7';
                  e.target.style.textShadow = '0 0 10px rgba(168, 85, 247, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'white';
                  e.target.style.textShadow = 'none';
                }}
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="me-2"
                  style={{ stroke: 'currentColor' }}
                >
                  <path 
                    d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <polyline 
                    points="10,17 15,12 10,7" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <line 
                    x1="15" 
                    y1="12" 
                    x2="3" 
                    y2="12" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                </svg>
                Login
              </Link>
              
              <Link 
                to="/auth/registration" 
                className="text-decoration-none d-flex align-items-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: '500',
                  borderRadius: '25px',
                  padding: '8px 16px',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(168, 85, 247, 0.2)';
                  e.target.style.borderColor = '#a855f7';
                  e.target.style.boxShadow = '0 0 15px rgba(168, 85, 247, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="me-2"
                  style={{ stroke: 'currentColor' }}
                >
                  <path 
                    d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <circle 
                    cx="8.5" 
                    cy="7" 
                    r="4" 
                    strokeWidth="2"
                  />
                  <line 
                    x1="20" 
                    y1="8" 
                    x2="20" 
                    y2="14" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                  <line 
                    x1="23" 
                    y1="11" 
                    x2="17" 
                    y2="11" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                </svg>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Footer;
