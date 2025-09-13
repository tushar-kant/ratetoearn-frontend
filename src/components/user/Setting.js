import React, { useState, useEffect } from 'react';
import apiService from '../../api/apiService';
import API_PATHS from '../../api/apiPath';
import SuccessModal from '../SuccessModal';

function Settings() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  const [settings, setSettings] = useState({
    // Account Settings
    profileName: '',
    email: '',

    // Notification Settings
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    referralAlerts: true,
    paymentAlerts: true,

    // Payment Settings
    upiId: 'john@paytm',
    panCard: 'ABCDE****F',

    // Security Settings
    loginAlerts: true
  });

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const SettingCard = ({ title, children, icon }) => (
    <div
      className="mb-4 p-4 rounded-3"
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}
    >
      <div className="d-flex align-items-center mb-3">
        <div
          className="me-3 d-flex align-items-center justify-content-center"
          style={{
            background: 'linear-gradient(45deg, #7209b7, #a855f7)',
            borderRadius: '50%',
            width: '40px',
            height: '40px'
          }}
        >
          {icon}
        </div>
        <h5 className="mb-0 text-white fw-bold">{title}</h5>
      </div>
      {children}
    </div>
  );

  const ToggleSwitch = ({ checked, onChange, label }) => (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <span className="text-white">{label}</span>
      <div
        className="position-relative"
        style={{ cursor: 'pointer' }}
        onClick={() => onChange(!checked)}
      >
        <div
          className="rounded-pill"
          style={{
            width: '50px',
            height: '24px',
            background: checked ? 'linear-gradient(45deg, #7209b7, #a855f7)' : 'rgba(255, 255, 255, 0.2)',
            transition: 'all 0.3s ease'
          }}
        >
          <div
            className="rounded-circle position-absolute"
            style={{
              width: '20px',
              height: '20px',
              background: 'white',
              top: '2px',
              left: checked ? '28px' : '2px',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          />
        </div>
      </div>
    </div>
  );

  const InputField = ({ label, value, onChange, type = 'text', placeholder }) => (
    <div className="mb-3">
      <label className="text-white mb-2 d-block">{label}</label>
      <input
        type={type}
        className="form-control"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: 'white',
          borderRadius: '8px',
          padding: '12px'
        }}
      />
    </div>
  );

  useEffect(() => {
    const fetchSettings = async () => {
      if (userData && userData.phoneNumber) {
        try {
          const response = await apiService.post(API_PATHS.GET_SETTINGS, { phone: userData.phoneNumber });
          setSettings(response.settings);
        } catch (error) {
          console.error('Error fetching settings:', error);
        }
      }
    };

    fetchSettings();
  }, []);

  return (
    <div
      className="min-vh-100 py-4 position-relative"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #7209b7 100%)'
      }}
    >

      <div className="container">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-white fw-bold mb-2">Settings</h2>
          <p className="text-light opacity-75">Manage your account preferences and settings</p>
        </div>

        {/* Account Settings */}
        <SettingCard
          title="Account Settings"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        >
          <InputField
            label="Full Name"
            value={settings?.profileName || ''}
            onChange={(value) => handleInputChange('profileName', value)}
            placeholder="Enter your full name"
          />
          <InputField
            label="Email Address"
            value={settings?.email || ''}
            onChange={(value) => handleInputChange('email', value)}
            type="email"
            placeholder="Enter your email"
          />
     
        </SettingCard>

        {/* Payment Settings */}
        <SettingCard
          title="Payment Settings"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        >
          <InputField
            label="UPI ID"
            value={settings?.upiId || ''}
            onChange={(value) => handleInputChange('upiId', value)}
            placeholder="Enter your UPI ID"
          />
          <InputField
            label="PAN Card"
            value={settings?.panCard || ''}
            onChange={(value) => handleInputChange('panCard', value)}
            placeholder="Enter PAN card number"
          />
        </SettingCard>

        {/* Notification Settings */}
        <SettingCard
          title="Notification Settings"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        >
          <ToggleSwitch
            checked={settings?.pushNotifications === undefined ? true : settings.pushNotifications}
            onChange={(value) => handleInputChange('pushNotifications', value)}
            label="Push Notifications"
          />
          <ToggleSwitch
            checked={settings?.emailNotifications === undefined ? true : settings.emailNotifications}
            onChange={(value) => handleInputChange('emailNotifications', value)}
            label="Email Notifications"
          />
          <ToggleSwitch
            checked={settings?.smsNotifications === undefined ? false : settings.smsNotifications}
            onChange={(value) => handleInputChange('smsNotifications', value)}
            label="SMS Notifications"
          />
          <ToggleSwitch
            checked={settings?.referralAlerts === undefined ? true : settings.referralAlerts}
            onChange={(value) => handleInputChange('referralAlerts', value)}
            label="Referral Alerts"
          />
          <ToggleSwitch
            checked={settings?.paymentAlerts === undefined ? true : settings.paymentAlerts}
            onChange={(value) => handleInputChange('paymentAlerts', value)}
            label="Payment Alerts"
          />
        </SettingCard>

        {/* Security Settings */}
        <SettingCard
          title="Security Settings"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="16" r="1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        >
          <ToggleSwitch
            checked={settings?.loginAlerts}
            onChange={(value) => handleInputChange('loginAlerts', value)}
            label="Login Alerts"
          />
          <button
            className="btn w-100 mb-3"
            style={{
              background: 'linear-gradient(45deg, #ef4444, #dc2626)',
              border: 'none',
              color: 'white',
              borderRadius: '8px',
              padding: '12px',
              fontWeight: '600'
            }}
          >
            Change Password
          </button>
        </SettingCard>

        {/* Quick Actions */}
        <SettingCard
          title="Quick Actions"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        >
          <div className="row g-3">
            <div className="col-md-6">
              <button
                className="btn w-100"
                style={{
                  background: 'linear-gradient(45deg, #10b981, #059669)',
                  border: 'none',
                  color: 'white',
                  borderRadius: '8px',
                  padding: '12px',
                  fontWeight: '600'
                }}
              >
                Export Data
              </button>
            </div>
            <div className="col-md-6">
              <button
                className="btn w-100"
                style={{
                  background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
                  border: 'none',
                  color: 'white',
                  borderRadius: '8px',
                  padding: '12px',
                  fontWeight: '600'
                }}
              >
                Share Referral Link
              </button>
            </div>
          </div>
        </SettingCard>

        {/* Support & Help */}
        <SettingCard
          title="Support & Help"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        >
          <div className="row g-3">
            <div className="col-md-4">
              <button
                className="btn w-100"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  borderRadius: '8px',
                  padding: '12px'
                }}
              >
                Help Center
              </button>
            </div>
            <div className="col-md-4">
              <button
                className="btn w-100"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  borderRadius: '8px',
                  padding: '12px'
                }}
              >
                Contact Support
              </button>
            </div>
            <div className="col-md-4">
              <button
                className="btn w-100"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  borderRadius: '8px',
                  padding: '12px'
                }}
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </SettingCard>

        {/* Save Button */}
        <div className="text-center">
          <button
            className="btn px-5 py-3"
            style={{
              background: 'linear-gradient(45deg, #7209b7, #a855f7)',
              border: 'none',
              color: 'white',
              borderRadius: '25px',
              fontWeight: '600',
              fontSize: '16px',
              transition: 'all 0.2s ease'
            }}
            onClick={async () => {
              if (userData && userData.phoneNumber) {
                try {
                  await apiService.post(API_PATHS.SETTINGS, { phone: userData.phoneNumber, settings: settings });
                  setShowSuccessModal(true);
                } catch (error) {
                  console.error('Error updating settings:', error);
                  alert('Failed to update settings.');
                }
              }
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
            Save All Changes
          </button>
        </div>

        <div className="pb-4 pb-md-5"></div>
        <div className="pb-4 pb-md-5"></div>
        <div className="pb-4 pb-4"></div>
      </div>
      <SuccessModal
        show={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message="Settings updated successfully!"
      />
    </div>
  );
}

export default Settings;
