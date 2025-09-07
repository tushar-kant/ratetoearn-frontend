import React, { useState } from 'react';

function Profile() {
  // Sample data - replace with real data from your API/state management
  const [userData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: null,
    stats: {
      totalReferrals: 12,
      referralEarnings: 2450.00,
      totalEarned: 5890.50,
      totalWithdrawal: 3200.00,
      checkinEarnings: 1240.50
    }
  });

  const StatCard = ({ title, value, icon, color, isCurrency = false }) => (
    <div 
      className="p-4 rounded-3"
      style={{
        background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
        border: `1px solid ${color}30`,
        backdropFilter: 'blur(10px)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = `0 8px 25px ${color}20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="d-flex align-items-center mb-2">
        <div 
          className="me-3 d-flex align-items-center justify-content-center"
          style={{
            background: `${color}20`,
            borderRadius: '50%',
            width: '40px',
            height: '40px'
          }}
        >
          {icon}
        </div>
        <h6 className="mb-0 text-muted" style={{ fontSize: '14px', fontWeight: '500' }}>
          {title}
        </h6>
      </div>
      <div 
        className="fw-bold"
        style={{ 
          fontSize: '24px', 
          color: color,
          fontFamily: 'monospace'
        }}
      >
        {isCurrency ? `₹${value.toLocaleString()}` : value.toLocaleString()}
      </div>
    </div>
  );

  return (
    <div 
      className="min-vh-100 py-4"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #7209b7 100%)'
      }}
    >
      <div className="container">
        {/* Profile Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div 
              className="p-4 rounded-3"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <div className="d-flex align-items-center">
                {/* Profile Avatar */}
                <div 
                  className="me-4 d-flex align-items-center justify-content-center"
                  style={{
                    background: 'linear-gradient(45deg, #7209b7, #a855f7)',
                    borderRadius: '50%',
                    width: '80px',
                    height: '80px',
                    fontSize: '32px',
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                >
                  {userData.avatar ? (
                    <img src={userData.avatar} alt="Profile" className="rounded-circle w-100 h-100" style={{ objectFit: 'cover' }} />
                  ) : (
                    userData.name.charAt(0).toUpperCase()
                  )}
                </div>
                
                {/* Profile Info */}
                <div>
                  <h2 className="mb-1 text-white fw-bold">{userData.name}</h2>
                  <p className="mb-0 text-light opacity-75">{userData.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="row g-4">
          {/* Total Referrals */}
          <div className="col-lg-4 col-md-6">
            <StatCard
              title="Total Referrals"
              value={userData.stats.totalReferrals}
              color="#10b981"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="7" r="4" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />
          </div>

          {/* Referral Earnings */}
          <div className="col-lg-4 col-md-6">
            <StatCard
              title="Referral Earnings"
              value={userData.stats.referralEarnings}
              color="#3b82f6"
              isCurrency={true}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />
          </div>

          {/* Total Earned */}
          <div className="col-lg-4 col-md-6">
            <StatCard
              title="Total Earned"
              value={userData.stats.totalEarned}
              color="#f59e0b"
              isCurrency={true}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />
          </div>

          {/* Total Withdrawal */}
          <div className="col-lg-6 col-md-6">
            <StatCard
              title="Total Withdrawal"
              value={userData.stats.totalWithdrawal}
              color="#ef4444"
              isCurrency={true}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4z" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />
          </div>

          {/* Check-in Earnings */}
          <div className="col-lg-6 col-md-6">
            <StatCard
              title="Check-in Earnings"
              value={userData.stats.checkinEarnings}
              color="#8b5cf6"
              isCurrency={true}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 11l3 3 8-8" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.51 0 2.93.37 4.18 1.03" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />
          </div>
        </div>

        {/* Available Balance Card */}
        <div className="row mt-4">
          <div className="col-12">
            <div 
              className="p-4 rounded-3 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(114, 9, 183, 0.2) 0%, rgba(168, 85, 247, 0.1) 100%)',
                border: '1px solid rgba(114, 9, 183, 0.3)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <h5 className="text-white mb-2">Available Balance</h5>
              <div 
                className="fw-bold"
                style={{
                  fontSize: '36px',
                  background: 'linear-gradient(135deg, #7209b7, #a855f7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: 'monospace'
                }}
              >
                ₹{(userData.stats.totalEarned - userData.stats.totalWithdrawal).toLocaleString()}
              </div>
              <button 
                className="btn mt-3 px-4 py-2"
                style={{
                  background: 'linear-gradient(45deg, #7209b7, #a855f7)',
                  border: 'none',
                  color: 'white',
                  borderRadius: '25px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 5px 15px rgba(114, 9, 183, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Withdraw Funds
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;