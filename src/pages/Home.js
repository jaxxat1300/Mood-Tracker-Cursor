import React, { useState, useEffect } from 'react';
import { getUserData, getMoodEntries, saveMoodEntry } from '../utils/storage';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Smile, Frown, Heart, Zap, Cloud } from 'lucide-react';

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [moodEntries, setMoodEntries] = useState([]);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDailyQuestions, setShowDailyQuestions] = useState(false);

  useEffect(() => {
    const user = getUserData();
    const entries = getMoodEntries();
    setUserData(user);
    setMoodEntries(entries);
    
    // Check if daily questions should be shown
    const today = new Date().toDateString();
    const todaysEntry = entries.find(entry => 
      new Date(entry.timestamp).toDateString() === today
    );
    if (!todaysEntry) {
      setShowDailyQuestions(true);
    }
  }, []);

  const moodOptions = [
    { id: 'happy', label: 'Happy', icon: Smile, color: 'text-amber-600', bgColor: 'bg-gradient-to-br from-amber-50 to-yellow-50', emoji: '😊' },
    { id: 'calm', label: 'Calm', icon: Cloud, color: 'text-emerald-600', bgColor: 'bg-gradient-to-br from-emerald-50 to-green-50', emoji: '😌' },
    { id: 'stressed', label: 'Stressed', icon: Zap, color: 'text-red-500', bgColor: 'bg-gradient-to-br from-red-50 to-rose-50', emoji: '😰' },
    { id: 'sad', label: 'Sad', icon: Frown, color: 'text-blue-600', bgColor: 'bg-gradient-to-br from-blue-50 to-sky-50', emoji: '😢' },
    { id: 'angry', label: 'Frustrated', icon: Frown, color: 'text-red-600', bgColor: 'bg-gradient-to-br from-red-50 to-orange-50', emoji: '😤' },
    { id: 'excited', label: 'Excited', icon: Heart, color: 'text-purple-600', bgColor: 'bg-gradient-to-br from-purple-50 to-violet-50', emoji: '🤩' },
    { id: 'anxious', label: 'Anxious', icon: Zap, color: 'text-orange-600', bgColor: 'bg-gradient-to-br from-orange-50 to-amber-50', emoji: '😟' },
    { id: 'grateful', label: 'Grateful', icon: Heart, color: 'text-pink-600', bgColor: 'bg-gradient-to-br from-pink-50 to-rose-50', emoji: '🥰' },
    { id: 'tired', label: 'Tired', icon: Cloud, color: 'text-slate-600', bgColor: 'bg-gradient-to-br from-slate-50 to-gray-50', emoji: '😴' },
  ];

  const handleMoodToggle = (moodId) => {
    setSelectedMoods(prev => {
      if (prev.includes(moodId)) {
        return prev.filter(id => id !== moodId);
      } else {
        return [...prev, moodId];
      }
    });
  };

  const handleSaveMoods = () => {
    if (selectedMoods.length > 0) {
      const newEntry = saveMoodEntry({ 
        moods: selectedMoods,
        intensity: selectedMoods.length 
      });
      setMoodEntries(prev => [...prev, newEntry]);
      setSelectedMoods([]);
      setShowSuccess(true);
      setShowDailyQuestions(false);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getRecentMoodData = () => {
    const last7Days = moodEntries.slice(-7).map((entry, index) => ({
      day: index + 1,
      mood: moodOptions.findIndex(m => m.id === entry.mood) + 1,
    }));
    return last7Days;
  };

  const getTodaysMood = () => {
    const today = new Date().toDateString();
    return moodEntries.find(entry => 
      new Date(entry.timestamp).toDateString() === today
    );
  };

  const dailyQuestions = [
    "What's one thing you're grateful for today?",
    "How did you sleep last night?",
    "What's your energy level right now?",
    "What's the best part of your day so far?",
    "How are you feeling about tomorrow?",
    "What made you smile today?",
    "How stressed do you feel on a scale of 1-10?"
  ];

  const todaysMood = getTodaysMood();

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-lg mx-auto space-y-8">
        {/* Header */}
        <div className="text-center fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl mb-4 shadow-lg shadow-blue-500/25">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gradient mb-2">
            {getGreeting()}{userData?.name ? `, ${userData.name}` : ''}!
          </h1>
          <p className="text-soft text-lg">How is your heart feeling today?</p>
        </div>

        {/* Success message */}
        {showSuccess && (
          <div className="card-minimal bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 text-center slide-up">
            <p className="text-green-700 font-medium text-lg">✨ Thank you for sharing! ✨</p>
            <p className="text-green-600 text-sm mt-1">Your feelings matter and you're doing great.</p>
          </div>
        )}

        {/* Today's mood status */}
        {todaysMood && (
          <div className="card-minimal text-center slide-up">
            <p className="text-sm text-soft mb-3">Today's emotional state</p>
            <div className="flex items-center justify-center space-x-3">
              {(() => {
                const mood = moodOptions.find(m => m.id === todaysMood.mood);
                const Icon = mood?.icon;
                return (
                  <>
                    <div className={`p-3 rounded-2xl ${mood?.bgColor} shadow-sm`}>
                      <Icon size={28} className={mood?.color} />
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800 text-lg capitalize">{mood?.label}</span>
                      <p className="text-xs text-soft mt-1">
                        {new Date(todaysMood.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {/* Daily Questions Modal */}
        {showDailyQuestions && (
          <div className="card border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 slide-up">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-3">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gradient mb-2">Gentle Check-in</h2>
              <p className="text-soft">Take a moment to reflect</p>
            </div>
            <div className="space-y-4 mb-6">
              {dailyQuestions.slice(0, 3).map((question, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
                  <p className="text-sm text-slate-700 mb-3 font-medium">{question}</p>
                  <input 
                    type="text" 
                    placeholder="Take your time..."
                    className="input-field text-sm"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowDailyQuestions(false)}
              className="w-full btn-primary text-sm py-3"
            >
              Continue to Mood Selection →
            </button>
          </div>
        )}

        {/* Multi-Mood Selection */}
        <div className="card slide-up">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gradient mb-2">How are you feeling right now?</h2>
            <p className="text-soft">Select all that resonate - emotions are complex and valid</p>
          </div>
          
          <div className="grid grid-cols-3 gap-3 mb-6">
            {moodOptions.map((mood) => {
              const isSelected = selectedMoods.includes(mood.id);
              return (
                <button
                  key={mood.id}
                  onClick={() => handleMoodToggle(mood.id)}
                  className={`relative mood-button ${mood.bgColor} transition-all duration-300 ${
                    isSelected 
                      ? 'ring-2 ring-blue-400 scale-105 shadow-lg shadow-blue-500/20' 
                      : 'hover:scale-105 hover:shadow-md'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-2xl">{mood.emoji}</span>
                    <span className="text-xs font-medium text-slate-700">{mood.label}</span>
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {selectedMoods.length > 0 && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {selectedMoods.map(moodId => {
                  const mood = moodOptions.find(m => m.id === moodId);
                  return (
                    <span key={moodId} className={`px-4 py-2 rounded-2xl text-sm font-medium ${mood.bgColor} ${mood.color} shadow-sm`}>
                      {mood.emoji} {mood.label}
                    </span>
                  );
                })}
              </div>
              <button
                onClick={handleSaveMoods}
                className="w-full btn-primary text-lg py-4"
              >
                💝 Save My Feelings ({selectedMoods.length})
              </button>
              <p className="text-center text-xs text-soft">
                Thank you for being honest with yourself today
              </p>
            </div>
          )}
        </div>

        {/* Mood history chart */}
        {moodEntries.length > 0 && (
          <div className="card slide-up">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gradient mb-2">Your Emotional Journey</h2>
              <p className="text-soft">Seeing patterns helps us grow</p>
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getRecentMoodData()}>
                  <XAxis dataKey="day" hide />
                  <YAxis hide domain={[1, 6]} />
                  <Line 
                    type="monotone" 
                    dataKey="mood" 
                    stroke="url(#moodGradient)" 
                    strokeWidth={4}
                    dot={{ fill: '#3b82f6', strokeWidth: 3, r: 6 }}
                    activeDot={{ r: 8, fill: '#3b82f6' }}
                  />
                  <defs>
                    <linearGradient id="moodGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-soft text-center mt-3">
              Last {Math.min(moodEntries.length, 7)} check-ins
            </p>
          </div>
        )}

        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="card-minimal text-center slide-up">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl mb-3">
              <Heart className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gradient">{moodEntries.length}</p>
            <p className="text-sm text-soft">Check-ins</p>
          </div>
          <div className="card-minimal text-center slide-up">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl mb-3">
              <Cloud className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-gradient">
              {moodEntries.length > 0 ? Math.ceil(moodEntries.length / 7) : 0}
            </p>
            <p className="text-sm text-soft">Weeks of Growth</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
