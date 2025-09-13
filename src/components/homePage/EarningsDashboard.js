// components/EarningsDashboard.jsx
import React from 'react';

const EarningsDashboard = ({ earnings, isWithdrawing, handleWithdraw, pointsToINR }) => {
  return (
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
                <path d="M17 5H9.5C8.57174 5 7.68150 5.36875 7.02513 6.02513C6.36875 6.68150 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.68150 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Withdraw ₹{pointsToINR(earnings.withdrawablePoints)}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default EarningsDashboard;