import React, { useState } from 'react';
import styled from 'styled-components';
import { Monitor, Clock, Calendar, MousePointer, Keyboard, Smartphone } from 'lucide-react';

const TimelineContainer = styled.div`
  background: ${props => props.theme.colors.card};
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: ${props => props.theme.shadows.lg};
  border: 1px solid ${props => props.theme.colors.borderLight};
  overflow: hidden;
`;

const TimelineHeader = styled.div`
  padding: ${props => props.theme.spacing.xl};
  border-bottom: 1px solid ${props => props.theme.colors.borderLight};
`;

const TimelineTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const TabContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const Tab = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: none;
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.textSecondary};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.hover};
    color: ${props => props.active ? 'white' : props.theme.colors.text};
  }
`;

const TimelineContent = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const TimelineItem = styled.div`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-bottom: 1px solid ${props => props.theme.colors.borderLight};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  transition: background-color 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors.background};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.color || props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const ActivityDetails = styled.div`
  flex: 1;
`;

const ActivityName = styled.div`
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const ActivityTime = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const EmptyState = styled.div`
  padding: ${props => props.theme.spacing.xxl};
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
`;

const EmptyIcon = styled.div`
  width: 48px;
  height: 48px;
  margin: 0 auto ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.background};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textLight};
`;

function ActivityTimeline({ activityData = [] }) {
  const [activeTab, setActiveTab] = useState('today');

  const getActivityIcon = (type) => {
    switch (type) {
      case 'mouse':
      case 'cursor':
        return <MousePointer size={16} />;
      case 'keyboard':
        return <Keyboard size={16} />;
      case 'tab':
        return <Monitor size={16} />;
      case 'app':
        return <Smartphone size={16} />;
      default:
        return <Monitor size={16} />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'mouse':
      case 'cursor':
        return '#3B82F6';
      case 'keyboard':
        return '#10B981';
      case 'tab':
        return '#8B5CF6';
      case 'app':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  const getActivityName = (activity) => {
    switch (activity.type) {
      case 'mouse':
      case 'cursor':
        return 'Mouse Movement';
      case 'keyboard':
        return 'Keyboard Input';
      case 'tab':
        return 'Tab Switch';
      case 'app':
        return 'App Switch';
      default:
        return 'User Activity';
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Generate demo data for different time periods
  const generateDemoData = (period) => {
    const now = new Date();
    const activities = [
      { type: 'tab', name: 'Tab Switch' },
      { type: 'mouse', name: 'Mouse Movement' },
      { type: 'keyboard', name: 'Keyboard Input' },
      { type: 'app', name: 'App Switch' }
    ];

    const data = [];
    const count = period === 'today' ? 8 : period === 'week' ? 15 : 25;

    for (let i = 0; i < count; i++) {
      const activity = activities[Math.floor(Math.random() * activities.length)];
      const timestamp = new Date(now.getTime() - (i * (period === 'today' ? 30 : period === 'week' ? 60 : 120)) * 60 * 1000);
      
      data.push({
        id: i,
        type: activity.type,
        timestamp: timestamp.getTime(),
        ...activity
      });
    }

    return data.sort((a, b) => b.timestamp - a.timestamp);
  };

  const displayData = activityData.length > 0 ? activityData : generateDemoData(activeTab);

  return (
    <TimelineContainer>
      <TimelineHeader>
        <TimelineTitle>Activity Timeline</TimelineTitle>
        <TabContainer>
          <Tab 
            active={activeTab === 'today'} 
            onClick={() => setActiveTab('today')}
          >
            Today
          </Tab>
          <Tab 
            active={activeTab === 'week'} 
            onClick={() => setActiveTab('week')}
          >
            This Week
          </Tab>
          <Tab 
            active={activeTab === 'month'} 
            onClick={() => setActiveTab('month')}
          >
            This Month
          </Tab>
        </TabContainer>
      </TimelineHeader>

      <TimelineContent>
        {displayData.length === 0 ? (
          <EmptyState>
            <EmptyIcon>
              <Clock size={24} />
            </EmptyIcon>
            <div>No activity recorded yet</div>
            <div style={{ fontSize: '0.875rem', marginTop: '4px' }}>
              Activity will appear here as you use your computer
            </div>
          </EmptyState>
        ) : (
          displayData.slice(0, 20).map((activity) => (
            <TimelineItem key={activity.id}>
              <ActivityIcon color={getActivityColor(activity.type)}>
                {getActivityIcon(activity.type)}
              </ActivityIcon>
              <ActivityDetails>
                <ActivityName>
                  {getActivityName(activity)}
                </ActivityName>
                <ActivityTime>
                  {formatTime(activity.timestamp)}
                </ActivityTime>
              </ActivityDetails>
            </TimelineItem>
          ))
        )}
      </TimelineContent>
    </TimelineContainer>
  );
}

export default ActivityTimeline;
