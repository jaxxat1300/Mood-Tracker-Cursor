#!/bin/bash

# 🎨 Image Optimization Script for MoodFlow
# This script helps optimize images for web use

echo "🎨 MoodFlow Image Optimizer"
echo "=========================="

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "📦 Installing ImageMagick..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew install imagemagick
    else
        echo "Please install ImageMagick manually"
        exit 1
    fi
fi

# Create assets directory if it doesn't exist
mkdir -p docs/assets

echo "🖼️  Optimizing images in docs/assets/"

# Optimize PNG files
for file in docs/assets/*.png; do
    if [ -f "$file" ]; then
        echo "Optimizing $file..."
        convert "$file" -strip -quality 85 -resize 1200x800\> "$file"
    fi
done

# Optimize JPG files
for file in docs/assets/*.jpg docs/assets/*.jpeg; do
    if [ -f "$file" ]; then
        echo "Optimizing $file..."
        convert "$file" -strip -quality 85 -resize 1200x800\> "$file"
    fi
done

# Check GIF file sizes
for file in docs/assets/*.gif; do
    if [ -f "$file" ]; then
        size=$(du -h "$file" | cut -f1)
        echo "GIF size: $file - $size"
        if [[ $(du -k "$file" | cut -f1) -gt 10240 ]]; then
            echo "⚠️  Warning: $file is larger than 10MB. Consider optimizing."
        fi
    fi
done

echo "✅ Image optimization complete!"
echo "📊 Final sizes:"
du -h docs/assets/* 2>/dev/null || echo "No assets found yet"

echo ""
echo "💡 Next steps:"
echo "1. Create your demo GIF following scripts/create-demo.md"
echo "2. Add screenshots of key app features"
echo "3. Run this script again to optimize"
echo "4. Commit and push to GitHub"
