// HomePage.js (updated)
import React, { useState, useEffect } from 'react';
import { get, post } from '../../api/apiService';
import API_PATHS from '../../api/apiPath';
import { useNavigate } from "react-router-dom";
import EarningsDashboard from './EarningsDashboard';
import HomeContent from './HomeContent';

function HomePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [earnings, setEarnings] = useState({
    totalPoints: 0,
    totalWithdrawnPoints: 0,
    withdrawablePoints: 0
  });
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [referralCode, setReferralCode] = useState('');

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
  }
  }, []);

  useEffect(() => {
    if (userData && userData.phoneNumber) {
      fetchEarning(userData.phoneNumber);
    }
  }, [userData]);

  const fetchEarning = async (phoneNumber) => {
    try {
      const response = await post(API_PATHS.EARNING, { phone: phoneNumber });

      setEarnings({
        totalPoints: response.totalEarning,
        totalWithdrawnPoints: response.totalWithdrawn,
        withdrawablePoints: response.availableNow
      });
      setReferralCode(response.referralCode)
    } catch (error) {
      console.error('Error fetching earning:', error);
    }
  };

  // Conversion rate: 10 points = 1 INR
  const pointsToINR = (points) => points / 10;

  const handleWithdraw = () => {
    if (earnings.withdrawablePoints <= 0) {
      alert('No withdrawable balance available!');
      return;
    }
    navigate('/withdraw');
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralCode).then(() => {
      alert('Referral code copied to clipboard!');
    });
  };

  const handleDailyCheckIn = () => {
    alert('Coming Soon! Daily check-in feature will be available soon.');
  };

  const handleRefer = async () => {
    const shareMessage = 
      ` Join *Rate To Earn*! \n\n` +
      `Earn daily rewards by rating services & completing simple tasks.\n\n` +
      `Use my referral code: *${referralCode}*\n\n` +
      `👉 Sign up here: ${window.location.origin}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Rate To Earn - Refer & Earn',
          text: shareMessage,
          url: window.location.origin,
        });
        console.log('Shared successfully');
      } catch (error) {
        console.log('Error sharing:', error);
        alert(`Sharing failed: ${error.message}`);
      }
    } else {
      // Fallback: copy referral code
      navigator.clipboard.writeText(`${referralCode}`).then(() => {
        alert(`Web Share not supported. Referral code *${referralCode}* copied to clipboard!`);
      });
    }
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
        <EarningsDashboard 
          earnings={earnings}
          isWithdrawing={isWithdrawing}
          handleWithdraw={handleWithdraw}
          pointsToINR={pointsToINR}
        />
        
        <HomeContent 
          referralCode={referralCode}
          handleCopyReferral={handleCopyReferral}
          handleDailyCheckIn={handleDailyCheckIn}
          handleRefer={handleRefer}
        />

        {/* Add spinning animation for loading */}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
        <div className="contact-info" style={{
          marginTop: '20px',
          textAlign: 'center',
          fontSize: '14px',
          color: '#fff'
        }}>
          For any kind of business colab or help contact us: <a href="mailto:help.taskrush@gmail.com" style={{color: '#fff'}}>help.taskrush@gmail.com</a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
