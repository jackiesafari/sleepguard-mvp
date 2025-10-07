import React from 'react';
import styled from 'styled-components';
import { Moon, Star, BookOpen, Settings, Activity } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const HeaderContainer = styled.header`
  height: 80px;
  background: ${props => props.theme.colors.card};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const LogoIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.accent} 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: ${props => props.theme.shadows.md};
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const LogoContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  line-height: 1;
`;

const LogoSubtitle = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  font-weight: 400;
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const StatusBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const ActivityDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.active ? props.theme.colors.success : props.theme.colors.textSecondary};
  animation: ${props => props.active ? 'pulse 2s infinite' : 'none'};
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const TimeDisplay = styled.div`
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
`;

function Header({ currentView, onViewChange, activityCount, isDarkMode, onThemeToggle }) {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const isLateNight = () => {
    const hour = currentTime.getHours();
    return hour >= 23 || hour <= 5;
  };

  return (
    <HeaderContainer>
      <Logo>
        <LogoIcon>
          <Moon size={20} color="white" />
          <Star 
            size={8} 
            color="white" 
            style={{ 
              position: 'absolute', 
              top: '8px', 
              right: '12px' 
            }} 
          />
          <BookOpen 
            size={12} 
            color="white" 
            style={{ 
              position: 'absolute', 
              bottom: '6px', 
              left: '50%', 
              transform: 'translateX(-50%)' 
            }} 
          />
        </LogoIcon>
        <LogoContent>
          <LogoTitle>SleepGuard</LogoTitle>
          <LogoSubtitle>Your Sleep Health Assistant</LogoSubtitle>
        </LogoContent>
      </Logo>
      
      <StatusIndicator>
        <ThemeToggle isDarkMode={isDarkMode} onToggle={onThemeToggle} />
        
        <StatusBadge>
          <ActivityDot active={activityCount > 0} />
          <span>{activityCount} recent activities</span>
        </StatusBadge>
        
        <StatusBadge>
          <ActivityDot active={isLateNight()} />
          <span>{isLateNight() ? 'Late Night Mode' : 'Normal Hours'}</span>
        </StatusBadge>
        
        <TimeDisplay>
          {formatTime(currentTime)}
        </TimeDisplay>
      </StatusIndicator>
    </HeaderContainer>
  );
}

export default Header;
