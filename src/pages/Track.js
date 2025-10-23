import React, { useState } from 'react';
import { saveMoodEntry } from '../utils/storage';
import { Check, X } from 'lucide-react';

const Track = () => {
  const [selectedQuadrant, setSelectedQuadrant] = useState(null);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [intensity, setIntensity] = useState(5);
  const [clarity, setClarity] = useState(5);
  const [control, setControl] = useState(5);
  const [selectedTags, setSelectedTags] = useState([]);
  const [note, setNote] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const quadrants = {
    'high-pleasant': {
      label: 'High Energy + Pleasant',
      color: 'bg-yellow-50 border-yellow-300',
      emotions: ['Excited', 'Joyful', 'Energized', 'Motivated', 'Inspired']
    },
    'high-unpleasant': {
      label: 'High Energy + Unpleasant',
      color: 'bg-red-50 border-red-300',
      emotions: ['Anxious', 'Stressed', 'Angry', 'Frustrated', 'Overwhelmed']
    },
    'low-pleasant': {
      label: 'Low Energy + Pleasant',
      color: 'bg-green-50 border-green-300',
      emotions: ['Calm', 'Content', 'Peaceful', 'Relaxed', 'Satisfied']
    },
    'low-unpleasant': {
      label: 'Low Energy + Unpleasant',
      color: 'bg-blue-50 border-blue-300',
      emotions: ['Sad', 'Tired', 'Lonely', 'Numb', 'Hopeless']
    }
  };

  const contextTags = [
    { id: 'work', label: 'Work', icon: '🏢' },
    { id: 'social', label: 'Social', icon: '👥' },
    { id: 'relationship', label: 'Relationship', icon: '❤️' },
    { id: 'health', label: 'Health', icon: '💪' },
    { id: 'study', label: 'Study', icon: '📚' },
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'financial', label: 'Financial', icon: '💰' },
    { id: 'personal', label: 'Personal', icon: '🎯' },
  ];

  const handleSave = () => {
    if (!selectedEmotion) return;

    const entry = {
      quadrant: selectedQuadrant,
      emotion: selectedEmotion,
      intensity,
      clarity,
      control,
      tags: selectedTags,
      note,
      // Keep backwards compatibility
      mood: selectedEmotion.toLowerCase(),
      activities: selectedTags
    };

    saveMoodEntry(entry);
    
    // Reset form
    setSelectedQuadrant(null);
    setSelectedEmotion(null);
    setIntensity(5);
    setClarity(5);
    setControl(5);
    setSelectedTags([]);
    setNote('');
    setShowSuccess(true);
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const toggleTag = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(t => t !== tagId));
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-6 pb-24">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-text-primary">Track Your Mood</h1>
          <p className="text-text-secondary mt-1">How are you feeling right now?</p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="card bg-green-50 border-green-200 text-center slide-up">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-success rounded-full mb-3">
              <Check className="w-6 h-6 text-white" />
            </div>
            <p className="text-success font-medium">Mood logged successfully!</p>
            <p className="text-sm text-text-secondary mt-1">Your feelings are valid and important</p>
          </div>
        )}

        {/* Step 1: Quadrant Selection */}
        <div className="card">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Step 1: Choose Your Quadrant</h2>
          <p className="text-sm text-text-secondary mb-4">Select the area that best describes your current state</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(quadrants).map(([key, quad]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedQuadrant(key);
                  setSelectedEmotion(null);
                }}
                className={`p-4 rounded-modern border-2 transition-all duration-200 text-left ${
                  selectedQuadrant === key 
                    ? quad.color + ' border-opacity-100' 
                    : 'bg-white border-border hover:border-accent-600'
                }`}
              >
                <p className="font-medium text-text-primary text-sm mb-2">{quad.label}</p>
                <div className="flex flex-wrap gap-1">
                  {quad.emotions.slice(0, 3).map((emotion, idx) => (
                    <span key={idx} className="text-xs text-text-secondary">
                      {emotion}{idx < 2 ? ',' : ''}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Specific Emotion */}
        {selectedQuadrant && (
          <div className="card slide-up">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Step 2: Select Specific Emotion</h2>
            <div className="flex flex-wrap gap-2">
              {quadrants[selectedQuadrant].emotions.map((emotion) => (
                <button
                  key={emotion}
                  onClick={() => setSelectedEmotion(emotion)}
                  className={`px-4 py-2 rounded-modern font-medium transition-all duration-200 ${
                    selectedEmotion === emotion
                      ? 'bg-accent-600 text-white'
                      : 'bg-white border border-border text-text-primary hover:border-accent-600'
                  }`}
                >
                  {emotion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Intensity Sliders */}
        {selectedEmotion && (
          <div className="card slide-up">
            <h2 className="text-lg font-semibold text-text-primary mb-6">Step 3: Describe the Feeling</h2>
            
            <div className="space-y-6">
              {/* Intensity */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-text-primary">Intensity</label>
                  <span className="text-sm font-semibold text-accent-600">{intensity}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={intensity}
                  onChange={(e) => setIntensity(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-modern appearance-none cursor-pointer accent-accent-600"
                />
                <div className="flex justify-between text-xs text-text-secondary mt-1">
                  <span>Mild</span>
                  <span>Strong</span>
                </div>
              </div>

              {/* Clarity */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-text-primary">Clarity</label>
                  <span className="text-sm font-semibold text-accent-600">{clarity}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={clarity}
                  onChange={(e) => setClarity(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-modern appearance-none cursor-pointer accent-accent-600"
                />
                <div className="flex justify-between text-xs text-text-secondary mt-1">
                  <span>Confused</span>
                  <span>Clear</span>
                </div>
              </div>

              {/* Control */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-text-primary">Control</label>
                  <span className="text-sm font-semibold text-accent-600">{control}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={control}
                  onChange={(e) => setControl(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-modern appearance-none cursor-pointer accent-accent-600"
                />
                <div className="flex justify-between text-xs text-text-secondary mt-1">
                  <span>Overwhelming</span>
                  <span>Manageable</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Context Tags */}
        {selectedEmotion && (
          <div className="card slide-up">
            <h2 className="text-lg font-semibold text-text-primary mb-2">Step 4: Context (Optional)</h2>
            <p className="text-sm text-text-secondary mb-4">Select up to 3 tags</p>
            
            <div className="flex flex-wrap gap-2">
              {contextTags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  disabled={!selectedTags.includes(tag.id) && selectedTags.length >= 3}
                  className={`px-4 py-2 rounded-modern font-medium transition-all duration-200 flex items-center space-x-2 ${
                    selectedTags.includes(tag.id)
                      ? 'bg-accent-600 text-white'
                      : 'bg-white border border-border text-text-primary hover:border-accent-600 disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  <span>{tag.icon}</span>
                  <span className="text-sm">{tag.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Note */}
        {selectedEmotion && (
          <div className="card slide-up">
            <h2 className="text-lg font-semibold text-text-primary mb-2">Step 5: Add a Note (Optional)</h2>
            <p className="text-sm text-text-secondary mb-4">What's on your mind?</p>
            
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="input-field h-32 resize-none"
              placeholder="Express your thoughts here..."
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-text-secondary">Your note is private and saved locally</p>
              <span className="text-xs text-text-secondary">{note.length}/500</span>
            </div>
          </div>
        )}

        {/* Save Button */}
        {selectedEmotion && (
          <div className="sticky bottom-20 slide-up">
            <button
              onClick={handleSave}
              className="w-full btn-primary py-4 flex items-center justify-center space-x-2 shadow-lg"
            >
              <Check size={20} />
              <span className="text-lg font-semibold">Save Mood Entry</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Track;

