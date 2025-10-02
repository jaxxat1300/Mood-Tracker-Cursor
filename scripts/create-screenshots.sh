#!/bin/bash

# 📸 Automated Screenshot Creator for MoodFlow
# This script helps create consistent screenshots

echo "📸 MoodFlow Screenshot Creator"
echo "============================="

# Create assets directory
mkdir -p docs/assets

echo "🌐 Make sure MoodFlow is running at http://localhost:3000"
echo ""
echo "📱 Screenshots to create:"
echo "1. Hero/Dashboard view"
echo "2. Onboarding flow"
echo "3. Mood selection"
echo "4. Journal page"
echo "5. Activities page"
echo "6. Profile page"
echo ""

# Check if running on macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 macOS detected - Using built-in screenshot tools"
    echo ""
    echo "📋 Instructions:"
    echo "1. Open http://localhost:3000 in your browser"
    echo "2. Set browser to mobile view (iPhone 12 Pro: 390x844)"
    echo "3. For each screenshot, press Cmd+Shift+4, then Space, then click the browser window"
    echo "4. Save screenshots to: $(pwd)/docs/assets/"
    echo ""
    echo "📱 Recommended screenshot names:"
    echo "   - hero-screenshot.png (dashboard)"
    echo "   - onboarding-screenshot.png"
    echo "   - mood-tracking.png"
    echo "   - journal-screenshot.png"
    echo "   - activities-screenshot.png"
    echo "   - profile-screenshot.png"
    echo ""
    
    # Open the app in browser
    echo "🚀 Opening MoodFlow in your default browser..."
    open http://localhost:3000
    
    # Open the assets folder
    echo "📁 Opening assets folder..."
    open docs/assets
    
else
    echo "🐧 Linux/Windows detected"
    echo "Please use your system's screenshot tool to capture:"
    echo "1. Open http://localhost:3000"
    echo "2. Take screenshots of each page"
    echo "3. Save to docs/assets/ folder"
fi

echo ""
echo "💡 Pro tips:"
echo "   - Use consistent browser size (mobile view recommended)"
echo "   - Capture the full app interface"
echo "   - Show the app's beautiful design"
echo "   - Include the bottom navigation"
echo ""
echo "🎬 After screenshots, create your demo GIF using:"
echo "   - LICEcap (free): https://www.cockos.com/licecap/"
echo "   - Kap (Mac): brew install --cask kap"
echo "   - ScreenToGif (Windows): https://www.screentogif.com/"
