import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUserData } from '../utils/storage';
import { Heart, ArrowRight, Sparkles, User, Mail } from 'lucide-react';

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
    { text: "Track my daily emotions", emoji: "📊" },
    { text: "Understand my mood patterns", emoji: "🧠" },
    { text: "Improve my mental wellness", emoji: "🌱" },
    { text: "Share with my therapist", emoji: "💬" },
    { text: "Personal reflection", emoji: "✨" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 px-4 py-8">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl mb-6 breathing-animation shadow-lg shadow-blue-500/25">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gradient mb-3">Welcome to MoodFlow</h1>
          <p className="text-soft text-lg">Your gentle companion for emotional wellness</p>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  i <= step 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30' 
                    : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="card slide-up">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl mb-4">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gradient mb-2">Let's get to know you</h2>
              <p className="text-soft">We'd love to learn a little about you</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3 flex items-center">
                  <span className="mr-2">👋</span>
                  What should we call you?
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="input-field"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-slate-500" />
                  Email address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="input-field"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Usage */}
        {step === 2 && (
          <div className="card slide-up">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl mb-4">
                <Sparkles className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gradient mb-2">What brings you here?</h2>
              <p className="text-soft">Choose what resonates with you most</p>
            </div>
            <div className="space-y-3">
              {usageOptions.map((option) => (
                <button
                  key={option.text}
                  onClick={() => handleInputChange('usage', option.text)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 ${
                    formData.usage === option.text
                      ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-700 shadow-lg shadow-blue-500/20'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-white/80'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">{option.emoji}</span>
                    <span className="font-medium">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-6">
              <p className="text-sm text-soft mb-3">Or share something personal:</p>
              <input
                type="text"
                value={usageOptions.some(opt => opt.text === formData.usage) ? '' : formData.usage}
                onChange={(e) => handleInputChange('usage', e.target.value)}
                className="input-field"
                placeholder="Tell us in your own words..."
              />
            </div>
          </div>
        )}

        {/* Step 3: Importance */}
        {step === 3 && (
          <div className="card slide-up">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-violet-100 rounded-2xl mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gradient mb-2">Almost there!</h2>
              <p className="text-soft">Share what this journey means to you</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-4">
                <span className="mr-2">💭</span>
                Why is emotional wellness important to you?
              </label>
              <textarea
                value={formData.importance}
                onChange={(e) => handleInputChange('importance', e.target.value)}
                className="input-field h-32 resize-none"
                placeholder="Take your time... there's no right or wrong answer. We're here to support you on your journey."
              />
            </div>
          </div>
        )}

        {/* Continue button */}
        <div className="mt-10">
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`w-full flex items-center justify-center space-x-3 py-4 px-8 rounded-2xl font-medium transition-all duration-300 ${
              canProceed()
                ? 'btn-primary shadow-lg hover:shadow-xl'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span className="text-lg">
              {step === 3 ? 'Begin Your Journey' : 'Continue'}
            </span>
            {canProceed() && <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />}
          </button>
          
          {step === 3 && (
            <p className="text-center text-sm text-soft mt-4">
              ✨ Your personal wellness journey starts here
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;