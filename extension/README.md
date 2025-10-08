# SleepGuard Chrome Extension

A privacy-first sleep health assistant that monitors your browsing activity and provides gentle reminders when you're active late at night.

## 🌙 Features

- **Activity Monitoring**: Tracks tab switches, page visits, and browsing patterns
- **Smart Sleep Reminders**: Contextual notifications during late-night hours
- **Sleep Score**: Visual health overview with circular progress indicator
- **Dark/Light Themes**: Ruby red dark mode for comfortable night viewing
- **Privacy-First**: All data stored locally, no external servers
- **Customizable Settings**: Configurable bedtime and reminder intervals

## 🚀 Installation

### For Development:

1. **Load Extension in Chrome**:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `extension` folder from this project

2. **Test the Extension**:
   - Click the SleepGuard icon in the Chrome toolbar
   - Open the popup to see the dashboard
   - Right-click the extension icon → "Options" to access settings

### For Distribution:

1. **Package Extension**:
   - Zip the entire `extension` folder
   - Upload to Chrome Web Store (requires developer account)

## 📁 File Structure

```
extension/
├── manifest.json          # Extension configuration
├── popup.html            # Main popup interface
├── popup.js              # Popup functionality
├── popup.css             # Popup styling
├── background.js         # Background service worker
├── options.html          # Settings page
├── options.js            # Settings functionality
├── options.css           # Settings styling
├── icons/                # Extension icons
└── styles/               # Shared styles
```

## 🎯 Key Components

### **Popup Interface (popup.html/js)**
- Sleep score visualization
- Quick action buttons
- Activity timeline
- Theme toggle
- Real-time status updates

### **Background Script (background.js)**
- Activity monitoring
- Notification management
- Data storage
- Alarm scheduling
- Tab and idle detection

### **Options Page (options.html/js)**
- Settings configuration
- Data export/import
- Theme preferences
- Privacy controls

## 🔧 Configuration

### **Permissions Used**:
- `storage`: Save settings and activity data locally
- `alarms`: Schedule sleep reminders
- `notifications`: Show gentle reminders
- `activeTab`: Monitor current tab activity
- `tabs`: Track tab switches and updates
- `idle`: Detect when user is away from computer

### **Storage Keys**:
- `sleepGuardSettings`: User preferences and configuration
- `sleepGuardActivity`: Activity history and statistics
- `lastReminder`: Timestamp of last notification shown

## 🎨 Theming

The extension supports both light and dark themes:

### **Light Theme**:
- Primary: Indigo (#6366F1)
- Accent: Purple (#8B5CF6)
- Background: Light gray (#FAFBFC)

### **Dark Theme**:
- Primary: Ruby red (#DC2626)
- Accent: Orange (#F97316)
- Background: Deep black (#0F0F0F)

## 📊 Activity Monitoring

The extension tracks:
- **Tab Switches**: When you change between tabs
- **Page Visits**: New pages loaded
- **Idle States**: When you're away from computer
- **Time Patterns**: Late-night activity detection

## 🔔 Notification System

### **Smart Reminders**:
- Triggered during late hours (11 PM - 6 AM)
- Based on activity patterns
- Configurable intervals (15, 30, 60, 120 minutes)
- Action buttons for quick responses

### **Notification Types**:
- Sleep reminders with action buttons
- Bedtime confirmations
- Snooze notifications

## 🛡️ Privacy & Security

### **Data Handling**:
- All data stored locally in Chrome storage
- No external API calls or data transmission
- User controls data export and deletion
- Activity monitoring only, no content tracking

### **Permissions**:
- Minimal required permissions
- No access to browsing content
- Only metadata and timing information

## 🚀 Demo Features

### **For Conference Presentation**:
1. **Live Activity Monitoring**: Show real-time tab tracking
2. **Theme Switching**: Demonstrate dark mode with ruby accents
3. **Sleep Score**: Visual health overview
4. **Smart Notifications**: Context-aware reminders
5. **Privacy Controls**: Data export and settings

### **Demo Scenarios**:
- **Normal Usage**: Show activity tracking during day
- **Late Night Mode**: Demonstrate sleep reminders
- **Settings Panel**: Show customization options
- **Data Privacy**: Export functionality and local storage

## 🔧 Development

### **Testing**:
```bash
# Load extension in Chrome
# Go to chrome://extensions/
# Enable Developer mode
# Click "Load unpacked"
# Select extension folder
```

### **Debugging**:
- Use Chrome DevTools for popup debugging
- Check background script in extension details
- View storage in Chrome DevTools → Application → Storage

### **Building**:
- No build process required
- Pure HTML/CSS/JavaScript
- Ready for Chrome Web Store submission

## 📱 Browser Compatibility

- **Chrome**: Full support (Manifest V3)
- **Edge**: Compatible (Chromium-based)
- **Other Chromium browsers**: Should work with minor modifications

## 🎯 Conference Demo Script

### **Opening (30 seconds)**:
"SleepGuard Chrome Extension demonstrates how browser technology can support healthy sleep habits without compromising privacy."

### **Live Demo (2 minutes)**:
1. **Show popup**: Demonstrate sleep score and activity monitoring
2. **Theme toggle**: Switch to dark mode with ruby accents
3. **Settings page**: Show customization options
4. **Activity tracking**: Real-time tab monitoring

### **Key Points (1 minute)**:
- Privacy-first design (local storage only)
- Cross-platform accessibility (any Chrome browser)
- Healthcare-grade UI with medical technology aesthetics
- Easy distribution and installation

## 📄 License

MIT License - Free for personal and commercial use.

## 🤝 Contributing

This is a demo project for healthcare technology conferences. Contributions welcome for:
- Enhanced activity detection
- Additional browser support
- UI/UX improvements
- Privacy feature enhancements
