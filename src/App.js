import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isUserOnboarded } from './utils/storage';
import Layout from './components/Layout';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Journal from './pages/Journal';
import Notes from './pages/Notes';
import Activities from './pages/Activities';
import Profile from './pages/Profile';

function App() {
  const userOnboarded = isUserOnboarded();

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
