import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { post } from '../../api/apiService';
import API_PATHS from '../../api/apiPath';

function Login({ onLogin }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const loginData = {
      phone: phoneNumber,
      password: password,
    };

    post(API_PATHS.LOGIN, loginData)
      .then((response) => {
        // Create user data object
        const userData = {
          phoneNumber: phoneNumber,
          loginTime: new Date().toISOString(),
          sessionId: Math.random().toString(36).substr(2, 9),
          userAgent: navigator.userAgent,
          lastLoginIP: 'localhost' // In real app, you'd get this from server
        };
        
        alert('Login successful!');
        onLogin(userData); // Pass user data to parent component
      })
      .catch((error) => {
        console.error('Login failed:', error);
        alert('Invalid credentials.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 30%, #16213e 70%, #533483 100%)',
        padding: '20px'
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5 col-lg-4">
            <div 
              className="position-relative"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 40px rgba(114, 9, 183, 0.2)',
                padding: '40px 30px'
              }}
            >
              {/* Decorative elements */}
              <div 
                className="position-absolute"
                style={{
                  top: '-10px',
                  right: '20px',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(114, 9, 183, 0.3) 0%, transparent 70%)',
                  filter: 'blur(15px)'
                }}
              />
              
              {/* Login Icon */}
              <div className="text-center mb-4">
                <div 
                  className="d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #7209b7, #a855f7)',
                    boxShadow: '0 0 30px rgba(114, 9, 183, 0.5)'
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path 
                      d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15" 
                      stroke="white" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <polyline 
                      points="10,17 15,12 10,7" 
                      stroke="white" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <line 
                      x1="15" 
                      y1="12" 
                      x2="3" 
                      y2="12" 
                      stroke="white" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                
                <h2 
                  className="mb-2"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 30%, #a855f7 70%, #7209b7 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: '2rem',
                    fontWeight: '600'
                  }}
                >
                  Welcome Back
                </h2>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem' }}>
                  Sign in to your account
                </p>
              </div>



              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label 
                    className="form-label"
                    style={{ 
                      color: 'rgba(255, 255, 255, 0.9)', 
                      fontWeight: '500',
                      marginBottom: '8px'
                    }}
                  >
                    Phone Number
                  </label>
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      disabled={isLoading}
                      placeholder="Enter your phone number"
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '12px',
                        padding: '12px 16px',
                        color: 'white',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#a855f7';
                        e.target.style.boxShadow = '0 0 15px rgba(168, 85, 247, 0.3)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label 
                    className="form-label"
                    style={{ 
                      color: 'rgba(255, 255, 255, 0.9)', 
                      fontWeight: '500',
                      marginBottom: '8px'
                    }}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    placeholder="Enter your password"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      color: 'white',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#a855f7';
                      e.target.style.boxShadow = '0 0 15px rgba(168, 85, 247, 0.3)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-100 d-flex align-items-center justify-content-center"
                  disabled={isLoading}
                  style={{
                    background: isLoading 
                      ? 'rgba(114, 9, 183, 0.6)' 
                      : 'linear-gradient(45deg, #7209b7, #a855f7)',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '14px 20px',
                    color: 'white',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: isLoading 
                      ? 'none' 
                      : '0 0 25px rgba(114, 9, 183, 0.4)',
                    transform: isLoading ? 'scale(0.98)' : 'scale(1)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading) {
                      e.target.style.boxShadow = '0 0 35px rgba(168, 85, 247, 0.6)';
                      e.target.style.transform = 'translateY(-2px) scale(1.02)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isLoading) {
                      e.target.style.boxShadow = '0 0 25px rgba(114, 9, 183, 0.4)';
                      e.target.style.transform = 'translateY(0) scale(1)';
                    }
                  }}
                >
                  {isLoading ? (
                    <>
                      <div 
                        className="me-2"
                        style={{
                          width: '18px',
                          height: '18px',
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                          borderTop: '2px solid white',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }}
                      />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>
              
              <div className="text-center mt-4">
                <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Don't have an account?{' '}
                  <Link 
                    to="/auth/registration" 
                    style={{
                      color: '#a855f7',
                      textDecoration: 'none',
                      fontWeight: '500',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.textShadow = '0 0 10px rgba(168, 85, 247, 0.5)';
                      e.target.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.textShadow = 'none';
                      e.target.style.textDecoration = 'none';
                    }}
                  >
                    Register here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        input::placeholder {
          color: rgba(255, 255, 255, 0.5) !important;
        }
        
        input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

export default Login;
