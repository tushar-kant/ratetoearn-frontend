import React from 'react';
import { Link } from 'react-router-dom';

// Hero Section Component
function HeroSection() {
  return (
    <div className="hero-section">
      <div className="container hero-content">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <div className="money-icon mb-4">💰</div>
            <h1 className="hero-title mb-4">Tasky</h1>
            <p className="hero-subtitle mb-4">Turn Your Time Into Money!</p>
            <p className="hero-description mb-5">
              Complete simple tasks and earn real rewards daily. Join thousands of users already earning!
            </p>

            {/* CTA Buttons in Hero */}
            <div className="d-flex flex-column flex-sm-row gap-3 mb-4">
              <Link
                to="/home"
                className="btn btn-primary-custom"
              >
                <span>🚀</span>
                Start Earning Now
              </Link>
              <button
                onClick={() => window.location.href = '/app-debug.apk'}
                className="btn btn-secondary-custom"
              >
                <span>📱</span>
                Download APK
              </button>
            </div>

            <p className="text-white-75 small">
              ✨ No investment required • Instant payouts • 5K+ happy users
            </p>
          </div>
          <div className="col-lg-4 text-center">
            <div className="mobile-icon" style={{ fontSize: '8rem', filter: 'drop-shadow(0 0 20px rgba(74, 111, 220, 0.6))' }}>
              📱
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Earning Section Component
function EarningSection() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center mb-5">
        <div className="col-lg-8 text-center">
          <h2 className="display-5 fw-bold text-white mb-4">How to Earn Money</h2>
          <p className="fs-5 text-white-75">Choose your preferred way to earn rewards</p>
        </div>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-lg-3 col-md-6">
          <div className="card earn-card h-100 text-center p-4">
            <div className="earn-icon">📱</div>
            <h5 className="fw-bold mb-3">Install Apps</h5>
            <p>Download and try new apps to earn instant rewards</p>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card earn-card h-100 text-center p-4">
            <div className="earn-icon">🎥</div>
            <h5 className="fw-bold mb-3">Watch Videos</h5>
            <p>Watch engaging content and get paid for your time</p>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card earn-card h-100 text-center p-4">
            <div className="earn-icon">⭐</div>
            <h5 className="fw-bold mb-3">Write Reviews</h5>
            <p>Share your honest opinions and earn rewards</p>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card earn-card h-100 text-center p-4">
            <div className="earn-icon">👥</div>
            <h5 className="fw-bold mb-3">Refer Friends</h5>
            <p>Invite friends and earn bonus rewards together</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stats Section Component
function StatsSection() {
  return (
    <div className="container py-5">
      <div className="row g-4 mb-5">
        <div className="col-lg-6 col-md-6">
          <div className="stats-card text-center">
            <h3 className="stats-number">5K+</h3>
            <p className="fs-5">Active Users</p>
          </div>
        </div>
        <div className="col-lg-6 col-md-6">
          <div className="stats-card text-center">
            <h3 className="stats-number">₹10K+</h3>
            <p className="fs-5">INR Paid Out</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="row justify-content-center">
        <div className="col-lg-6 text-center">
          <p className="mb-2">
            Version 1.0.0 | Contact: help.taskrush@gmail.com
          </p>
          <p className="small text-white-75">
            Start earning today - No investment required! 💙
          </p>
        </div>
      </div>
      <div className="mt-4">      </div>





    </div>
  );
}

// Main Landing Page Component
function LandingPage() {
  const isAndroid = () => {
    return navigator.userAgent.toLowerCase().includes("android");
  }

  return (
    <>
      <style>{`
        body {
          background: linear-gradient(135deg, #0A0E2A 0%, #1A1F4B 40%, #050716 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
          color: white;
        }
        
        .hero-section {
          background: linear-gradient(135deg, rgba(10, 14, 42, 0.95), rgba(26, 31, 75, 0.85), rgba(5, 7, 22, 0.95));
          backdrop-filter: blur(20px);
          border-bottom: 2px solid rgba(65, 105, 225, 0.2);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          position: relative;
          min-height: 70vh;
          display: flex;
          align-items: center;
        }
        
        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(65, 105, 225, 0.15)"/><circle cx="80" cy="40" r="1" fill="rgba(70, 130, 180, 0.1)"/><circle cx="40" cy="80" r="1.5" fill="rgba(30, 144, 255, 0.12)"/><circle cx="90" cy="10" r="1" fill="rgba(100, 149, 237, 0.1)"/><circle cx="10" cy="90" r="2" fill="rgba(123, 104, 238, 0.08)"/></svg>');
          animation: sparkle 4s linear infinite;
          z-index: 1;
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        
        .hero-content {
          position: relative;
          z-index: 2;
        }
        
        .hero-title {
          font-size: 5rem;
          font-weight: 900;
          background: linear-gradient(45deg, #ffffff, #4A6FDC, #6B8EFF, #A2B6FF);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: heroGradient 3s ease infinite;
          text-shadow: 0 0 50px rgba(74, 111, 220, 0.5);
        }
        
        @keyframes heroGradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .hero-subtitle {
          font-size: 1.8rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.95);
          animation: fadeInUp 1.5s ease;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        
        .hero-description {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.9);
          animation: fadeInUp 2s ease;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .money-icon {
          font-size: 6rem;
          animation: bounce 2s infinite;
          filter: drop-shadow(0 0 20px rgba(74, 111, 220, 0.7));
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-20px); }
          60% { transform: translateY(-10px); }
        }
        
        .cta-section {
          background: rgba(8, 12, 33, 0.5);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(65, 105, 225, 0.2);
          border-radius: 30px;
          padding: 3rem 2rem;
          margin: 2rem 0;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }
        
        .btn-primary-custom {
          background: linear-gradient(135deg, #3A5FCD 0%, #2A4CB0 100%);
          border: none;
          border-radius: 12px;
          padding: 16px 32px;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          color: white;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 15px rgba(58, 95, 205, 0.5);
          position: relative;
          overflow: hidden;
        }
        
        .btn-primary-custom:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(58, 95, 205, 0.7);
          color: white;
          text-decoration: none;
        }
        
        .btn-secondary-custom {
          background: transparent;
          border: 2px solid rgba(65, 105, 225, 0.5);
          border-radius: 12px;
          padding: 14px 32px;
          font-weight: 600;
          font-size: 1.1rem;
          color: white;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          position: relative;
        }
        
        .btn-secondary-custom:hover {
          background: rgba(65, 105, 225, 0.15);
          border-color: rgba(100, 149, 237, 0.9);
          transform: translateY(-2px);
          color: white;
          text-decoration: none;
        }
        
        .earn-card {
          background: linear-gradient(145deg, rgba(15, 20, 50, 0.9), rgba(10, 15, 40, 0.95));
          border: 1px solid rgba(65, 105, 225, 0.3);
          border-radius: 25px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
          color: white;
          position: relative;
          overflow: hidden;
        }
        
        .earn-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, #4A6FDC, #3A5FCD);
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }
        
        .earn-card:hover::before {
          transform: scaleX(1);
        }
        
        .earn-card:hover {
          transform: translateY(-15px) scale(1.03);
          box-shadow: 0 25px 50px rgba(58, 95, 205, 0.5);
          background: linear-gradient(145deg, rgba(20, 30, 70, 0.95), rgba(15, 25, 60, 0.98));
        }
        
        .earn-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          animation: iconFloat 3s ease-in-out infinite;
          filter: drop-shadow(0 0 10px rgba(74, 111, 220, 0.6));
        }
        
        @keyframes iconFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-8px) rotate(2deg); }
          75% { transform: translateY(-4px) rotate(-1deg); }
        }
        
        .stats-card {
          background: linear-gradient(145deg, rgba(58, 95, 205, 0.25), rgba(42, 76, 176, 0.2));
          border: 2px solid rgba(74, 111, 220, 0.4);
          border-radius: 20px;
          backdrop-filter: blur(15px);
          color: white;
          padding: 2rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .stats-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(74, 111, 220, 0.15) 0%, transparent 70%);
          animation: shimmer 4s linear infinite;
        }
        
        @keyframes shimmer {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .stats-number {
          font-size: 3.5rem;
          font-weight: 900;
          background: linear-gradient(45deg, #ffffff, #6B8EFF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
          z-index: 1;
        }
        
        .floating-elements {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }
        
        .floating-elements .coin {
          position: absolute;
          font-size: 2.5rem;
          animation: floatCoin 8s linear infinite;
          opacity: 0;
          filter: drop-shadow(0 0 10px rgba(74, 111, 220, 0.8));
        }
        
        @keyframes floatCoin {
          0% {
            transform: translateY(100vh) translateX(-50px) rotate(0deg) scale(0.5);
            opacity: 0;
          }
          5% {
            opacity: 0.8;
            transform: translateY(90vh) translateX(-30px) rotate(30deg) scale(0.7);
          }
          50% {
            opacity: 1;
            transform: translateY(50vh) translateX(30px) rotate(180deg) scale(1);
          }
          95% {
            opacity: 0.8;
            transform: translateY(10vh) translateX(50px) rotate(330deg) scale(0.7);
          }
          100% {
            transform: translateY(-10vh) translateX(70px) rotate(360deg) scale(0.5);
            opacity: 0;
          }
        }

        h1, h2, h3, h4, h5, h6 {
          color: white;
        }
        
        p {
          color: rgba(255, 255, 255, 0.9);
        }

      `}</style>

      <div className="container-fluid p-0" style={{ minHeight: '100vh' }}>
        {/* Floating Elements */}
        <div className="floating-elements">
          <div className="coin" style={{ left: '10%', animationDelay: '0s' }}>💰</div>
          <div className="coin" style={{ left: '20%', animationDelay: '2s' }}>💎</div>
          <div className="coin" style={{ left: '80%', animationDelay: '4s' }}>🪙</div>
          <div className="coin" style={{ left: '70%', animationDelay: '1s' }}>💰</div>
          <div className="coin" style={{ left: '90%', animationDelay: '3s' }}>💎</div>
        </div>

        {/* Hero Section */}
        <HeroSection />

        {/* Earning Methods Section */}
        <EarningSection />

        {/* Stats Section */}
        <StatsSection />
      </div>
    </>
  );
}

export default LandingPage;