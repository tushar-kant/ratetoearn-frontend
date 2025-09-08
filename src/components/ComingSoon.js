import React from 'react';

const ComingSoon = ({ show, onClose, title = "COMING SOON", subtitle = "Feature Under Development" }) => {
  if (!show) return null;

  return (
    <>
      <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
        style={{
          zIndex: 9999,
          background: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(5px)',
        }}
      >
        <div
          className="text-center p-4 rounded-4 position-relative"
          style={{
            background: 'rgba(0, 0, 0, 0.7)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(20px)',
            transform: 'rotate(-15deg)',
            animation: 'watermarkPulse 3s ease-in-out infinite',
            maxWidth: '400px'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="position-absolute btn-close"
            style={{
              top: '10px',
              right: '10px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transform: 'rotate(15deg)', // Counter-rotate to keep X straight
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.3)';
              e.target.style.transform = 'rotate(15deg) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'rotate(15deg) scale(1)';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <h2 
            className="text-white fw-bold mb-2"
            style={{
              fontSize: '2rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              background: 'linear-gradient(45deg, #7209b7, #a855f7, #ef4444)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {title}
          </h2>
          <p className="text-light opacity-75 mb-0" style={{ fontSize: '1.1rem' }}>
            {subtitle}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes watermarkPulse {
          0%, 100% {
            opacity: 0.8;
            transform: rotate(-15deg) scale(1);
          }
          50% {
            opacity: 1;
            transform: rotate(-15deg) scale(1.05);
          }
        }
      `}</style>
    </>
  );
};

export default ComingSoon;