# Crisis Resources & Mental Health Support

This app includes comprehensive crisis resources to ensure users always have access to immediate help when needed.

## 🚨 Immediate Crisis Support

### 988 Suicide & Crisis Lifeline
- **Call**: 988
- **Text**: 988
- **Chat**: [988lifeline.org/chat](https://988lifeline.org/chat/)
- **Available**: 24/7, free and confidential
- **Description**: Connect with trained crisis counselors who can provide immediate support

### Crisis Text Line
- **Text**: HOME to 741741
- **Available**: 24/7
- **Description**: Free, 24/7 support via text message

---

## 📍 Where Crisis Resources Appear in the App

### 1. **Home Page**
- Prominent crisis banner always visible at the top
- One-tap access to call or text 988
- Link to full Support & Resources page

### 2. **Track Page (Mood Logging)**
- Automatic crisis support prompt when:
  - User selects high-intensity (8+) difficult emotions
  - Quadrant is "high-unpleasant" or "low-unpleasant"
- Gentle, non-judgmental message offering help
- Option to dismiss if user is okay

### 3. **Support & Resources Page**
- Dedicated crisis banner (cannot be hidden)
- Comprehensive list of all hotlines
- Online resources and tools
- Personal support contacts

---

## 📞 Additional Hotlines Available

### National Resources
- **National Suicide Prevention Lifeline**: 1-800-273-8255
- **SAMHSA National Helpline**: 1-800-662-4357 (Treatment referral)
- **NAMI Helpline**: 1-800-950-6264 (Mental health information)

### Specialized Support
- **Domestic Violence Hotline**: 1-800-799-7233
- **Trevor Project** (LGBTQ+ Youth): 1-866-488-7386
- **Trans Lifeline**: 1-877-565-8860
- **Veterans Crisis Line**: 1-800-931-2237

---

## 🌐 Online Resources

### Therapy Platforms
- **BetterHelp**: [betterhelp.com](https://www.betterhelp.com)
- **7 Cups**: [7cups.com](https://www.7cups.com) (Free emotional support)

### Mental Health Organizations
- **NAMI** (National Alliance on Mental Illness): [nami.org](https://www.nami.org)
- **MentalHealth.gov**: [mentalhealth.gov](https://www.mentalhealth.gov)
- **Psychology Today** (Find a Therapist): [psychologytoday.com/us/therapists](https://www.psychologytoday.com/us/therapists)

---

## 🛡️ Safety Features

### Quick Exit Button
- Available on Support page
- Immediately redirects to weather.com
- Designed for situations where privacy is needed

### Non-Judgmental Design
- No tracking of which resources are accessed
- Clear, direct language without stigma
- Option to dismiss crisis prompts
- Emphasis that seeking help is strength

---

## 🎯 Design Principles

1. **Always Accessible**: Crisis resources visible from any major page
2. **One-Tap Action**: Direct calling/texting without extra steps
3. **Contextual**: Appears when user may need it most (intense negative emotions)
4. **Respectful**: Users can dismiss and continue if they're okay
5. **Comprehensive**: Multiple options for different needs and preferences

---

## 🔄 Automatic Triggering

The app intelligently shows crisis resources when:
- User logs emotions in "unpleasant" quadrants (anxious, stressed, sad, etc.)
- Intensity level is 8 or higher (out of 10)
- After saving the mood entry (not before, to avoid interrupting)

Users can:
- ✅ Call 988 immediately
- ✅ Text 988
- ✅ View all support resources
- ✅ Dismiss if they're managing their feelings

---

## 📱 Mobile-Friendly

All crisis resource links are:
- One-tap to call: `tel:988`
- One-tap to text: `sms:988`
- Optimized for touch interfaces
- Work on all devices (desktop, tablet, mobile)

---

## 💚 You're Not Alone

This app recognizes that tracking difficult emotions takes courage. The crisis resources are integrated thoughtfully to ensure users always know help is available, without being intrusive or judgmental.

**Remember**: Seeking help is a sign of strength, not weakness.

---

*For developers: Crisis resource data is managed in `src/pages/Support.js` with styling defined in `src/index.css` (.crisis-banner class)*

