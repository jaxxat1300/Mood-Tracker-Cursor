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
    { id: 'happy', label: 'Happy', icon: Smile, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    { id: 'calm', label: 'Calm', icon: Cloud, color: 'text-green-600', bgColor: 'bg-green-100' },
    { id: 'stressed', label: 'Stressed', icon: Zap, color: 'text-red-600', bgColor: 'bg-red-100' },
    { id: 'sad', label: 'Sad', icon: Frown, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { id: 'angry', label: 'Angry', icon: Frown, color: 'text-red-700', bgColor: 'bg-red-200' },
    { id: 'excited', label: 'Excited', icon: Heart, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { id: 'anxious', label: 'Anxious', icon: Zap, color: 'text-orange-600', bgColor: 'bg-orange-100' },
    { id: 'grateful', label: 'Grateful', icon: Heart, color: 'text-pink-600', bgColor: 'bg-pink-100' },
    { id: 'tired', label: 'Tired', icon: Cloud, color: 'text-gray-600', bgColor: 'bg-gray-100' },
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
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {getGreeting()}{userData?.name ? `, ${userData.name}` : ''}!
          </h1>
          <p className="text-gray-600 mt-1">How are you feeling today?</p>
        </div>

        {/* Success message */}
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <p className="text-green-800 font-medium">Mood logged successfully! 🎉</p>
          </div>
        )}

        {/* Today's mood status */}
        {todaysMood && (
          <div className="card text-center">
            <p className="text-sm text-gray-600 mb-2">Today's mood</p>
            <div className="flex items-center justify-center space-x-2">
              {(() => {
                const mood = moodOptions.find(m => m.id === todaysMood.mood);
                const Icon = mood?.icon;
                return (
                  <>
                    <div className={`p-2 rounded-full ${mood?.bgColor}`}>
                      <Icon size={24} className={`text-${mood?.color}`} />
                    </div>
                    <span className="font-medium text-gray-900 capitalize">{mood?.label}</span>
                  </>
                );
              })()}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Logged at {new Date(todaysMood.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        )}

        {/* Daily Questions Modal */}
        {showDailyQuestions && (
          <div className="card border-2 border-primary-200 bg-primary-50">
            <h2 className="text-lg font-semibold text-primary-900 mb-4">Daily Check-in Questions</h2>
            <div className="space-y-3 mb-4">
              {dailyQuestions.slice(0, 3).map((question, index) => (
                <div key={index} className="bg-white p-3 rounded-lg">
                  <p className="text-sm text-gray-700 mb-2">{question}</p>
                  <input 
                    type="text" 
                    placeholder="Your answer..."
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowDailyQuestions(false)}
              className="w-full btn-primary text-sm py-2"
            >
              Continue to Mood Selection →
            </button>
          </div>
        )}

        {/* Multi-Mood Selection */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">How are you feeling?</h2>
          <p className="text-sm text-gray-600 mb-4">Select all that apply - you can feel multiple things at once!</p>
          
          <div className="grid grid-cols-3 gap-2 mb-4">
            {moodOptions.map((mood) => {
              const Icon = mood.icon;
              const isSelected = selectedMoods.includes(mood.id);
              return (
                <button
                  key={mood.id}
                  onClick={() => handleMoodToggle(mood.id)}
                  className={`mood-button ${mood.bgColor} transition-all duration-200 ${
                    isSelected 
                      ? 'ring-2 ring-primary-500 scale-105 shadow-md' 
                      : 'hover:scale-105'
                  }`}
                >
                  <Icon size={20} className={`${mood.color} mb-1`} />
                  <span className="text-xs font-medium text-gray-700">{mood.label}</span>
                  {isSelected && (
                    <div className="absolute top-1 right-1 w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {selectedMoods.length > 0 && (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {selectedMoods.map(moodId => {
                  const mood = moodOptions.find(m => m.id === moodId);
                  return (
                    <span key={moodId} className={`px-3 py-1 rounded-full text-sm ${mood.bgColor} ${mood.color}`}>
                      {mood.label}
                    </span>
                  );
                })}
              </div>
              <button
                onClick={handleSaveMoods}
                className="w-full btn-primary"
              >
                Save My Mood{selectedMoods.length > 1 ? 's' : ''} ({selectedMoods.length})
              </button>
            </div>
          )}
        </div>

        {/* Mood history chart */}
        {moodEntries.length > 0 && (
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Mood Trend</h2>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getRecentMoodData()}>
                  <XAxis dataKey="day" hide />
                  <YAxis hide domain={[1, 6]} />
                  <Line 
                    type="monotone" 
                    dataKey="mood" 
                    stroke="#0ea5e9" 
                    strokeWidth={3}
                    dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              Last {Math.min(moodEntries.length, 7)} entries
            </p>
          </div>
        )}

        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="card text-center">
            <p className="text-2xl font-bold text-primary-600">{moodEntries.length}</p>
            <p className="text-sm text-gray-600">Total Check-ins</p>
          </div>
          <div className="card text-center">
            <p className="text-2xl font-bold text-secondary-600">
              {moodEntries.length > 0 ? Math.ceil(moodEntries.length / 7) : 0}
            </p>
            <p className="text-sm text-gray-600">Weeks Tracked</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
