import React, { useState, useEffect } from 'react';
import { post } from '../api/apiService';
import API_PATHS from '../api/apiPath';
import { useNavigate } from "react-router-dom";


function WithdrawPage() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [availableBalance, setAvailableBalance] = useState(0);
  const withdrawablePoints = availableBalance;
  const withdrawableAmount = availableBalance / 10; // 10 points = 1 INR

  useEffect(() => {
    if (userData && userData.phoneNumber) {
      fetchEarning(userData.phoneNumber);
    }
  }, [userData]);

  const fetchEarning = async (phoneNumber) => {
    try {
      const response = await post(API_PATHS.EARNING, { phone: phoneNumber });
      setAvailableBalance(response.availableNow);
    } catch (error) {
      console.error('Error fetching earning:', error);
    }
  };

  const handleSubmit = async () => {
    if (!upiId.trim()) {
      alert('Please enter your UPI ID');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        amount: withdrawableAmount,
        type: 'UPI',
        upiid: upiId,
        phoneNumber: userData.phoneNumber,
      };

      const response = await post(API_PATHS.WITHDRAW, payload);

      if (response.status === 201) {
        // Withdrawal request created successfully
        setShowSuccessModal(true);
        fetchEarning(userData.phoneNumber); // Fetch updated earning
      } else {
        // Handle error
        setShowSuccessModal(true);
        fetchEarning(userData.phoneNumber); // Fetch updated earning

      }
    } catch (error) {
      console.error('Error creating withdrawal:', error);
      alert('Withdrawal request failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setUpiId('');
  };

  const handleGoBack = () => {
    // alert('Going back to home page');
    navigate('/home');

  };

  return (
    <div
      className="min-vh-100"
      style={{
        background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 30%, #16213e 70%, #533483 100%)',
        paddingTop: '20px',
        paddingBottom: '20px'
      }}
    >
      <div className="container" style={{ maxWidth: '500px' }}>
        {/* Header */}
        <div className="d-flex align-items-center mb-4">
          <button
            onClick={handleGoBack}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '10px',
              padding: '10px',
              color: 'white',
              cursor: 'pointer',
              marginRight: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h2
            style={{
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: '600',
              margin: '0'
            }}
          >
            Withdraw Earnings
          </h2>
        </div>

        {/* Available Balance */}
        <div
          className="mb-4"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '15px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '20px',
            textAlign: 'center'
          }}
        >
          <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', marginBottom: '8px' }}>
            Available Balance
          </div>
          <div
            style={{
              fontSize: '1.6rem',
              fontWeight: '700',
              background: 'linear-gradient(45deg, #10b981, #34d399)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '5px'
            }}
          >
            {withdrawablePoints.toLocaleString()} pts
          </div>
          <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.1rem', fontWeight: '600' }}>
            ₹{withdrawableAmount.toLocaleString()}
          </div>
        </div>

        {/* Withdrawal Methods */}
        <div
          className="mb-4"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '15px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '20px'
          }}
        >
          <h5 style={{ color: 'white', marginBottom: '20px', fontWeight: '600' }}>
            Select Withdrawal Method
          </h5>

          {/* UPI Method - Active */}
          <div className="mb-3">
            <div
              onClick={() => setSelectedMethod('upi')}
              style={{
                background: selectedMethod === 'upi'
                  ? 'rgba(168, 85, 247, 0.3)'
                  : 'rgba(255, 255, 255, 0.05)',
                border: selectedMethod === 'upi'
                  ? '2px solid #a855f7'
                  : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '15px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <div className="d-flex align-items-center">
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: '2px solid #a855f7',
                    marginRight: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: selectedMethod === 'upi' ? '#a855f7' : 'transparent'
                  }}
                >
                  {selectedMethod === 'upi' && (
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white' }} />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: 'white', fontWeight: '600', fontSize: '1rem', marginBottom: '2px' }}>
                    UPI Transfer
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem' }}>
                    Instant transfer to your UPI ID
                  </div>
                </div>
                <div>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#10b981" strokeWidth="2" />
                    <path d="M9 12L11 14L15 10" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Gift Card Method - Disabled */}
          <div className="mb-3">
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                padding: '15px',
                opacity: '0.5',
                cursor: 'not-allowed'
              }}
            >
              <div className="d-flex align-items-center">
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    marginRight: '15px'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontWeight: '600', fontSize: '1rem', marginBottom: '2px' }}>
                    Gift Cards
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.85rem' }}>
                    Amazon, Flipkart & more - Coming Soon
                  </div>
                </div>
                <div>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    <line x1="15" y1="9" x2="9" y2="15" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    <line x1="9" y1="9" x2="15" y2="15" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Crypto Method - Disabled */}
          <div>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                padding: '15px',
                opacity: '0.5',
                cursor: 'not-allowed'
              }}
            >
              <div className="d-flex align-items-center">
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    marginRight: '15px'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontWeight: '600', fontSize: '1rem', marginBottom: '2px' }}>
                    Cryptocurrency
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.85rem' }}>
                    Bitcoin, USDT & more - Coming Soon
                  </div>
                </div>
                <div>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    <line x1="15" y1="9" x2="9" y2="15" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    <line x1="9" y1="9" x2="15" y2="15" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* UPI Details Form */}
        {selectedMethod === 'upi' && (
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '20px',
              paddingBottom: "100px"
            }}
          >
            <h5 style={{ color: 'white', marginBottom: '20px', fontWeight: '600' }}>
              UPI Details
            </h5>

            <div className="mb-3">
              <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem', marginBottom: '8px' }}>
                UPI ID *
              </div>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="example@paytm / example@phonepe"
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.8rem', marginTop: '5px' }}>
                Enter your registered UPI ID for instant transfer
              </div>
            </div>

            <div
              className="mb-4"
              style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '10px',
                padding: '15px'
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <span style={{ color: 'white', fontSize: '1rem' }}>
                  Withdrawal Amount:
                </span>
                <span style={{ color: '#10b981', fontSize: '1.2rem', fontWeight: '600' }}>
                  ₹{withdrawableAmount.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-100"
              style={{
                background: isSubmitting
                  ? 'rgba(168, 85, 247, 0.5)'
                  : 'linear-gradient(45deg, #7209b7, #a855f7)',
                border: 'none',
                borderRadius: '12px',
                padding: '15px',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isSubmitting ? 'none' : '0 0 25px rgba(168, 85, 247, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isSubmitting ? (
                <>
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      marginRight: '10px'
                    }}
                  />
                  Processing Withdrawal...
                </>
              ) : (
                'Submit Withdrawal Request'
              )}
            </button>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <div
            style={{
              position: 'fixed',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              background: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: '1000',
              padding: '20px'
            }}
            onClick={closeSuccessModal}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #533483 100%)',
                borderRadius: '20px',
                padding: '30px',
                maxWidth: '400px',
                width: '100%',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Success Icon */}
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(45deg, #10b981, #34d399)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  animation: 'pulse 2s infinite'
                }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <polyline points="20,6 9,17 4,12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <h3
                style={{
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '15px'
                }}
              >
                Withdrawal Successful!
              </h3>

              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '1rem',
                  lineHeight: '1.5',
                  marginBottom: '20px'
                }}
              >
                Your withdrawal request of <strong>₹{withdrawableAmount.toLocaleString()}</strong> has been submitted successfully.
              </p>

              <div
                style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '10px',
                  padding: '15px',
                  marginBottom: '25px'
                }}
              >
                <p style={{ color: '#10b981', fontSize: '0.9rem', margin: '0', fontWeight: '500' }}>
                  💰 Your withdrawal will reach your UPI account within 24 hours
                </p>
              </div>

              <button
                onClick={closeSuccessModal}
                style={{
                  background: 'linear-gradient(45deg, #7209b7, #a855f7)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 30px',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* CSS Animations */}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
          `}
        </style>
      </div>
    </div>
  );
}

export default WithdrawPage;
