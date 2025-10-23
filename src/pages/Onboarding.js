import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUserData } from '../utils/storage';
import { Sparkles, Leaf, Bell } from 'lucide-react';

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
      const userData = {
        name: formData.name || 'Friend',
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
        name: 'Friend',
        notifications: false,
        checkInTime: '09:00',
        onboardedAt: new Date().toISOString(),
      };
      saveUserData(userData);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen gradient-overlay px-4 py-12 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-mint-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-lg mx-auto relative z-10">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-12 fade-in">
          <div className="flex items-center gap-3">
            {[1, 2, 3].map((i) => (
              <React.Fragment key={i}>
                <div className={`relative transition-all duration-500 ${
                  i <= step ? 'scale-100' : 'scale-75'
                }`}>
                  <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    i < step 
                      ? 'bg-primary-600 ring-4 ring-primary-200' 
                      : i === step
                      ? 'bg-primary-500 ring-8 ring-primary-200 animate-pulse'
                      : 'bg-sage-300'
                  }`}></div>
                </div>
                {i < 3 && (
                  <div className={`h-0.5 w-12 transition-all duration-500 ${
                    i < step ? 'bg-primary-500' : 'bg-sage-300'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="space-y-8 slide-up">
            <div className="text-center space-y-6">
              {/* Logo */}
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary-400 to-mint-400 rounded-full shadow-spa-xl mb-6 float">
                <Leaf className="w-12 h-12 text-white" strokeWidth={1.5} />
              </div>
              
              <div>
                <h1 className="text-5xl font-serif font-bold text-sage-900 mb-4 tracking-tight">
                  Welcome to Your
                  <span className="block bg-gradient-to-r from-primary-600 to-mint-600 bg-clip-text text-transparent">
                    Wellness Journey
                  </span>
                </h1>
                <p className="text-xl text-sage-600 font-light max-w-md mx-auto leading-relaxed">
                  A peaceful space for emotional clarity and mindful growth
                </p>
              </div>
            </div>

            {/* Welcome Card */}
            <div className="card">
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-primary-50 to-mint-50 rounded-spa">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sage-900 mb-1">Your Safe Haven</h3>
                    <p className="text-sm text-sage-600 leading-relaxed">
                      This is your private sanctuary to explore emotions, track patterns, and find peace in your journey
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white rounded-spa border border-sage-100">
                    <div className="text-3xl mb-2">🌿</div>
                    <p className="text-xs text-sage-600 font-medium">Calm & Mindful</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-spa border border-sage-100">
                    <div className="text-3xl mb-2">🦋</div>
                    <p className="text-xs text-sage-600 font-medium">Growth Focused</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-spa border border-sage-100">
                    <div className="text-3xl mb-2">💚</div>
                    <p className="text-xs text-sage-600 font-medium">Always Here</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-spa border border-sage-100">
                    <div className="text-3xl mb-2">✨</div>
                    <p className="text-xs text-sage-600 font-medium">Just for You</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Purpose */}
        {step === 2 && (
          <div className="space-y-8 slide-up">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-mint-400 to-primary-400 rounded-full shadow-spa-lg mb-4">
                <Sparkles className="w-10 h-10 text-white" strokeWidth={1.5} />
              </div>
              <h2 className="text-4xl font-serif font-bold text-sage-900 tracking-tight">
                What We Offer You
              </h2>
              <p className="text-lg text-sage-600 max-w-md mx-auto">
                Tools and insights designed for your emotional wellbeing
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: '🌸',
                  title: 'Track Your Emotions',
                  description: 'Log feelings with depth and context, understanding the full spectrum of your emotional experience'
                },
                {
                  icon: '📊',
                  title: 'Discover Patterns',
                  description: 'Visualize your emotional journey over time and gain insights into what influences your wellbeing'
                },
                {
                  icon: '🎵',
                  title: 'Find Your Peace',
                  description: 'Access calming content and wellness activities whenever you need a moment of tranquility'
                },
                {
                  icon: '💚',
                  title: 'Get Support',
                  description: 'Connect with mental health resources and crisis support available 24/7'
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="card group hover:border-primary-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary-100 to-mint-100 rounded-spa flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sage-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-sage-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Personalization */}
        {step === 3 && (
          <div className="space-y-8 slide-up">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-mint-500 rounded-full shadow-spa-lg mb-4">
                <Bell className="w-10 h-10 text-white" strokeWidth={1.5} />
              </div>
              <h2 className="text-4xl font-serif font-bold text-sage-900 tracking-tight">
                Personalize Your Experience
              </h2>
              <p className="text-lg text-sage-600 max-w-md mx-auto">
                Let's tailor this space to support you best
              </p>
            </div>

            <div className="card">
              <div className="space-y-6">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-semibold text-sage-800 mb-3">
                    What should we call you? (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="input-field"
                    placeholder="Your name or nickname"
                  />
                  <p className="text-xs text-sage-500 mt-2">We'll use this to make your experience more personal</p>
                </div>

                {/* Notifications Toggle */}
                <div className="p-5 bg-gradient-to-br from-primary-50 to-mint-50 rounded-spa border border-primary-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Bell className="w-5 h-5 text-primary-600" />
                        <h3 className="font-semibold text-sage-900">Daily Check-in Reminders</h3>
                      </div>
                      <p className="text-sm text-sage-600">Gentle nudges to reflect on your day</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input
                        type="checkbox"
                        checked={formData.notifications}
                        onChange={(e) => handleInputChange('notifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-8 bg-sage-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary-500 shadow-inner"></div>
                    </label>
                  </div>

                  {/* Time Picker (only if notifications enabled) */}
                  {formData.notifications && (
                    <div className="pt-4 border-t border-primary-200">
                      <label className="block text-sm font-medium text-sage-800 mb-2">
                        Preferred check-in time
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

                <div className="p-4 bg-sage-50 rounded-spa border border-sage-200">
                  <p className="text-sm text-sage-700 text-center">
                    <span className="font-medium">🌿 Privacy First:</span> All your data stays private and is stored only on your device
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-12 space-y-4">
          <button
            onClick={handleNext}
            className="w-full btn-primary text-lg group"
          >
            <span>{step === 3 ? 'Begin Your Journey' : step === 1 ? 'Get Started' : 'Continue'}</span>
            <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
          </button>
          
          <button
            onClick={handleSkip}
            className="w-full text-sage-600 hover:text-sage-900 text-sm font-medium transition-colors duration-200 py-2"
          >
            {step === 3 ? 'Skip personalization' : 'Skip'}
          </button>
        </div>

        {/* Progress Text */}
        <div className="text-center mt-8">
          <p className="text-sm text-sage-500">
            Step {step} of 3
          </p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
