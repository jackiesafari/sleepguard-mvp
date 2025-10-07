import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Dashboard from './components/Dashboard';
import ActivityMonitor from './components/ActivityMonitor';
import Settings from './components/Settings';
import Header from './components/Header';
import { lightTheme, darkTheme } from './styles/theme';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${props => props.theme.colors.background};
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  overflow: hidden;
`;

const Sidebar = styled.aside`
  width: 280px;
  background: ${props => props.theme.colors.sidebar};
  border-right: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.lg};
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activityData, setActivityData] = useState([]);
  const [settings, setSettings] = useState({
    sleepTime: '23:00',
    reminderInterval: 30, // minutes
    quietHours: true,
    notifications: true
  });

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('sleepguard-theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Default to dark mode during late night hours
      const hour = new Date().getHours();
      setIsDarkMode(hour >= 20 || hour <= 6);
    }
  }, []);

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('sleepguard-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    // Listen for activity from Electron main process
    if (window.electronAPI) {
      window.electronAPI.onActivityDetected((data) => {
        setActivityData(prev => [...prev.slice(-99), {
          ...data,
          id: Date.now()
        }]);
      });

      // Cleanup listener on unmount
      return () => {
        window.electronAPI.removeAllListeners('activity-detected');
      };
    }
  }, []);

  const handleSettingsChange = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard activityData={activityData} settings={settings} />;
      case 'monitor':
        return <ActivityMonitor activityData={activityData} />;
      case 'settings':
        return <Settings settings={settings} onSettingsChange={handleSettingsChange} />;
      default:
        return <Dashboard activityData={activityData} settings={settings} />;
    }
  };

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <AppContainer>
        <Header 
          currentView={currentView} 
          onViewChange={setCurrentView}
          activityCount={activityData.length}
          isDarkMode={isDarkMode}
          onThemeToggle={handleThemeToggle}
        />
        <MainContent>
          <Sidebar>
            <nav>
              <NavButton 
                active={currentView === 'dashboard'} 
                onClick={() => setCurrentView('dashboard')}
              >
                📊 Dashboard
              </NavButton>
              <NavButton 
                active={currentView === 'monitor'} 
                onClick={() => setCurrentView('monitor')}
              >
                🔍 Activity Monitor
              </NavButton>
              <NavButton 
                active={currentView === 'settings'} 
                onClick={() => setCurrentView('settings')}
              >
                ⚙️ Settings
              </NavButton>
            </nav>
          </Sidebar>
          <ContentArea>
            {renderCurrentView()}
          </ContentArea>
        </MainContent>
      </AppContainer>
    </ThemeProvider>
  );
}

const NavButton = styled.button`
  display: block;
  width: 100%;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.sm};
  border: none;
  border-radius: ${props => props.theme.borderRadius.lg};
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? props.theme.colors.white : props.theme.colors.text};
  cursor: pointer;
  text-align: left;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.hover};
    transform: translateX(2px);
  }
`;

export default App;
