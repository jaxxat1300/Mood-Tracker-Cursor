import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData, getMoodEntries } from '../utils/storage';
import { Edit3, TrendingUp, Music, Heart, Calendar, Flame, Phone, AlertCircle } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [moodEntries, setMoodEntries] = useState([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const user = getUserData();
    const entries = getMoodEntries();
    setUserData(user);
    setMoodEntries(entries);
    
    // Calculate streak
    const today = new Date().toDateString();
    let currentStreak = 0;
    const sortedEntries = entries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    if (sortedEntries.length > 0 && new Date(sortedEntries[0].timestamp).toDateString() === today) {
      currentStreak = 1;
      for (let i = 1; i < sortedEntries.length; i++) {
        const prevDate = new Date(sortedEntries[i-1].timestamp);
        const currDate = new Date(sortedEntries[i].timestamp);
        const diffDays = Math.floor((prevDate - currDate) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          currentStreak++;
        } else if (diffDays > 1) {
          break;
        }
      }
    }
    setStreak(currentStreak);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getTodaysMood = () => {
    const today = new Date().toDateString();
    return moodEntries.find(entry => 
      new Date(entry.timestamp).toDateString() === today
    );
  };

  const todaysMood = getTodaysMood();

  const quickActions = [
    { 
      title: 'Track Mood', 
      description: 'Log how you\'re feeling',
      icon: Edit3, 
      color: 'bg-accent-50 text-accent-600',
      path: '/track'
    },
    { 
      title: 'View Insights', 
      description: 'See your patterns',
      icon: TrendingUp, 
      color: 'bg-purple-50 text-purple-600',
      path: '/insights'
    },
    { 
      title: 'Sanctuary', 
      description: 'Comfort content',
      icon: Music, 
      color: 'bg-green-50 text-green-600',
      path: '/sanctuary'
    },
    { 
      title: 'Support', 
      description: 'Get help & resources',
      icon: Heart, 
      color: 'bg-red-50 text-red-600',
      path: '/support'
    },
  ];

  return (
    <div className="min-h-screen px-4 py-8 pb-24">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="fade-in text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-mint-500 rounded-full shadow-spa-lg mb-4 float">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-sage-900 mb-3 tracking-tight">
            {getGreeting()}{userData?.name ? `, ${userData.name}` : ''}
          </h1>
          <p className="text-lg text-sage-600">How is your heart today?</p>
        </div>

        {/* Crisis Resources - Always Visible */}
        <div className="crisis-banner">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-danger flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-danger mb-2">Need immediate help?</h3>
              <p className="text-sm text-text-primary mb-3">Crisis support is available 24/7. You're not alone.</p>
              <div className="flex flex-wrap gap-2">
                <a 
                  href="tel:988" 
                  className="inline-flex items-center space-x-2 bg-danger hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-modern transition-all duration-200"
                >
                  <Phone size={16} />
                  <span>Call 988</span>
                </a>
                <a 
                  href="sms:988" 
                  className="inline-flex items-center space-x-2 bg-white hover:bg-gray-50 text-danger border border-danger text-sm font-medium py-2 px-4 rounded-modern transition-all duration-200"
                >
                  <span>Text 988</span>
                </a>
                <button
                  onClick={() => navigate('/support')}
                  className="inline-flex items-center space-x-2 bg-white hover:bg-gray-50 text-text-primary border border-border text-sm font-medium py-2 px-4 rounded-modern transition-all duration-200"
                >
                  <Heart size={16} />
                  <span>More Resources</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Check-in Status */}
        <div className="card slide-up">
          {todaysMood ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-success rounded-modern flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-text-primary">Today's mood logged</p>
                  <p className="text-sm text-text-secondary capitalize">
                    Feeling {todaysMood.emotion || todaysMood.mood} at {new Date(todaysMood.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate('/track')}
                className="text-sm text-accent-600 hover:text-accent-700 font-medium"
              >
                Update
              </button>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-accent-50 rounded-modern flex items-center justify-center mx-auto mb-4">
                <Edit3 className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Ready to check in?</h3>
              <p className="text-sm text-text-secondary mb-4">Take a moment to track your mood</p>
              <button
                onClick={() => navigate('/track')}
                className="btn-primary"
              >
                Log Your Mood
              </button>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="card text-center">
            <Flame className="w-8 h-8 text-warning mx-auto mb-2" />
            <p className="text-3xl font-semibold text-text-primary">{streak}</p>
            <p className="text-sm text-text-secondary">Day Streak</p>
          </div>
          <div className="card text-center">
            <Calendar className="w-8 h-8 text-accent-600 mx-auto mb-2" />
            <p className="text-3xl font-semibold text-text-primary">{moodEntries.length}</p>
            <p className="text-sm text-text-secondary">Total Entries</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.title}
                  onClick={() => navigate(action.path)}
                  className="card text-left hover:shadow-modern-hover transition-all duration-200 group"
                >
                  <div className={`w-10 h-10 ${action.color} rounded-modern flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="font-semibold text-text-primary text-sm mb-1">{action.title}</h3>
                  <p className="text-xs text-text-secondary">{action.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Entries */}
        {moodEntries.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-text-primary">Recent Check-ins</h2>
              <button
                onClick={() => navigate('/insights')}
                className="text-sm text-accent-600 hover:text-accent-700 font-medium"
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {moodEntries.slice(-3).reverse().map((entry) => (
                <div key={entry.id} className="card-minimal">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-text-primary capitalize text-sm">
                        {entry.emotion || entry.mood || 'Mood logged'}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {new Date(entry.timestamp).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })} at {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {entry.intensity && (
                      <div className="text-right">
                        <p className="text-xs text-text-secondary">Intensity</p>
                        <p className="text-sm font-semibold text-accent-600">{entry.intensity}/10</p>
                      </div>
                    )}
                  </div>
                  {entry.note && (
                    <p className="text-xs text-text-secondary mt-2 line-clamp-2">{entry.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Motivational Quote */}
        <div className="card bg-gradient-to-br from-accent-50 to-purple-50 border-accent-200">
          <p className="text-sm text-text-primary italic mb-2">
            "Your feelings are valid. Taking time to understand them is a strength, not a weakness."
          </p>
          <p className="text-xs text-text-secondary text-right">— MoodFlow</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
