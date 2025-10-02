import React, { useState } from 'react';
import { Sparkles, Puzzle, BookOpen, Wind, ArrowLeft } from 'lucide-react';

const Activities = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);

  const activities = [
    {
      id: 'puzzle',
      title: 'Daily Puzzle',
      description: 'Challenge your mind with a quick brain teaser',
      icon: Puzzle,
      color: 'bg-purple-100',
      textColor: 'text-purple-600',
    },
    {
      id: 'journal-prompt',
      title: 'Guided Journal',
      description: 'Reflect with a thoughtful writing prompt',
      icon: BookOpen,
      color: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
    {
      id: 'breathing',
      title: 'Breathing Exercise',
      description: 'Calm your mind with guided breathing',
      icon: Wind,
      color: 'bg-green-100',
      textColor: 'text-green-600',
    },
  ];

  const journalPrompts = [
    "What are three things that brought you joy this week?",
    "Describe a moment when you felt proud of yourself recently.",
    "What would you tell your younger self about handling difficult emotions?",
    "Write about a person who makes you feel supported and why.",
    "What does self-care look like for you today?",
    "Describe your ideal day. What elements can you incorporate into your real life?",
    "What challenge are you currently facing, and what strengths do you have to handle it?",
    "Write about a time when you overcame something difficult. What did you learn?",
  ];

  const puzzles = [
    {
      question: "I am not alive, but I grow; I don't have lungs, but I need air; I don't have a mouth, but water kills me. What am I?",
      answer: "Fire",
      hint: "Think about something that needs oxygen to survive but isn't living."
    },
    {
      question: "The more you take, the more you leave behind. What am I?",
      answer: "Footsteps",
      hint: "Think about walking and what you create as you move."
    },
    {
      question: "What has keys but no locks, space but no room, and you can enter but can't go inside?",
      answer: "A keyboard",
      hint: "Think about something you use every day with your computer."
    },
  ];

  const getRandomPrompt = () => {
    return journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
  };

  const getRandomPuzzle = () => {
    return puzzles[Math.floor(Math.random() * puzzles.length)];
  };

  const renderActivityDetail = () => {
    switch (selectedActivity) {
      case 'puzzle':
        return <PuzzleActivity puzzle={getRandomPuzzle()} />;
      case 'journal-prompt':
        return <JournalPromptActivity prompt={getRandomPrompt()} />;
      case 'breathing':
        return <BreathingActivity />;
      default:
        return null;
    }
  };

  if (selectedActivity) {
    return (
      <div className="min-h-screen px-4 py-6">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => setSelectedActivity(null)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back to Activities</span>
          </button>
          {renderActivityDetail()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 rounded-2xl mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Activities</h1>
          <p className="text-gray-600 mt-1">Boost your mood with mindful activities</p>
        </div>

        {/* Activity cards */}
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <button
                key={activity.id}
                onClick={() => setSelectedActivity(activity.id)}
                className="w-full card hover:shadow-md transition-all duration-200 text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${activity.color}`}>
                    <Icon size={24} className={activity.textColor} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                  </div>
                  <div className="text-gray-400">
                    <ArrowLeft size={20} className="rotate-180" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tips */}
        <div className="bg-accent-50 border border-accent-200 rounded-xl p-4">
          <h3 className="font-medium text-accent-800 mb-2">💡 Activity Tips</h3>
          <ul className="text-sm text-accent-700 space-y-1">
            <li>• Take your time - there's no rush</li>
            <li>• Find a quiet, comfortable space</li>
            <li>• Try different activities to see what works for you</li>
            <li>• Use these when you need a mental break</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const PuzzleActivity = ({ puzzle }) => {
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500 rounded-2xl mb-4">
          <Puzzle className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Daily Puzzle</h2>
        <p className="text-gray-600 mt-1">Exercise your mind with this riddle</p>
      </div>

      <div className="card">
        <h3 className="font-semibold text-gray-900 mb-4">Riddle</h3>
        <p className="text-gray-700 leading-relaxed mb-6">{puzzle.question}</p>
        
        <div className="space-y-4">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Your answer..."
            className="input-field"
          />
          
          <div className="flex space-x-3">
            <button
              onClick={() => setShowHint(!showHint)}
              className="btn-secondary flex-1"
            >
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="btn-primary flex-1"
            >
              {showAnswer ? 'Hide Answer' : 'Show Answer'}
            </button>
          </div>
        </div>

        {showHint && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800"><strong>Hint:</strong> {puzzle.hint}</p>
          </div>
        )}

        {showAnswer && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800"><strong>Answer:</strong> {puzzle.answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const JournalPromptActivity = ({ prompt }) => {
  const [response, setResponse] = useState('');

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl mb-4">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Guided Journal</h2>
        <p className="text-gray-600 mt-1">Reflect on today's prompt</p>
      </div>

      <div className="card">
        <h3 className="font-semibold text-gray-900 mb-4">Today's Prompt</h3>
        <p className="text-gray-700 leading-relaxed mb-6 italic">"{prompt}"</p>
        
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Take your time to reflect and write your thoughts..."
          className="input-field h-40 resize-none"
        />
        
        <div className="mt-4 text-sm text-gray-500">
          <p>💡 There are no right or wrong answers. Write whatever comes to mind.</p>
        </div>
      </div>
    </div>
  );
};

const BreathingActivity = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('inhale'); // inhale, hold, exhale
  const [count, setCount] = useState(4);
  const [cycle, setCycle] = useState(0);

  React.useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setCount(prev => {
          if (prev === 1) {
            if (phase === 'inhale') {
              setPhase('hold');
              return 4;
            } else if (phase === 'hold') {
              setPhase('exhale');
              return 4;
            } else {
              setPhase('inhale');
              setCycle(c => c + 1);
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, phase]);

  const getInstruction = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      default:
        return 'Breathe In';
    }
  };

  const getColor = () => {
    switch (phase) {
      case 'inhale':
        return 'bg-blue-500';
      case 'hold':
        return 'bg-yellow-500';
      case 'exhale':
        return 'bg-green-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-2xl mb-4">
          <Wind className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Breathing Exercise</h2>
        <p className="text-gray-600 mt-1">4-4-4 breathing technique</p>
      </div>

      <div className="card text-center">
        <div className={`w-32 h-32 mx-auto rounded-full ${getColor()} flex items-center justify-center mb-6 transition-all duration-1000 ${isActive ? 'scale-110' : 'scale-100'}`}>
          <div className="text-white">
            <div className="text-2xl font-bold">{count}</div>
            <div className="text-sm">{getInstruction()}</div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-900 mb-2">{getInstruction()}</p>
          <p className="text-gray-600">Cycle {cycle + 1}</p>
        </div>

        <button
          onClick={() => {
            setIsActive(!isActive);
            if (!isActive) {
              setPhase('inhale');
              setCount(4);
              setCycle(0);
            }
          }}
          className={`w-full ${isActive ? 'btn-secondary' : 'btn-primary'}`}
        >
          {isActive ? 'Stop' : 'Start Breathing Exercise'}
        </button>

        {cycle >= 5 && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">🎉 Great job! You've completed 5 breathing cycles.</p>
          </div>
        )}
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <h3 className="font-medium text-green-800 mb-2">How it works</h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• Inhale for 4 seconds</li>
          <li>• Hold your breath for 4 seconds</li>
          <li>• Exhale for 4 seconds</li>
          <li>• Repeat for 5-10 cycles</li>
        </ul>
      </div>
    </div>
  );
};

export default Activities;
