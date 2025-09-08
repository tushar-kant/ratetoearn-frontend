import React, { useState, useEffect } from 'react';
import { post } from '../api/apiService';
import API_PATHS from '../api/apiPath';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [earningData, setEarningData] = useState({
    phone: "",
    totalEarning: 0,
    totalWithdrawn: 0,
    availableNow: 0,
    referralEarning: 0,
    checkinEarning: 0,
    __v: 0
  });
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    if (userData && userData?.phoneNumber) {
      fetchEarning(userData?.phoneNumber);
    }
  }, [userData]);

  const fetchEarning = async (phoneNumber) => {
    try {
      const response = await post(API_PATHS.EARNING, { phone: phoneNumber });
      setEarningData({
        phone: response.phone,
        totalEarning: response.totalEarning,
        totalWithdrawn: response.totalWithdrawn,
        availableNow: response.availableNow,
        referralEarning: response.referralEarning,
        checkinEarning: response.checkinEarning,
        __v: 0
      });
    } catch (error) {
      console.error('Error fetching earning:', error);
    }
  };

  const fetchWithdrawalHistory = async () => {
    try {
      const response = await post(API_PATHS.GET_LIST_OF_WITHDRAW, {
        phoneNumber: userData?.phoneNumber || "1234567891"
      });
      setWithdrawalHistory(response);
      setShowHistory(true);
    } catch (error) {
      console.error('Error fetching withdrawal history:', error);
    }
  };

  const handleWithdraw = () => {
    // Withdraw functionality would go here
    alert('Withdrawal functionality would be implemented here');
  };

  const cardStyle = {
    background: 'linear-gradient(135deg, #29ABE220 0%, #29ABE210 100%)',
    border: '1px solid #29ABE230',
    color: '#29ABE2',
  };

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
              className="p-4 rounded-4 shadow"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}
            >
              <div className="d-flex align-items-center">
                {/* Profile Avatar */}
                <div
                  className="me-4 d-flex align-items-center justify-content-center shadow"
                  style={{
                    background: 'linear-gradient(135deg, #7209b7, #a855f7)',
                    borderRadius: '50%',
                    width: '90px',
                    height: '90px',
                    fontSize: '36px',
                    color: 'white',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 20px rgba(114, 9, 183, 0.5)'
                  }}
                >
                  {userData?.name ? userData.name.charAt(0).toUpperCase() : '-'}
                </div>

                <div className="flex-grow-1">
                  <h4 className="text-white mb-1">{userData?.name || 'User'}</h4>
                  <p className="mb-0 text-light opacity-75">
                    <i className="bi bi-telephone me-2"></i>
                    {earningData.phone || userData?.phoneNumber || 'No phone number'}
                  </p>
                </div>

                <div className="d-none d-md-block">
                  <div className="d-flex align-items-center">
                    <div className="me-3 text-end">
                      <div className="text-white-50 small">Member Since</div>
                      <div className="text-white">2023</div>
                    </div>
                    <div className="vr text-white-50 mx-2" style={{ height: '40px' }}></div>
                    <div className="ms-2">
                      <div className="badge bg-success bg-opacity-20 text-success px-3 py-2">
                        <i className="bi bi-patch-check me-1"></i>
                        Verified
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="row mb-4">
          <div className="col-12">
            <ul className="nav nav-pills nav-justified mb-4">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                  style={{
                    background: activeTab === 'overview' ? 'rgba(114, 9, 183, 0.3)' : 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    borderRadius: '8px',
                    margin: '0 4px'
                  }}
                >
                  <i className="bi bi-grid me-2"></i>Overview
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('history');
                    if (!showHistory) fetchWithdrawalHistory();
                  }}
                  style={{
                    background: activeTab === 'history' ? 'rgba(114, 9, 183, 0.3)' : 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    borderRadius: '8px',
                    margin: '0 4px'
                  }}
                >
                  <i className="bi bi-clock-history me-2"></i>History
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Statistics Cards */}
            <div className="row g-4 mb-8 min-vh-100">
              {[
                {
                  title: 'Total Earning',
                  value: earningData.totalEarning,
                  icon: 'bi bi-currency-dollar',
                  color: '#10B981',
                  gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                },
                {
                  title: 'Total Withdrawn',
                  value: earningData.totalWithdrawn,
                  icon: 'bi bi-cash-coin',
                  color: '#F59E0B',
                  gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
                },
                {
                  title: 'Available Balance',
                  value: earningData.availableNow,
                  icon: 'bi bi-wallet',
                  color: '#3B82F6',
                  gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)'
                },
                {
                  title: 'Referral Earning',
                  value: earningData.referralEarning,
                  icon: 'bi bi-people',
                  color: '#8B5CF6',
                  gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'
                },
                {
                  title: 'Check-in Earning',
                  value: earningData.checkinEarning,
                  icon: 'bi bi-calendar-check',
                  color: '#EF4444',
                  gradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'
                }
              ].map((card, index) => (
                <div key={index} className="col-lg-4 col-md-6 mb-4">
                  <div
                    className="card border-0 h-100 position-relative overflow-hidden"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      borderRadius: '20px',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      minHeight: '140px',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                      e.currentTarget.style.boxShadow = `0 20px 40px ${card.color}30`;
                      e.currentTarget.style.background = `linear-gradient(135deg, ${card.color}15, rgba(255, 255, 255, 0.08))`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    }}
                  >
                    {/* Decorative gradient overlay */}
                    <div
                      className="position-absolute"
                      style={{
                        top: 0,
                        right: 0,
                        width: '100px',
                        height: '100px',
                        background: card.gradient,
                        borderRadius: '50%',
                        opacity: '0.1',
                        transform: 'translate(30px, -30px)'
                      }}
                    />

                    <div className="card-body p-4 d-flex flex-column justify-content-between">
                      {/* Header Section */}
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <div
                          className="rounded-3 d-flex align-items-center justify-content-center"
                          style={{
                            background: card.gradient,
                            width: '48px',
                            height: '48px',
                            boxShadow: `0 4px 12px ${card.color}40`
                          }}
                        >
                          <i className={card.icon} style={{ color: 'white', fontSize: '22px' }}></i>
                        </div>

                        {/* Trending indicator */}
                        <div className="d-flex align-items-center">
                          <i className="bi bi-trending-up" style={{ color: card.color, fontSize: '16px', opacity: 0.7 }}></i>
                        </div>
                      </div>

                      {/* Title */}
                      <h6
                        className="mb-2 text-white-50"
                        style={{
                          fontSize: '13px',
                          fontWeight: '500',
                          letterSpacing: '0.5px',
                          textTransform: 'uppercase'
                        }}
                      >
                        {card.title}
                      </h6>

                      {/* Value Section */}
                      <div className="d-flex align-items-baseline justify-content-between">
                        <div
                          className="fw-bold"
                          style={{
                            fontSize: '28px',
                            color: card.color,
                            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                            textShadow: `0 2px 4px ${card.color}30`,
                            letterSpacing: '-0.5px'
                          }}
                        >
                          ₹{card.value.toLocaleString()}
                        </div>

                        {/* Optional percentage change indicator */}
                        {/* <div
                          className="small"
                          style={{
                            color: card.color,
                            fontSize: '12px',
                            fontWeight: '600',
                            opacity: 0.8
                          }}
                        >
                          +2.5%
                        </div> */}
                      </div>

                      {/* Bottom progress bar */}
                      <div className="mt-3">
                        <div
                          className="progress"
                          style={{
                            height: '3px',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '2px'
                          }}
                        >
                          <div
                            className="progress-bar"
                            style={{
                              background: card.gradient,
                              width: `${Math.random() * 40 + 60}%`,
                              borderRadius: '2px'
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional bottom spacing */}
            <div className="pb-5"></div>



          </>
        )}



        {/* History Tab */}
        {activeTab === 'history' && (
          <>
         <div className="row mb-8 min-vh-100">
  <div className="col-12">
    <div
      className="rounded-4 overflow-hidden position-relative"
      style={{
        background: 'rgba(255, 255, 255, 0.06)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)'
      }}
    >
      {/* Header Section */}
      <div 
        className="p-3 p-md-4 border-bottom"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div className="d-flex align-items-center">
            <div
              className="rounded-3 d-flex align-items-center justify-content-center me-2 me-md-3"
              style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                width: '40px',
                height: '40px',
                minWidth: '40px',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
              }}
            >
              <i className="bi bi-clock-history text-white" style={{ fontSize: '18px' }}></i>
            </div>
            <div>
              <h5 className="text-white mb-1 fs-6 fs-md-5" style={{ fontWeight: '600', letterSpacing: '-0.3px' }}>
                Withdrawal History
              </h5>
              <p className="text-white-50 mb-0 small d-none d-md-block">Track your withdrawal transactions</p>
            </div>
          </div>
          
          <button
            className="btn btn-sm d-flex align-items-center"
            onClick={fetchWithdrawalHistory}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: 'white',
              borderRadius: '10px',
              padding: '6px 12px',
              fontSize: '13px',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <i className="bi bi-arrow-repeat me-1 me-md-2"></i>
            <span className="d-none d-sm-inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3 p-md-4">
        {withdrawalHistory.length > 0 ? (
          <>
            {/* Mobile Card View */}
            <div className="d-block d-lg-none">
              {withdrawalHistory.map((withdrawal, index) => (
                <div 
                  key={index}
                  className="mb-3 p-3 rounded-3 position-relative"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                  }}
                >
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-2 d-flex align-items-center justify-content-center me-3"
                        style={{
                          background: 'rgba(139, 92, 246, 0.15)',
                          width: '36px',
                          height: '36px',
                          minWidth: '36px'
                        }}
                      >
                        <i 
                          className={`bi ${
                            withdrawal.type === 'bank' ? 'bi-bank' : 
                            withdrawal.type === 'upi' ? 'bi-phone' : 
                            'bi-wallet'
                          }`}
                          style={{ color: '#8B5CF6', fontSize: '16px' }}
                        ></i>
                      </div>
                      <div>
                        <div className="text-white text-capitalize fw-medium" style={{ fontSize: '15px' }}>
                          {withdrawal.type}
                        </div>
                        <div className="text-white-50 small">
                          Payment Method
                        </div>
                      </div>
                    </div>
                    
                    <span 
                      className={`px-2 py-1 rounded-pill small fw-medium ${
                        withdrawal.status === 'success' 
                          ? 'text-success' 
                          : withdrawal.status === 'pending' 
                          ? 'text-warning' 
                          : 'text-danger'
                      }`}
                      style={{
                        background: withdrawal.status === 'success' 
                          ? 'rgba(16, 185, 129, 0.15)' 
                          : withdrawal.status === 'pending' 
                          ? 'rgba(245, 158, 11, 0.15)' 
                          : 'rgba(239, 68, 68, 0.15)',
                        border: `1px solid ${
                          withdrawal.status === 'success' 
                            ? 'rgba(16, 185, 129, 0.3)' 
                            : withdrawal.status === 'pending' 
                            ? 'rgba(245, 158, 11, 0.3)' 
                            : 'rgba(239, 68, 68, 0.3)'
                        }`,
                        fontSize: '11px',
                        textTransform: 'capitalize'
                      }}
                    >
                      <i className={`bi ${
                        withdrawal.status === 'success' ? 'bi-check-circle-fill' :
                        withdrawal.status === 'pending' ? 'bi-clock-fill' :
                        'bi-x-circle-fill'
                      } me-1`}></i>
                      {withdrawal.status}
                    </span>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-end">
                    <div
                      className="fw-bold d-flex align-items-center"
                      style={{
                        fontSize: '20px',
                        color: '#10B981',
                        fontFamily: 'monospace'
                      }}
                    >
                      <i className="bi bi-arrow-up-circle me-2 text-success" style={{ fontSize: '16px' }}></i>
                      ₹{withdrawal.amount.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="d-none d-lg-block">
              <div className="table-responsive">
                <table className="table table-borderless mb-0">
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <th 
                        scope="col" 
                        className="text-white-50 pb-3"
                        style={{ 
                          fontSize: '13px', 
                          fontWeight: '500', 
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          background: 'transparent'
                        }}
                      >
                        Amount
                      </th>
                      <th 
                        scope="col" 
                        className="text-white-50 pb-3"
                        style={{ 
                          fontSize: '13px', 
                          fontWeight: '500', 
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          background: 'transparent'
                        }}
                      >
                        Method
                      </th>
                      <th 
                        scope="col" 
                        className="text-white-50 pb-3"
                        style={{ 
                          fontSize: '13px', 
                          fontWeight: '500', 
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          background: 'transparent'
                        }}
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {withdrawalHistory.map((withdrawal, index) => (
                      <tr 
                        key={index}
                        className="border-0"
                        style={{
                          borderBottom: index !== withdrawalHistory.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none'
                        }}
                      >
                        <td className="py-3 border-0">
                          <div
                            className="fw-bold d-flex align-items-center"
                            style={{
                              fontSize: '18px',
                              color: '#10B981',
                              fontFamily: 'monospace'
                            }}
                          >
                            <i className="bi bi-arrow-up-circle me-2 text-success"></i>
                            ₹{withdrawal.amount.toLocaleString()}
                          </div>
                        </td>
                        <td className="py-3 border-0">
                          <div className="d-flex align-items-center">
                            <div
                              className="rounded-2 d-flex align-items-center justify-content-center me-3"
                              style={{
                                background: 'rgba(139, 92, 246, 0.15)',
                                width: '36px',
                                height: '36px'
                              }}
                            >
                              <i 
                                className={`bi ${
                                  withdrawal.type === 'bank' ? 'bi-bank' : 
                                  withdrawal.type === 'upi' ? 'bi-phone' : 
                                  'bi-wallet'
                                }`}
                                style={{ color: '#8B5CF6', fontSize: '16px' }}
                              ></i>
                            </div>
                            <span className="text-white text-capitalize" style={{ fontSize: '15px', fontWeight: '500' }}>
                              {withdrawal.type}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 border-0">
                          <span 
                            className={`px-3 py-1 rounded-pill small fw-medium ${
                              withdrawal.status === 'success' 
                                ? 'text-success' 
                                : withdrawal.status === 'pending' 
                                ? 'text-warning' 
                                : 'text-danger'
                            }`}
                            style={{
                              background: withdrawal.status === 'success' 
                                ? 'rgba(16, 185, 129, 0.15)' 
                                : withdrawal.status === 'pending' 
                                ? 'rgba(245, 158, 11, 0.15)' 
                                : 'rgba(239, 68, 68, 0.15)',
                              border: `1px solid ${
                                withdrawal.status === 'success' 
                                  ? 'rgba(16, 185, 129, 0.3)' 
                                  : withdrawal.status === 'pending' 
                                  ? 'rgba(245, 158, 11, 0.3)' 
                                  : 'rgba(239, 68, 68, 0.3)'
                              }`,
                              fontSize: '12px',
                              textTransform: 'capitalize'
                            }}
                          >
                            <i className={`bi ${
                              withdrawal.status === 'success' ? 'bi-check-circle-fill' :
                              withdrawal.status === 'pending' ? 'bi-clock-fill' :
                              'bi-x-circle-fill'
                            } me-1`}></i>
                            {withdrawal.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-4 py-md-5">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 mb-md-4"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                width: '60px',
                height: '60px'
              }}
            >
              <i className="bi bi-inbox text-white-50" style={{ fontSize: '24px' }}></i>
            </div>
            
            <h6 className="text-white mb-2 fs-6" style={{ fontWeight: '500' }}>
              No Withdrawal History
            </h6>
            <p className="text-white-50 mb-3 mb-md-4 px-2" style={{ fontSize: '13px' }}>
              Your withdrawal transactions will appear here once you make your first withdrawal.
            </p>
            
            <button
              className="btn px-3 px-md-4 py-2"
              style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                border: 'none',
                color: 'white',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '500',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
              }}
              onClick={fetchWithdrawalHistory}
            >
              <i className="bi bi-arrow-repeat me-2"></i>
              Load History
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
</div>

{/* Additional bottom spacing */}
<div className="pb-4 pb-md-5"></div>

          </>
        )}


      </div>
    </div>
  );
}

export default Profile;
