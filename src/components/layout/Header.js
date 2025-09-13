import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const isAndroid = () => {
    return navigator.userAgent.toLowerCase().includes("android");
  }
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (item) => {
    console.log(`${item} clicked`);
    setIsMenuOpen(false);
  };

  const loggedInLinks = [
    {
      to: "/profile",
      text: "Profile",
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="me-2" style={{ verticalAlign: 'middle' }}>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>`
    },
    {
      to: "/settings",
      text: "Settings",
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="me-2" style={{ verticalAlign: 'middle' }}>
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m15.5-3.5L19 4l-1.5 1.5M5 20l-1.5-1.5L5 17m0-10L3.5 5.5 5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>`
    },
   
  ];

  const loggedOutLinks = [
    {
      to: "/auth/login",
      text: "Login",
      icon: ""
    },
    {
      to: "/auth/registration",
      text: "Register",
      icon: ""
    }
  ];

  return (
    <header
      className="py-3 position-relative"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #7209b7 100%)',
        boxShadow: '0 2px 10px rgba(114, 9, 183, 0.2)'
      }}
    >
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          {/* Logo and Title Section */}
          <Link to="/home" className="d-flex align-items-center">
            {/* Simple inline icon */}
            <div
              className="me-3"
              style={{
                background: 'linear-gradient(45deg, #7209b7, #a855f7)',
                borderRadius: '50%',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                boxShadow: '0 0 15px rgba(114, 9, 183, 0.4)'
              }}
            >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8.5 14.5A4 4 0 0 0 12 11.5a4 4 0 0 0 3.5 3 4 4 0 0 1-7 0z"></path>
              <path d="M3 9c.6-1.5 3-2.2 5-2 4 0 5 2 5 5.5 0 1.5-1 3-2 4.5-.4 1-.5 2-.5 3V22"></path>
              <path d="M21 9c-.6-1.5-3-2.2-5-2-4 0-5 2-5 5.5 0 1.5 1 3 2 4.5.4 1 .5 2 .5 3V22"></path>
            </svg>
            </div>

            {/* Simple title */}
            <h1
              className="mb-0"
              style={{
                fontSize: '1.8rem',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 30%, #a855f7 70%, #7209b7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.01em'
              }}
            >
              TaskRush
            </h1>
          </Link>

          {/* 3-Dot Menu */}
          <div className="position-relative">
            <button
              className="btn p-2"
              onClick={toggleMenu}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="1" fill="white" />
                <circle cx="19" cy="12" r="1" fill="white" />
                <circle cx="5" cy="12" r="1" fill="white" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div
                className="position-absolute"
                style={{
                  top: '50px',
                  right: '0',
                  background: 'rgba(26, 26, 46, 0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '12px',
                  minWidth: '140px',
                  boxShadow: '0 8px 32px rgba(114, 9, 183, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  zIndex: 1000,
                  animation: 'fadeIn 0.3s ease-in-out'
                }}
              >
                {(() => {
                  try {
                    const userData = JSON.parse(localStorage.getItem('userData'));
                    const links = (userData && userData.phoneNumber) ? loggedInLinks : loggedOutLinks;

                    return (
                      <>
                        {links.map((link, index) => (
                          <React.Fragment key={index}>
                            <Link
                              to={link.to}
                              className="w-100 text-start px-3 py-2 border-0 text-decoration-none d-block"
                              onClick={handleMenuItemClick}
                              style={{
                                background: 'transparent',
                                color: 'white',
                                fontSize: '14px',
                                transition: 'background 0.2s ease',
                                borderRadius: '0 0 12px 12px'
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.background = 'transparent';
                              }}
                            >
                              {link.icon && <span dangerouslySetInnerHTML={{ __html: link.icon }} />}
                              {link.text}
                            </Link>
                            {index !== links.length - 1 && <hr style={{ margin: '0', border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }} />}
                          </React.Fragment>
                        ))}
                      </>
                    );
                  } catch (error) {
                    console.error("Error parsing userData from localStorage:", error);
                    return null; // Handle errors gracefully
                  }
                })()}
                <hr style={{ margin: '0', border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }} />
                {!isAndroid() && (
                  <a
                    href="/app-debug.apk"
                    className="w-100 text-start px-3 py-2 border-0 text-decoration-none d-block"
                    onClick={handleMenuItemClick}
                    style={{
                    background: 'transparent',
                    color: 'white',
                    fontSize: '14px',
                    transition: 'background 0.2s ease',
                    borderRadius: '0 0 12px 12px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  Download APK
                </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 1.5rem !important;
          }
        }

        @media (max-width: 576px) {
          h1 {
            font-size: 1.3rem !important;
          }

          .me-3 {
            width: 35px !important;
            height: 35px !important;
            margin-right: 0.75rem !important;
          }

          .me-3 svg {
            width: 16px !important;
            height: 16px !important;
          }
        }
      `}</style>

      {/* Click outside to close menu */}
      {isMenuOpen && (
        <div
          className="position-fixed w-100 h-100"
          style={{
            top: 0,
            left: 0,
            zIndex: 999
          }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
}

export default Header;
