import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Activity, Clock, MousePointer, Keyboard } from 'lucide-react';

const MonitorContainer = styled.div`
  padding: ${props => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
  overflow-y: auto;
`;

const ActivityList = styled.div`
  background: ${props => props.theme.colors.card};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  border: 1px solid ${props => props.theme.colors.border};
  overflow: hidden;
`;

const ActivityHeader = styled.div`
  padding: ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.background};
`;

const ActivityItem = styled.div`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  transition: background-color 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors.hover};
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

const ActivityType = styled.div`
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const ActivityTime = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const ActivityMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${props => props.theme.spacing.xs};
`;

const PlatformBadge = styled.span`
  padding: 2px 8px;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 0.75rem;
  font-weight: 500;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.textSecondary};
  text-transform: uppercase;
`;

const TimeAgo = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const EmptyState = styled.div`
  padding: ${props => props.theme.spacing.xxl};
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
`;

const StatsBar = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const StatCard = styled.div`
  background: ${props => props.theme.colors.card};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  box-shadow: ${props => props.theme.shadows.sm};
  border: 1px solid ${props => props.theme.colors.border};
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
`;

function ActivityMonitor({ activityData }) {
  const [filter, setFilter] = useState('all');
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    // Sort activity data by timestamp (newest first)
    const sorted = [...activityData].sort((a, b) => b.timestamp - a.timestamp);
    setSortedData(sorted);
  }, [activityData]);

  const getActivityIcon = (type, platform) => {
    switch (type) {
      case 'mouse':
        return <MousePointer size={16} />;
      case 'cursor':
        return <MousePointer size={16} />;
      case 'keyboard':
        return <Keyboard size={16} />;
      default:
        return <Activity size={16} />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'mouse':
      case 'cursor':
        return '#3B82F6';
      case 'keyboard':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const getActivityDescription = (activity) => {
    switch (activity.type) {
      case 'mouse':
      case 'cursor':
        return 'Mouse movement detected';
      case 'keyboard':
        return 'Keyboard input detected';
      default:
        return 'User activity detected';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const filteredData = sortedData.filter(activity => {
    if (filter === 'all') return true;
    if (filter === 'late-night') {
      const hour = new Date(activity.timestamp).getHours();
      return hour >= 23 || hour <= 5;
    }
    return activity.type === filter;
  });

  const calculateStats = () => {
    const now = Date.now();
    const lastMinute = sortedData.filter(a => now - a.timestamp < 60000).length;
    const lastHour = sortedData.filter(a => now - a.timestamp < 3600000).length;
    const lateNight = sortedData.filter(a => {
      const hour = new Date(a.timestamp).getHours();
      return hour >= 23 || hour <= 5;
    }).length;

    return { lastMinute, lastHour, lateNight };
  };

  const stats = calculateStats();

  return (
    <MonitorContainer>
      <StatsBar>
        <StatCard>
          <StatValue>{stats.lastMinute}</StatValue>
          <StatLabel>Last Minute</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.lastHour}</StatValue>
          <StatLabel>Last Hour</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.lateNight}</StatValue>
          <StatLabel>Late Night (11PM-5AM)</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{sortedData.length}</StatValue>
          <StatLabel>Total Activities</StatLabel>
        </StatCard>
      </StatsBar>

      <ActivityList>
        <ActivityHeader>
          <Activity size={20} />
          <div>
            <h3>Activity Log</h3>
            <div style={{ fontSize: '0.875rem', color: '#64748B', marginTop: '4px' }}>
              Real-time monitoring of user activity
            </div>
          </div>
        </ActivityHeader>

        {filteredData.length === 0 ? (
          <EmptyState>
            <Activity size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
            <div>No activity detected yet</div>
            <div style={{ fontSize: '0.875rem', marginTop: '4px' }}>
              Start moving your mouse or typing to see activity logs
            </div>
          </EmptyState>
        ) : (
          filteredData.slice(0, 50).map((activity, index) => (
            <ActivityItem key={activity.id || index}>
              <ActivityIcon color={getActivityColor(activity.type)}>
                {getActivityIcon(activity.type, activity.platform)}
              </ActivityIcon>
              
              <ActivityDetails>
                <ActivityType>
                  {getActivityDescription(activity)}
                </ActivityType>
                <ActivityTime>
                  {formatTimestamp(activity.timestamp)}
                </ActivityTime>
              </ActivityDetails>
              
              <ActivityMeta>
                <PlatformBadge>
                  {activity.platform || 'unknown'}
                </PlatformBadge>
                <TimeAgo>
                  {formatTimeAgo(activity.timestamp)}
                </TimeAgo>
              </ActivityMeta>
            </ActivityItem>
          ))
        )}
      </ActivityList>
    </MonitorContainer>
  );
}

export default ActivityMonitor;
