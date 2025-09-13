import React from 'react';
import { Link } from 'react-router-dom';

const SmallLinkFooter = () => {
  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      padding: '10px',
      textAlign: 'center',
      fontSize: '0.8em',
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
    }}>
      <Link to="/aboutus" style={{ margin: '0 10px', color: 'inherit', textDecoration: 'none' }}>About Us</Link>
      <Link to="/faq" style={{ margin: '0 10px', color: 'inherit', textDecoration: 'none' }}>FAQ</Link>
      <Link to="/contactus" style={{ margin: '0 10px', color: 'inherit', textDecoration: 'none' }}>Contact Us</Link>
      <Link to="/privacypolicy" style={{ margin: '0 10px', color: 'inherit', textDecoration: 'none' }}>Privacy Policy</Link>
    </div>
  );
};

export default SmallLinkFooter;
