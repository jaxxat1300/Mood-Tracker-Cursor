// Local storage utilities for MoodFlow app

export const STORAGE_KEYS = {
  USER_DATA: 'moodflow_user_data',
  MOOD_ENTRIES: 'moodflow_mood_entries',
  JOURNAL_ENTRIES: 'moodflow_journal_entries',
  PROFILE_DATA: 'moodflow_profile_data',
};

// User data functions
export const saveUserData = (userData) => {
  localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
  // Dispatch custom event to notify components of user data update
  window.dispatchEvent(new CustomEvent('userDataUpdated'));
};

export const getUserData = () => {
  const data = localStorage.getItem(STORAGE_KEYS.USER_DATA);
  return data ? JSON.parse(data) : null;
};

// Mood entries functions
export const saveMoodEntry = (moodEntry) => {
  const entries = getMoodEntries();
  const newEntry = {
    ...moodEntry,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
  };
  entries.push(newEntry);
  localStorage.setItem(STORAGE_KEYS.MOOD_ENTRIES, JSON.stringify(entries));
  return newEntry;
};

export const getMoodEntries = () => {
  const data = localStorage.getItem(STORAGE_KEYS.MOOD_ENTRIES);
  return data ? JSON.parse(data) : [];
};

// Journal entries functions
export const saveJournalEntry = (journalEntry) => {
  const entries = getJournalEntries();
  const newEntry = {
    ...journalEntry,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
  };
  entries.push(newEntry);
  localStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(entries));
  return newEntry;
};

export const getJournalEntries = () => {
  const data = localStorage.getItem(STORAGE_KEYS.JOURNAL_ENTRIES);
  return data ? JSON.parse(data) : [];
};

export const deleteJournalEntry = (entryId) => {
  const entries = getJournalEntries();
  const filteredEntries = entries.filter(entry => entry.id !== entryId);
  localStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(filteredEntries));
};

// Profile data functions
export const saveProfileData = (profileData) => {
  localStorage.setItem(STORAGE_KEYS.PROFILE_DATA, JSON.stringify(profileData));
};

export const getProfileData = () => {
  const data = localStorage.getItem(STORAGE_KEYS.PROFILE_DATA);
  return data ? JSON.parse(data) : {
    helpWhenBad: [],
    helpWhenGood: [],
  };
};

// Utility functions
export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};

export const isUserOnboarded = () => {
  const userData = getUserData();
  return userData && userData.name && userData.email;
};

// Clear all data when app starts (for fresh start each time)
export const clearDataOnStart = () => {
  clearAllData();
  console.log('App started fresh - all previous data cleared');
};

// Development/Testing helper functions
export const resetApp = () => {
  clearAllData();
  window.dispatchEvent(new CustomEvent('userDataUpdated'));
  console.log('App reset - all data cleared. Refresh the page to see onboarding.');
};

// Make resetApp available globally for easy testing
if (typeof window !== 'undefined') {
  window.resetApp = resetApp;
}
