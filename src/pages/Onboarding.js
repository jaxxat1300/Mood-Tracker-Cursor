import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUserData } from '../utils/storage';
import { Heart, ArrowRight, Bell } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    notifications: false,
    checkInTime: '09:00',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Save user data and navigate to home
      const userData = {
        name: formData.name || 'User',
        notifications: formData.notifications,
        checkInTime: formData.checkInTime,
        onboardedAt: new Date().toISOString(),
      };
      saveUserData(userData);
      navigate('/');
    }
  };

  const handleSkip = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      const userData = {
        name: formData.name || 'User',
        notifications: false,
        checkInTime: '09:00',
        onboardedAt: new Date().toISOString(),
      };
      saveUserData(userData);
      navigate('/');
    }
  };

  const canProceed = () => {
    if (step === 1) return true; // Can always proceed from welcome
    if (step === 2) return true; // Can always proceed from purpose
    if (step === 3) return true; // Can always proceed from setup (optional fields)
    return false;
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-md mx-auto">
        {/* Progress indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-1 w-12 rounded-full transition-all duration-200 ${
                  i <= step 
                    ? 'bg-accent-600' 
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="text-center fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-accent-600 rounded-modern-lg mb-6">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-semibold text-text-primary mb-3">MoodFlow</h1>
            <p className="text-xl text-text-secondary mb-12">Your companion for emotional clarity</p>
            
            <div className="mb-8">
              <div className="inline-block p-1 bg-accent-50 rounded-modern">
                <svg className="w-32 h-32 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Purpose */}
        {step === 2 && (
          <div className="card slide-up">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-50 rounded-modern mb-4">
                <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-text-primary mb-3">Track, Understand, Navigate</h2>
              <p className="text-text-secondary text-sm mb-6">Here's what you can do:</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-modern">
                <div className="flex-shrink-0 w-6 h-6 bg-accent-600 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-white text-xs font-semibold">✓</span>
                </div>
                <div>
                  <p className="font-medium text-text-primary">Log your emotions with depth</p>
                  <p className="text-sm text-text-secondary">Track feelings with nuance and context</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-modern">
                <div className="flex-shrink-0 w-6 h-6 bg-accent-600 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-white text-xs font-semibold">✓</span>
                </div>
                <div>
                  <p className="font-medium text-text-primary">Discover patterns over time</p>
                  <p className="text-sm text-text-secondary">See insights in your emotional journey</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-modern">
                <div className="flex-shrink-0 w-6 h-6 bg-accent-600 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-white text-xs font-semibold">✓</span>
                </div>
                <div>
                  <p className="font-medium text-text-primary">Access support when needed</p>
                  <p className="text-sm text-text-secondary">Find resources and comfort content</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Quick Setup */}
        {step === 3 && (
          <div className="card slide-up">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-text-primary mb-2">Let's personalize your experience</h2>
              <p className="text-text-secondary text-sm">All fields are optional</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  What should we call you?
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="input-field"
                  placeholder="Your name (optional)"
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-modern">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-text-secondary" />
                  <div>
                    <p className="font-medium text-text-primary text-sm">Daily check-in reminders</p>
                    <p className="text-xs text-text-secondary">Get a gentle nudge</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.notifications}
                    onChange={(e) => handleInputChange('notifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-600"></div>
                </label>
              </div>

              {formData.notifications && (
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Best time for daily check-in
                  </label>
                  <input
                    type="time"
                    value={formData.checkInTime}
                    onChange={(e) => handleInputChange('checkInTime', e.target.value)}
                    className="input-field"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="mt-8 space-y-3">
          <button
            onClick={handleNext}
            className="w-full btn-primary flex items-center justify-center space-x-2 py-4"
          >
            <span>{step === 3 ? 'Start Tracking' : step === 1 ? 'Get Started' : 'Continue'}</span>
            <ArrowRight size={18} />
          </button>
          
          <button
            onClick={handleSkip}
            className="w-full text-text-secondary text-sm hover:text-text-primary transition-colors duration-200"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;