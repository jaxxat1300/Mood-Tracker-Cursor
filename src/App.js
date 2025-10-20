import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isUserOnboarded, clearDataOnStart } from './utils/storage';
import Layout from './components/Layout';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Journal from './pages/Journal';
import Notes from './pages/Notes';
import Activities from './pages/Activities';
import Profile from './pages/Profile';

function App() {
  const [userOnboarded, setUserOnboarded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Clear all data on app start for fresh experience
    clearDataOnStart();
    
    // Check onboarding status on mount and when storage changes
    const checkOnboardingStatus = () => {
      setUserOnboarded(isUserOnboarded());
      setIsLoading(false);
    };

    checkOnboardingStatus();

    // Listen for storage changes (when user completes onboarding)
    const handleStorageChange = (e) => {
      if (e.key === 'moodflow_user_data') {
        checkOnboardingStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events for same-tab updates
    const handleUserDataUpdate = () => {
      checkOnboardingStatus();
    };

    window.addEventListener('userDataUpdated', handleUserDataUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userDataUpdated', handleUserDataUpdate);
    };
  }, []);

  // Show loading spinner while checking authentication status
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-slate-600 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route 
            path="/onboarding" 
            element={userOnboarded ? <Navigate to="/" replace /> : <Onboarding />} 
          />
          <Route 
            path="/" 
            element={userOnboarded ? <Home /> : <Navigate to="/onboarding" replace />} 
          />
          <Route 
            path="/journal" 
            element={userOnboarded ? <Journal /> : <Navigate to="/onboarding" replace />} 
          />
          <Route 
            path="/notes" 
            element={userOnboarded ? <Notes /> : <Navigate to="/onboarding" replace />} 
          />
          <Route 
            path="/activities" 
            element={userOnboarded ? <Activities /> : <Navigate to="/onboarding" replace />} 
          />
          <Route 
            path="/profile" 
            element={userOnboarded ? <Profile /> : <Navigate to="/onboarding" replace />} 
          />
          <Route 
            path="*" 
            element={<Navigate to={userOnboarded ? "/" : "/onboarding"} replace />} 
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;