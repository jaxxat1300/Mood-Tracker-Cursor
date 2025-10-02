# MoodFlow - Mood Tracker App

A beautiful, mobile-friendly mood tracking web application built with React and TailwindCSS.

## Features

### 🌟 Core Features
- **Onboarding Flow**: Simple signup with personalized questions
- **Daily Mood Check-ins**: Track emotions with intuitive mood selection
- **Dashboard**: Visual mood trends and statistics
- **Journal**: Freeform notes with timestamps and prompts
- **Profile**: Customizable wellness toolkit lists
- **Activities**: Mindful activities including puzzles, breathing exercises, and guided journaling

### 🎨 Design
- Therapeutic color palette (calming blues, greens, lavender)
- Mobile-first responsive design
- Clean, modern UI with rounded corners and whitespace
- Smooth animations and transitions

### 💾 Data Storage
- Local storage for all user data (no backend required)
- Persistent mood entries and journal entries
- User preferences and profile data

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.js       # Main layout wrapper
│   └── BottomNavigation.js
├── pages/              # Main application pages
│   ├── Onboarding.js   # User signup and initial questions
│   ├── Home.js         # Dashboard with mood check-ins
│   ├── Journal.js      # Notes and journal entries
│   ├── Activities.js   # Mindful activities
│   └── Profile.js      # User profile and wellness lists
├── utils/              # Utility functions
│   └── storage.js      # Local storage management
├── App.js              # Main app component with routing
├── index.js            # App entry point
└── index.css           # Global styles and Tailwind imports
```

## Key Technologies

- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Recharts** - Charts for mood visualization
- **Local Storage** - Data persistence

## Features in Detail

### Mood Tracking
- 6 mood categories: Happy, Calm, Stressed, Sad, Angry, Excited
- Visual mood selection with emojis and colors
- Historical mood trends with charts
- Daily check-in reminders

### Journal System
- Freeform text entries with titles
- Timestamp tracking
- Entry management (create, delete)
- Guided journal prompts

### Profile Management
- Editable lists for "What helps when I feel bad/good"
- User information display
- Wellness toolkit customization

### Activities
- **Daily Puzzle**: Brain teasers and riddles
- **Guided Journal**: Thoughtful writing prompts
- **Breathing Exercise**: 4-4-4 breathing technique with visual guide

## Customization

The app uses a custom TailwindCSS configuration with therapeutic colors:
- Primary: Calming blues
- Secondary: Soothing greens  
- Accent: Gentle purples
- Mood colors: Specific colors for each emotion

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

This is a starter project. Feel free to:
- Add new mood categories
- Implement additional activities
- Enhance the UI/UX
- Add data export features
- Integrate with external APIs

## License

This project is open source and available under the MIT License.

## Deployment

The app can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting

Simply run `npm run build` and deploy the `build` folder.

---

**MoodFlow** - Your personal mood tracking companion 💙
