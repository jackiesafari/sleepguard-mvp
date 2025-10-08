# SleepGuard Chrome Extension

A privacy-first Chrome browser extension that monitors your late-night browsing activity and provides gentle sleep reminders to promote healthy sleep habits. Built for healthcare technology demonstrations and medical conference presentations.

## 🎯 Features

- **Browser Activity Monitoring**: Tracks tab switches, page visits, and browsing patterns
- **Smart Sleep Reminders**: Contextual notifications during late-night hours (11 PM - 6 AM)
- **Privacy-First Design**: All data stored locally in Chrome, no external servers
- **Universal Access**: Works on any computer with Chrome browser
- **Visual Dashboard**: Sleep score, activity timeline, and pattern analytics
- **Dual Theme Interface**: Professional light mode and sleek ruby-red dark mode
- **Customizable Settings**: Configurable bedtime and reminder intervals

## 🚀 Quick Start

### For Users (Chrome Extension)

1. **Load Extension in Chrome**:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `extension` folder from this project

2. **Start Using**:
   - Click the SleepGuard icon in Chrome toolbar
   - Configure your sleep schedule in settings
   - Enjoy smart sleep reminders!

### For Developers

1. Clone the repository:
```bash
git clone <repository-url>
cd sleepguard-mvp
```

2. Load the extension:
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" → Select `extension` folder

3. Make changes and reload:
   - Edit files in the `extension` folder
   - Click the refresh button on the extension card

## 🏗️ Architecture

### Core Components

- **Popup Interface**: Main dashboard with sleep score and quick actions
- **Background Service Worker**: Activity monitoring and notification management
- **Options Page**: Settings and configuration interface
- **Local Storage**: Chrome storage API for data persistence

### Technology Stack

- **Extension Framework**: Chrome Extension Manifest V3
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: Chrome Storage API (local)
- **Notifications**: Chrome Notifications API
- **Activity Monitoring**: Chrome Tabs, Idle, and Alarms APIs

## 📱 Platform Support

### Chrome Browser
- **Windows**: Full support on Chrome for Windows
- **macOS**: Full support on Chrome for Mac
- **Linux**: Full support on Chrome for Linux
- **Chrome OS**: Native support on Chromebooks

### Other Chromium Browsers
- **Microsoft Edge**: Compatible (Chromium-based)
- **Brave Browser**: Compatible
- **Opera**: Compatible with minor modifications

## 🔒 Privacy & Security

- **Local Processing**: All activity data stored in Chrome's local storage
- **No External Servers**: No data transmission to external services
- **Minimal Data Collection**: Only tracks browsing patterns, not content
- **User Control**: Full control over data export and deletion
- **Chrome Sandbox**: Runs within Chrome's secure extension environment

## 🎯 Demo Features

### For Conference Presentation

1. **Real-time Activity Monitoring**
   - Show live activity detection
   - Demonstrate cross-platform compatibility

2. **Sleep Pattern Analytics**
   - Visualize 24-hour activity patterns
   - Highlight late-night activity trends

3. **Smart Reminder System**
   - Contextual notifications during demo
   - Customizable reminder intervals

4. **Privacy Controls**
   - Data export functionality
   - Local storage demonstration

## 🛠️ Development

### Project Structure
```
sleepguard-mvp/
├── extension/              # Chrome Extension Files
│   ├── manifest.json       # Extension configuration
│   ├── popup.html         # Main popup interface
│   ├── popup.js           # Popup functionality
│   ├── popup.css          # Popup styling
│   ├── background.js      # Background service worker
│   ├── options.html       # Settings page
│   ├── options.js         # Settings functionality
│   ├── options.css        # Settings styling
│   ├── icons/             # Extension icons
│   └── styles/            # Shared styles
├── src/                   # Desktop App (Electron)
│   ├── components/        # React components
│   ├── styles/            # Styled-components theme
│   └── App.js             # Main React component
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

### Key Scripts
- **Chrome Extension**: Load `extension` folder in Chrome
- **Desktop App**: `npm run dev` - Start Electron development mode
- **Desktop App**: `npm run build-electron` - Build production app

## 📊 Demo Scenarios

### Scenario 1: Normal Usage
- Show activity monitoring during regular hours
- Display dashboard with current statistics
- Demonstrate settings configuration

### Scenario 2: Late Night Activity
- Simulate late-night computer usage
- Show smart reminder notifications
- Display sleep pattern analytics

### Scenario 3: Privacy & Control
- Demonstrate data export functionality
- Show local storage capabilities
- Highlight privacy-first design

## 🔮 Future Enhancements

- **Pattern Recognition**: On-device machine learning for personalized sleep recommendations
- **Chrome Web Store**: Professional distribution and auto-updates
- **Health Integration**: Connect with fitness trackers and health apps
- **Advanced Analytics**: Detailed sleep pattern insights and trends
- **Team Dashboard**: Healthcare provider insights and patient monitoring

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

This is a demo project for healthcare technology conferences. Contributions welcome for:
- Cross-platform compatibility improvements
- Enhanced activity detection algorithms
- UI/UX improvements
- Additional privacy features

## 📞 Contact

For questions about this demo or healthcare technology applications, please contact the development team.
