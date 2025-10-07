# SleepGuard MVP

A smart sleep reminder application that monitors user activity and provides gentle reminders when users are still active late at night. Built for healthcare technology demonstrations.

## 🎯 Features

- **Real-time Activity Monitoring**: Tracks mouse movements, keyboard input, and cursor activity
- **Smart Sleep Reminders**: Contextual notifications during late-night hours (11 PM - 6 AM)
- **Privacy-First Design**: All data processed locally, no external servers
- **Cross-Platform**: Works on Windows, macOS, and Linux
- **Visual Dashboard**: Real-time activity visualization and sleep pattern analytics
- **Customizable Settings**: Configurable reminder intervals and sleep schedules

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sleepguard-mvp
```

2. Install dependencies:
```bash
npm install
```

3. Start development mode:
```bash
npm run dev
```

This will start both the React development server and Electron app.

### Building for Production

```bash
npm run build-electron
```

## 🏗️ Architecture

### Core Components

- **Activity Monitor**: Background service tracking user input events
- **Sleep Analytics Engine**: Pattern recognition and reminder logic
- **Dashboard Interface**: Real-time monitoring and visualization
- **Settings Management**: User preferences and privacy controls

### Technology Stack

- **Frontend**: React + Styled Components
- **Desktop App**: Electron
- **Charts**: Chart.js + React-Chartjs-2
- **Database**: SQLite (local storage)
- **Icons**: Lucide React

## 📱 Platform Support

### Windows
- Uses PowerShell commands to monitor cursor position
- Native Windows notification system

### macOS
- Core Graphics API for activity monitoring
- Native macOS notification system

### Linux
- X11 tools (xdotool) for mouse tracking
- Native Linux notification system

## 🔒 Privacy & Security

- **Local Processing**: All activity data stays on your device
- **No External Servers**: No data transmission to external services
- **Minimal Data Collection**: Only tracks input events, not content
- **User Control**: Full control over data export and deletion

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
├── public/
│   ├── electron.js          # Main Electron process
│   ├── preload.js          # Electron preload script
│   └── index.html          # HTML template
├── src/
│   ├── components/         # React components
│   │   ├── Dashboard.js    # Main dashboard
│   │   ├── ActivityMonitor.js # Activity logging
│   │   ├── Settings.js     # Settings panel
│   │   └── Header.js       # App header
│   ├── styles/
│   │   └── theme.js        # Styled-components theme
│   ├── App.js              # Main React component
│   └── index.js            # React entry point
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

### Key Scripts
- `npm run dev` - Start development mode
- `npm run build` - Build React app
- `npm run electron` - Run Electron app
- `npm run build-electron` - Build production app

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

- **Machine Learning**: Predictive sleep pattern analysis
- **Health Integration**: Connect with fitness trackers
- **Mobile Companion**: iOS/Android companion app
- **Team Dashboard**: Healthcare provider insights
- **API Integration**: Connect with sleep research databases

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
