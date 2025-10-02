import React, { useState, useEffect } from 'react';
import { getUserData, getMoodEntries, saveMoodEntry } from '../utils/storage';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Smile, Frown, Heart, Zap, Cloud } from 'lucide-react';

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [moodEntries, setMoodEntries] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const user = getUserData();
    const entries = getMoodEntries();
    setUserData(user);
    setMoodEntries(entries);
  }, []);

  const moodOptions = [
    { id: 'happy', label: 'Happy', icon: Smile, color: 'mood-happy', bgColor: 'bg-yellow-100' },
    { id: 'calm', label: 'Calm', icon: Cloud, color: 'mood-calm', bgColor: 'bg-green-100' },
    { id: 'stressed', label: 'Stressed', icon: Zap, color: 'mood-stressed', bgColor: 'bg-red-100' },
    { id: 'sad', label: 'Sad', icon: Frown, color: 'mood-sad', bgColor: 'bg-blue-100' },
    { id: 'angry', label: 'Angry', icon: Frown, color: 'mood-angry', bgColor: 'bg-red-200' },
    { id: 'excited', label: 'Excited', icon: Heart, color: 'mood-excited', bgColor: 'bg-purple-100' },
  ];

  const handleMoodSelect = (moodId) => {
    const newEntry = saveMoodEntry({ mood: moodId });
    setMoodEntries(prev => [...prev, newEntry]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
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

        {/* Mood check-in */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Daily Check-in</h2>
          <div className="grid grid-cols-3 gap-3">
            {moodOptions.map((mood) => {
              const Icon = mood.icon;
              return (
                <button
                  key={mood.id}
                  onClick={() => handleMoodSelect(mood.id)}
                  className={`mood-button ${mood.bgColor} hover:scale-105 transition-transform duration-200`}
                >
                  <Icon size={24} className={`text-${mood.color} mb-2`} />
                  <span className="text-sm font-medium text-gray-700">{mood.label}</span>
                </button>
              );
            })}
          </div>
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
