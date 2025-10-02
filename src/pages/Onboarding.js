import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUserData } from '../utils/storage';
import { Heart, ArrowRight } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    usage: '',
    importance: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Save user data and navigate to home
      saveUserData({
        ...formData,
        onboardedAt: new Date().toISOString(),
      });
      navigate('/');
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.name.trim() && formData.email.trim();
      case 2:
        return formData.usage.trim();
      case 3:
        return formData.importance.trim();
      default:
        return false;
    }
  };

  const usageOptions = [
    "Track my daily emotions",
    "Understand my mood patterns",
    "Improve my mental wellness",
    "Share with my therapist",
    "Personal reflection",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 px-4 py-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-2xl mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to MoodFlow</h1>
          <p className="text-gray-600">Your personal mood tracking companion</p>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  i <= step ? 'bg-primary-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Let's get to know you</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What's your name?
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="input-field"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="input-field"
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Usage */}
        {step === 2 && (
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              How do you want to use this app?
            </h2>
            <div className="space-y-3">
              {usageOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleInputChange('usage', option)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.usage === option
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="mt-4">
              <input
                type="text"
                value={formData.usage.startsWith('Track') || formData.usage.startsWith('Understand') || formData.usage.startsWith('Improve') || formData.usage.startsWith('Share') || formData.usage.startsWith('Personal') ? '' : formData.usage}
                onChange={(e) => handleInputChange('usage', e.target.value)}
                className="input-field"
                placeholder="Or write your own..."
              />
            </div>
          </div>
        )}

        {/* Step 3: Importance */}
        {step === 3 && (
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Why is mood tracking important to you?
            </h2>
            <textarea
              value={formData.importance}
              onChange={(e) => handleInputChange('importance', e.target.value)}
              className="input-field h-32 resize-none"
              placeholder="Share your thoughts... This helps us personalize your experience."
            />
          </div>
        )}

        {/* Continue button */}
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className={`w-full flex items-center justify-center space-x-2 mt-8 ${
            canProceed()
              ? 'btn-primary'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed py-3 px-6 rounded-xl'
          }`}
        >
          <span>{step === 3 ? 'Get Started' : 'Continue'}</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
