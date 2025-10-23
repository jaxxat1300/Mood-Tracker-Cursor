import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Edit3, Music, TrendingUp, Heart } from 'lucide-react';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/track', icon: Edit3, label: 'Track' },
    { path: '/sanctuary', icon: Music, label: 'Sanctuary' },
    { path: '/insights', icon: TrendingUp, label: 'Insights' },
    { path: '/support', icon: Heart, label: 'Support' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-2 py-2 shadow-lg z-40">
      <div className="flex justify-around items-center max-w-3xl mx-auto">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center py-2 px-3 rounded-modern transition-all duration-200 ${
                isActive
                  ? 'text-accent-600 bg-accent-50'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon size={20} className="mb-1" />
              <span className="text-xs font-medium">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
