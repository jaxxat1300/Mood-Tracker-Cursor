import React, { useState, useEffect } from 'react';
import { getJournalEntries, saveJournalEntry, deleteJournalEntry } from '../utils/storage';
import { BookOpen, Plus, Trash2, Calendar, Sparkles, Shuffle, Heart } from 'lucide-react';

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [newEntryText, setNewEntryText] = useState('');
  const [newEntryTitle, setNewEntryTitle] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [showPrompts, setShowPrompts] = useState(false);

  useEffect(() => {
    const journalEntries = getJournalEntries();
    setEntries(journalEntries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
  }, []);

  const handleSaveEntry = () => {
    if (newEntryText.trim()) {
      const entry = saveJournalEntry({
        title: newEntryTitle.trim() || 'Untitled Entry',
        content: newEntryText.trim(),
      });
      setEntries(prev => [entry, ...prev]);
      setNewEntryText('');
      setNewEntryTitle('');
      setShowNewEntry(false);
    }
  };

  const handleDeleteEntry = (entryId) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      deleteJournalEntry(entryId);
      setEntries(prev => prev.filter(entry => entry.id !== entryId));
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const funPrompts = [
    "If your day was a movie, what genre would it be and why?",
    "Write about your day using only emojis, then translate it!",
    "What would your pet (or dream pet) think about your day?",
    "Describe today's weather and how it matched your mood.",
    "If you could give today a soundtrack, what songs would be on it?",
    "Write a haiku about something that made you smile today.",
    "What superpower would have made your day easier?",
    "If today was a color, what would it be and why?",
    "Write a letter to yesterday's you with advice for today.",
    "What's one thing that happened today that you want to remember forever?",
    "If you could redo one moment from today, what would it be?",
    "Describe your day as if you're a food critic reviewing a meal.",
    "What would you tell a friend who had the exact same day as you?",
    "If your day was a book chapter, what would the title be?",
    "Write about the most unexpected thing that happened today."
  ];

  const getRandomPrompt = () => {
    const randomPrompt = funPrompts[Math.floor(Math.random() * funPrompts.length)];
    setCurrentPrompt(randomPrompt);
    setNewEntryTitle('Prompt Response');
    setShowPrompts(true);
  };

  const usePrompt = () => {
    setNewEntryText(`Prompt: ${currentPrompt}\n\nMy response: `);
    setShowPrompts(false);
    setShowNewEntry(true);
  };

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-500 rounded-2xl mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Journal</h1>
          <p className="text-gray-600 mt-1">Capture your thoughts and reflections</p>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setShowNewEntry(!showNewEntry)}
            className="btn-primary flex items-center justify-center space-x-2"
          >
            <Plus size={20} />
            <span>New Entry</span>
          </button>
          <button
            onClick={getRandomPrompt}
            className="btn-secondary flex items-center justify-center space-x-2"
          >
            <Sparkles size={20} />
            <span>Fun Prompt</span>
          </button>
        </div>

        {/* Fun prompt modal */}
        {showPrompts && (
          <div className="card border-2 border-accent-200 bg-accent-50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-accent-900">✨ Fun Writing Prompt</h2>
              <button
                onClick={() => getRandomPrompt()}
                className="p-2 text-accent-600 hover:bg-accent-100 rounded-lg transition-colors"
              >
                <Shuffle size={20} />
              </button>
            </div>
            <div className="bg-white p-4 rounded-lg mb-4">
              <p className="text-gray-700 leading-relaxed italic">"{currentPrompt}"</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={usePrompt}
                className="flex-1 btn-primary flex items-center justify-center space-x-2"
              >
                <Heart size={16} />
                <span>Use This Prompt</span>
              </button>
              <button
                onClick={() => setShowPrompts(false)}
                className="btn-secondary"
              >
                Maybe Later
              </button>
            </div>
          </div>
        )}

        {/* New entry form */}
        {showNewEntry && (
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">New Journal Entry</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={newEntryTitle}
                onChange={(e) => setNewEntryTitle(e.target.value)}
                placeholder="Entry title (optional)"
                className="input-field"
              />
              <textarea
                value={newEntryText}
                onChange={(e) => setNewEntryText(e.target.value)}
                placeholder="What's on your mind today?"
                className="input-field h-32 resize-none"
              />
              <div className="flex space-x-3">
                <button
                  onClick={handleSaveEntry}
                  disabled={!newEntryText.trim()}
                  className={`flex-1 ${
                    newEntryText.trim()
                      ? 'btn-primary'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed py-3 px-6 rounded-xl'
                  }`}
                >
                  Save Entry
                </button>
                <button
                  onClick={() => {
                    setShowNewEntry(false);
                    setNewEntryText('');
                    setNewEntryTitle('');
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Entries list */}
        <div className="space-y-4">
          {entries.length === 0 ? (
            <div className="card text-center py-8">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No entries yet</h3>
              <p className="text-gray-600 mb-4">Start journaling to capture your thoughts and feelings</p>
              <button
                onClick={() => setShowNewEntry(true)}
                className="btn-primary"
              >
                Write your first entry
              </button>
            </div>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="card">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{entry.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 space-x-2">
                      <Calendar size={14} />
                      <span>{formatDate(entry.timestamp)}</span>
                      <span>•</span>
                      <span>{formatTime(entry.timestamp)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {entry.content}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Journal tips and stats */}
        {entries.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            <div className="card text-center">
              <div className="text-2xl font-bold text-secondary-600 mb-1">{entries.length}</div>
              <div className="text-sm text-gray-600">Total Entries</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-accent-600 mb-1">
                {Math.ceil(entries.length / 7)}
              </div>
              <div className="text-sm text-gray-600">Weeks Journaling</div>
            </div>
          </div>
        )}

        {/* Fun journaling tips */}
        <div className="bg-gradient-to-r from-accent-50 to-secondary-50 border border-accent-200 rounded-xl p-4">
          <h3 className="font-medium text-accent-800 mb-2">💡 Make Journaling Fun!</h3>
          <ul className="text-sm text-accent-700 space-y-1">
            <li>• Try writing with your non-dominant hand</li>
            <li>• Use different colors for different moods</li>
            <li>• Draw doodles or add emojis to your entries</li>
            <li>• Write letters to your future or past self</li>
            <li>• Create lists: favorites, goals, dreams</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Journal;
