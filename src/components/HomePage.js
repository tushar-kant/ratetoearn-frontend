import React, { useState, useEffect } from 'react';
import { get } from '../api/apiService';
import API_PATHS from '../api/apiPath';
import { useNavigate } from "react-router-dom";


function HomePage() {
    const navigate = useNavigate();

  const [earnings, setEarnings] = useState({
    totalPoints: 28470, // Changed to points (10 points = 1 INR)
    totalWithdrawnPoints: 12000,
    withdrawablePoints: 16470
  });
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [referralCode] = useState('RTR2024XYZ'); // User's referral code

  // Conversion rate: 10 points = 1 INR
  const pointsToINR = (points) => points / 10;

  const handleWithdraw = () => {
    if (earnings.withdrawablePoints <= 0) {
      alert('No withdrawable balance available!');
      return;
    }

    // Navigate to withdraw component
    // alert('Navigating to withdraw page...');
    // In a real app, you would use router navigation like:
    navigate('/withdraw') ;
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralCode).then(() => {
      alert('Referral code copied to clipboard!');
    });
  };

  const handleDailyCheckIn = () => {
    alert('Coming Soon! Daily check-in feature will be available soon.');
  };

  const handleRefer = () => {
    alert('Coming Soon! Refer & earn feature will be available soon.');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await get(API_PATHS.EARNING);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div 
      className="min-vh-100"
      style={{
        background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 30%, #16213e 70%, #533483 100%)',
        paddingTop: '15px',
        paddingBottom: '100px' // Space for fixed footer
      }}
    >
      <div className="container">
        {/* Compact Earnings Dashboard */}
        <div 
          className="position-relative mb-3"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '15px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), 0 0 20px rgba(114, 9, 183, 0.15)',
            padding: '20px',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div className="text-center mb-3">
            <h4 
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 70%, #7209b7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '1.3rem',
                fontWeight: '600',
                margin: '0'
              }}
            >
              Earnings Dashboard
            </h4>
          </div>

          {/* Points Conversion Info */}
          <div className="text-center mb-3">
            <div 
              style={{
                background: 'rgba(255, 215, 0, 0.1)',
                border: '1px solid rgba(255, 215, 0, 0.3)',
                borderRadius: '20px',
                padding: '6px 15px',
                display: 'inline-block',
                fontSize: '0.75rem',
                color: '#ffd700',
                fontWeight: '500'
              }}
            >
              💰 10 Points = ₹1 INR
            </div>
          </div>

          {/* Compact Earnings Cards */}
          <div className="row g-2 mb-3">
            <div className="col-4">
              <div 
                className="text-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  padding: '12px 8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div 
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '2px'
                  }}
                >
                  {earnings.totalPoints.toLocaleString()} pts
                </div>
                <div 
                  style={{
                    fontSize: '0.8rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: '600',
                    marginBottom: '2px'
                  }}
                >
                  ₹{pointsToINR(earnings.totalPoints).toLocaleString()}
                </div>
                <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.65rem', fontWeight: '500' }}>
                  Total Earned
                </div>
              </div>
            </div>
            
            <div className="col-4">
              <div 
                className="text-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  padding: '12px 8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div 
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    background: 'linear-gradient(45deg, #ef4444, #f87171)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '2px'
                  }}
                >
                  {earnings.totalWithdrawnPoints.toLocaleString()} pts
                </div>
                <div 
                  style={{
                    fontSize: '0.8rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: '600',
                    marginBottom: '2px'
                  }}
                >
                  ₹{pointsToINR(earnings.totalWithdrawnPoints).toLocaleString()}
                </div>
                <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.65rem', fontWeight: '500' }}>
                  Withdrawn
                </div>
              </div>
            </div>
            
            <div className="col-4">
              <div 
                className="text-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  padding: '12px 8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div 
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    background: 'linear-gradient(45deg, #10b981, #34d399)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '2px'
                  }}
                >
                  {earnings.withdrawablePoints.toLocaleString()} pts
                </div>
                <div 
                  style={{
                    fontSize: '0.8rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: '600',
                    marginBottom: '2px'
                  }}
                >
                  ₹{pointsToINR(earnings.withdrawablePoints).toLocaleString()}
                </div>
                <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.65rem', fontWeight: '500' }}>
                  Available
                </div>
              </div>
            </div>
          </div>

          {/* Withdraw Button */}
          <div className="text-center">
            <button
              onClick={handleWithdraw}
              disabled={isWithdrawing || earnings.withdrawablePoints <= 0}
              className="d-flex align-items-center justify-content-center mx-auto"
              style={{
                background: isWithdrawing || earnings.withdrawablePoints <= 0
                  ? 'rgba(114, 9, 183, 0.4)' 
                  : 'linear-gradient(45deg, #7209b7, #a855f7)',
                border: 'none',
                borderRadius: '25px',
                padding: '10px 20px',
                color: 'white',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: isWithdrawing || earnings.withdrawablePoints <= 0 ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isWithdrawing || earnings.withdrawablePoints <= 0
                  ? 'none' 
                  : '0 0 20px rgba(114, 9, 183, 0.4)',
                transform: isWithdrawing ? 'scale(0.98)' : 'scale(1)',
                minWidth: '180px'
              }}
            >
              {isWithdrawing ? (
                <>
                  <div 
                    className="me-2"
                    style={{
                      width: '14px',
                      height: '14px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}
                  />
                  Processing...
                </>
              ) : earnings.withdrawablePoints <= 0 ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="me-2">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                    <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  No Balance
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="me-2">
                    <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" strokeWidth="2"/>
                    <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Withdraw ₹{pointsToINR(earnings.withdrawablePoints)}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="row g-2 mb-3">
          {/* Daily Check-in */}
          <div className="col-6">
            <button
              onClick={handleDailyCheckIn}
              className="w-100 d-flex flex-column align-items-center justify-content-center"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '15px',
                padding: '15px',
                color: 'white',
                fontSize: '0.85rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                minHeight: '80px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(168, 85, 247, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 5px 20px rgba(168, 85, 247, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mb-1">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                <polyline points="9,14 11,16 15,12" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Daily Check-in
              <span style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '2px' }}>
                Coming Soon
              </span>
            </button>
          </div>

          {/* Refer & Earn */}
          <div className="col-6">
            <button
              onClick={handleRefer}
              className="w-100 d-flex flex-column align-items-center justify-content-center"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '15px',
                padding: '15px',
                color: 'white',
                fontSize: '0.85rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                minHeight: '80px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(168, 85, 247, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 5px 20px rgba(168, 85, 247, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mb-1">
                <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2"/>
                <circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Refer & Earn
              <span style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '2px' }}>
                Coming Soon
              </span>
            </button>
          </div>
        </div>

        {/* Referral Code Section */}
        <div 
          className="position-relative mb-3"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '15px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), 0 0 20px rgba(114, 9, 183, 0.15)',
            padding: '15px'
          }}
        >
          <div className="text-center">
            <h5 
              style={{
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '10px'
              }}
            >
              Your Referral Code
            </h5>
            <div className="d-flex align-items-center justify-content-center">
              <div 
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px',
                  padding: '8px 15px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#a855f7',
                  marginRight: '10px',
                  fontFamily: 'monospace'
                }}
              >
                {referralCode}
              </div>
              <button
                onClick={handleCopyReferral}
                style={{
                  background: 'linear-gradient(45deg, #7209b7, #a855f7)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = '0 0 15px rgba(168, 85, 247, 0.5)';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Welcome Section - More Compact */}
        <div 
          className="text-center"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '15px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), 0 0 20px rgba(114, 9, 183, 0.15)',
            padding: '25px 20px'
          }}
        >
          <h3 
            className="mb-2"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 30%, #a855f7 70%, #7209b7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontSize: '1.8rem',
              fontWeight: '600'
            }}
          >
            Welcome to Rate To Earn
          </h3>
          <p 
            style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              fontSize: '1rem',
              lineHeight: '1.5',
              margin: '0'
            }}
          >
            Rate services, complete tasks, and earn rewards daily!
          </p>
        </div>

        {/* Add spinning animation for loading */}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
}

export default HomePage;
