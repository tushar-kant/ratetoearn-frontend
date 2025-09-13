import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';

import HomePage from './components/homePage/HomePage';
import Login from './components/authPage/Login';
import Registration from './components/authPage/Registration';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import OfferPage from './components/offerPage/OfferPage';
import OfferDetails from './components/offerPage/OfferDetails';

import TasksPage from './components/taskPage/TasksPage';
import TaskDetails from './components/taskPage/TaskDetails';

import Games from './components/Games';
import ReviewPage from './components/reviewPage/Review';
import ReviewDetails from './components/reviewPage/ReviewDetails';

import Profile from './components/user/Profile';
import Settings from './components/user/Setting';
import WithdrawPage from './components/WithdrawPage';
import LandingPage from './components/landingPage/LandingPage';


// Protected Route Component
function ProtectedRoute({ children, isLoggedIn }) {
  if (!isLoggedIn) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
}

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Force page reload if route doesn't exist
    if (!location.pathname.startsWith('/auth') && !location.pathname.startsWith('/home') && !location.pathname.startsWith('/offers') && !location.pathname.startsWith('/offer') && !location.pathname.startsWith('/task') && !location.pathname.startsWith('/review') && !location.pathname.startsWith('/tasks') && !location.pathname.startsWith('/withdraw') && !location.pathname.startsWith('/games') && !location.pathname.startsWith('/profile') && !location.pathname.startsWith('/settings') && location.pathname !== '/') {
      window.location.href = '/';
    }

    const checkAuthStatus = () => {
      try {
        const userData = localStorage.getItem('userData');
        const loginTime = localStorage.getItem('loginTime');

        if (userData && loginTime) {
          // Optional: Check if login is still valid (e.g., within 24 hours)
          const currentTime = Date.now();
          const storedTime = parseInt(loginTime);
          const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

          if (currentTime - storedTime < twentyFourHours) {
            setIsLoggedIn(true);
            console.log('User data found in localStorage:', JSON.parse(userData));
          } else {
            // Clear expired login data
            localStorage.removeItem('userData');
            localStorage.removeItem('loginTime');
            setIsLoggedIn(false);
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking localStorage:', error);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogin = (userData = null) => {
    try {
      // Store user data in localStorage
      const userInfo = userData || {
        phoneNumber: '6372305866',
        loginTime: new Date().toISOString(),
        sessionId: Math.random().toString(36).substr(2, 9)
      };

      localStorage.setItem('userData', JSON.stringify(userInfo));
      localStorage.setItem('loginTime', Date.now().toString());

      setIsLoggedIn(true);
      console.log('Login successful, data stored in localStorage:', userInfo);
      navigate('/home');
    } catch (error) {
      console.error('Error storing login data:', error);
      alert('Error saving login data. Please try again.');
    }
  };

  const handleLogout = () => {
    try {
      // Clear localStorage
      localStorage.removeItem('userData');
      localStorage.removeItem('loginTime');

      setIsLoggedIn(false);
      console.log('Logout successful, localStorage cleared');
      navigate('/auth/login');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  };

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/auth/login"
          element={
            isLoggedIn ?
              <Navigate to="/home" replace /> :
              <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/auth/registration"
          element={
            isLoggedIn ?
              <Navigate to="/home" replace /> :
              <Registration />
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/offers"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <OfferPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/offer/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <OfferDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/task/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <TaskDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/review/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ReviewDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <TasksPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/review"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ReviewPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/withdraw"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <WithdrawPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/games"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Games />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Settings />
            </ProtectedRoute>
          }
        />
        {/* Redirect root path */}
        {/* <Route
          path="/"
          element={
            <Navigate to={isLoggedIn ? "/home" : "/auth/login"} replace />
          }
        /> */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <LandingPage />
            ) : (
              <LandingPage />
            )
          }
        />
        <Route
          path="/landing"
          element={<LandingPage />}
        />
        {/* Catch all other routes */}
        <Route
          path="*"
          element={
            <Navigate to={isLoggedIn ? "/home" : "/auth/login"} replace />
          } />
      </Routes>
      <Footer isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
