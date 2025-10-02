# 🎬 Creating Demo GIF and Screenshots for MoodFlow

## 📱 Demo GIF Creation Guide

### Option 1: Using LICEcap (Free, Easy)
1. **Download LICEcap**: https://www.cockos.com/licecap/
2. **Open your MoodFlow app** at http://localhost:3000
3. **Start recording** with these steps:
   - Show onboarding flow (name, email, questions)
   - Complete mood check-in
   - Navigate to journal and add entry
   - Visit activities and try breathing exercise
   - Check profile page
   - Return to dashboard to show mood chart
4. **Save as**: `docs/assets/moodflow-demo.gif`
5. **Keep it under 10MB** for GitHub

### Option 2: Using Kap (Mac, Free)
1. **Install**: `brew install --cask kap`
2. **Record the same flow** as above
3. **Export as GIF** with optimized settings

### Option 3: Using ScreenToGif (Windows, Free)
1. **Download**: https://www.screentogif.com/
2. **Follow the same recording steps**
3. **Optimize and export**

## 📸 Screenshots Needed

Create these screenshots and save in `docs/assets/`:

1. **`hero-screenshot.png`** - Main dashboard view
2. **`onboarding-screenshot.png`** - Onboarding flow
3. **`mood-tracking.png`** - Mood selection interface
4. **`journal-screenshot.png`** - Journal page
5. **`activities-screenshot.png`** - Activities page
6. **`profile-screenshot.png`** - Profile page
7. **`mobile-view.png`** - Mobile responsive view

## 🎯 Demo Flow Script

**Total Duration: 30-45 seconds**

1. **Start at onboarding** (3 seconds)
   - Show welcome screen
   - Fill in name quickly

2. **Complete onboarding** (5 seconds)
   - Select usage option
   - Add importance text
   - Click "Get Started"

3. **Dashboard interaction** (8 seconds)
   - Show greeting and mood options
   - Select a mood (Happy)
   - Show success message
   - Quick view of mood chart

4. **Navigate to Journal** (6 seconds)
   - Click journal in bottom nav
   - Click "New Entry"
   - Type a quick note
   - Save entry

5. **Visit Activities** (8 seconds)
   - Click activities in bottom nav
   - Click "Breathing Exercise"
   - Start the breathing animation
   - Show the visual guide

6. **Check Profile** (5 seconds)
   - Click profile in bottom nav
   - Show wellness lists
   - Add a quick item

7. **Return to Dashboard** (5 seconds)
   - Click home in bottom nav
   - Show updated stats
   - End with mood chart view

## 🎨 Visual Tips

- **Use a clean browser** (no bookmarks bar, clean tabs)
- **Set browser to mobile view** (iPhone 12 Pro size)
- **Good lighting** for screen recording
- **Smooth, deliberate movements**
- **Pause briefly** at key features
- **Show the app's beauty** - let animations complete

## 📐 Optimal Dimensions

- **GIF Size**: 800x600 or 1000x750 pixels
- **File Size**: Under 10MB for GitHub
- **Frame Rate**: 10-15 FPS (smooth but small file)
- **Duration**: 30-45 seconds max

## 🔄 After Creating Assets

1. **Add files to git**:
   ```bash
   git add docs/assets/
   git commit -m "Add demo GIF and screenshots"
   git push
   ```

2. **Update website links** in `docs/index.html`:
   - Replace "yourusername" with your GitHub username
   - Verify all asset paths are correct

3. **Test the website**:
   - Visit: `https://yourusername.github.io/moodflow/docs/`
   - Check that GIF loads properly
   - Verify all links work

## 📱 Mobile Recording Tips

- **Use browser dev tools** to simulate mobile
- **iPhone 12 Pro dimensions**: 390x844
- **Show touch interactions** clearly
- **Demonstrate responsive design**

## 🎬 Pro Tips

- **Practice the flow** before recording
- **Keep cursor movements smooth**
- **Highlight key features** with brief pauses
- **Show the app's personality** - let users see the therapeutic design
- **End on a positive note** - maybe showing the mood chart with progress

Your demo should showcase MoodFlow's key value: **beautiful, intuitive mood tracking that actually helps people feel better**! 🌟
