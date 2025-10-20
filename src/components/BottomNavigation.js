import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, User, Sparkles, StickyNote } from 'lucide-react';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/journal', icon: BookOpen, label: 'Journal' },
    { path: '/notes', icon: StickyNote, label: 'Notes' },
    { path: '/activities', icon: Sparkles, label: 'Activities' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-white/20 px-4 py-3 safe-area-inset-bottom shadow-lg shadow-slate-200/50">
      <div className="flex justify-around items-center max-w-lg mx-auto">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center py-3 px-4 rounded-2xl transition-all duration-300 group ${
                isActive
                  ? 'text-blue-600 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg shadow-blue-500/20'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50/80'
              }`}
            >
              <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                <Icon size={22} className="mb-1" />
              </div>
              <span className={`text-xs font-medium transition-all duration-300 ${
                isActive ? 'text-blue-600' : 'text-slate-500'
              }`}>
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
