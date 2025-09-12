import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { post } from '../../api/apiService';
import API_PATHS from '../../api/apiPath';

function Registration() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  // Phone number validation function
  const validatePhoneNumber = (phone) => {
    // Remove all non-digit characters for validation
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Check if it's empty
    if (!cleanPhone) {
      return 'Phone number is required';
    }
    
    // Check for Indian phone number format (10 digits, starting with 6-9)
    if (cleanPhone.length === 10 && /^[6-9]\d{9}$/.test(cleanPhone)) {
      return '';
    }
    
    // Check for international format with country code
    if (cleanPhone.length >= 10 && cleanPhone.length <= 15) {
      return '';
    }
    
    return 'Please enter a valid phone number';
  };

  // Format phone number for display
  const formatPhoneNumber = (value) => {
    const phone = value.replace(/\D/g, '');
    
    if (phone.length <= 10) {
      // Format as Indian number: XXX XXX XXXX
      if (phone.length >= 6) {
        return phone.replace(/(\d{3})(\d{3})(\d{0,4})/, '$1 $2 $3').trim();
      } else if (phone.length >= 3) {
        return phone.replace(/(\d{3})(\d{0,3})/, '$1 $2').trim();
      }
    }
    
    return phone;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
    
    // Validate phone number
    const error = validatePhoneNumber(formatted);
    setPhoneError(error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate phone number before submission
    const phoneValidationError = validatePhoneNumber(phoneNumber);
    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      return;
    }
    
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    
    setIsLoading(true);

    // Clean phone number for API (remove spaces and formatting)
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    
    const registrationData = {
      phone: cleanPhone,
      password: password,
      referralCode: referralCode,
    };

    post(API_PATHS.REGISTER, registrationData)
      .then((response) => {
        alert('Registration successful!');
      })
      .catch((error) => {
        console.error('Registration failed:', error);
        alert('Registration failed. Please try again.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
          <div className="col-md-6 col-lg-5">
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
                  left: '20px',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
                  filter: 'blur(20px)'
                }}
              />
              
              {/* Registration Icon */}
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
                      d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" 
                      stroke="white" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <circle 
                      cx="8.5" 
                      cy="7" 
                      r="4" 
                      stroke="white" 
                      strokeWidth="2"
                    />
                    <line 
                      x1="20" 
                      y1="8" 
                      x2="20" 
                      y2="14" 
                      stroke="white" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                    />
                    <line 
                      x1="23" 
                      y1="11" 
                      x2="17" 
                      y2="11" 
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
                  Create Account
                </h2>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem' }}>
                  Join us and start earning today
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label 
                    className="form-label d-flex align-items-center"
                    style={{ 
                      color: 'rgba(255, 255, 255, 0.9)', 
                      fontWeight: '500',
                      marginBottom: '8px',
                      textAlign: 'left'
                    }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    required
                    disabled={isLoading}
                    placeholder="Enter your phone number"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: phoneError 
                        ? '1px solid #ef4444' 
                        : '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      color: 'white',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      if (!phoneError) {
                        e.target.style.borderColor = '#a855f7';
                        e.target.style.boxShadow = '0 0 15px rgba(168, 85, 247, 0.3)';
                      }
                    }}
                    onBlur={(e) => {
                      if (!phoneError) {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  />
                  {phoneError && (
                    <div style={{ 
                      color: '#ef4444', 
                      fontSize: '0.85rem', 
                      marginTop: '5px',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: '6px' }}>
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                        <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      {phoneError}
                    </div>
                  )}
                </div>
                
                <div className="mb-3">
                  <label 
                    className="form-label d-flex align-items-center"
                    style={{ 
                      color: 'rgba(255, 255, 255, 0.9)', 
                      fontWeight: '500',
                      marginBottom: '8px',
                      textAlign: 'left'
                    }}
                  >
                    Password
                  </label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      placeholder="Create a strong password"
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '12px',
                        padding: '12px 50px 12px 16px',
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
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      disabled={isLoading}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255, 255, 255, 0.6)',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '4px',
                        transition: 'color 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#a855f7';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = 'rgba(255, 255, 255, 0.6)';
                      }}
                    >
                      {showPassword ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="mb-3">
                  <label 
                    className="form-label d-flex align-items-center"
                    style={{ 
                      color: 'rgba(255, 255, 255, 0.9)', 
                      fontWeight: '500',
                      marginBottom: '8px'
                    }}
                  >
                    Confirm Password
                  </label>
                  <div className="position-relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-control"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      placeholder="Confirm your password"
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '12px',
                        padding: '12px 50px 12px 16px',
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
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      disabled={isLoading}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255, 255, 255, 0.6)',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '4px',
                        transition: 'color 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#a855f7';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = 'rgba(255, 255, 255, 0.6)';
                      }}
                    >
                      {showConfirmPassword ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label 
                    className="form-label d-flex align-items-center"
                    style={{ 
                      color: 'rgba(255, 255, 255, 0.9)', 
                      fontWeight: '500',
                      marginBottom: '8px',
                      textAlign: 'left'
                    }}
                  >
                    Referral Code
                    <span 
                      style={{ 
                        color: 'rgba(255, 255, 255, 0.5)', 
                        fontSize: '0.85rem',
                        marginLeft: '8px',
                        fontWeight: '400'
                      }}
                    >
                      (Optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    disabled={isLoading}
                    placeholder="Enter referral code if you have one"
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
                  disabled={isLoading || phoneError}
                  style={{
                    background: (isLoading || phoneError)
                      ? 'rgba(114, 9, 183, 0.6)' 
                      : 'linear-gradient(45deg, #7209b7, #a855f7)',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '14px 20px',
                    color: 'white',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: (isLoading || phoneError) ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: (isLoading || phoneError)
                      ? 'none' 
                      : '0 0 25px rgba(114, 9, 183, 0.4)',
                    transform: (isLoading || phoneError) ? 'scale(0.98)' : 'scale(1)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading && !phoneError) {
                      e.target.style.boxShadow = '0 0 35px rgba(168, 85, 247, 0.6)';
                      e.target.style.transform = 'translateY(-2px) scale(1.02)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isLoading && !phoneError) {
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
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>
              
              <div className="text-center mt-4">
                <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Already have an account?{' '}
                  <Link 
                    to="/auth/login" 
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
                    Sign in here
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

export default Registration;
