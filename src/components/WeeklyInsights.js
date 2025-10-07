import React from 'react';
import styled from 'styled-components';
import { Brain, Calendar, MessageCircle } from 'lucide-react';

const InsightsContainer = styled.div`
  background: ${props => props.theme.colors.card};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.lg};
  border: 1px solid ${props => props.theme.colors.borderLight};
`;

const InsightsHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const InsightsTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const InsightsSubtitle = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const InsightItem = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InsightHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const InsightIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${props => props.color || props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const InsightInfo = styled.div`
  flex: 1;
`;

const InsightTitle = styled.div`
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const InsightDescription = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const InsightValue = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${props => props.theme.colors.borderLight};
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
  margin-top: ${props => props.theme.spacing.sm};
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${props => props.color || props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.md};
  width: ${props => props.percentage}%;
  transition: width 0.5s ease-in-out;
`;

function WeeklyInsights({ 
  lateHours = { value: "1.5 hrs", description: "Improved by 30 mins", percentage: 75 },
  onTimeNights = { value: "5/7", description: "Better than last week", percentage: 71 },
  responseRate = { value: "85%", description: "You respond well to reminders", percentage: 85 }
}) {
  const insights = [
    {
      icon: <Brain size={20} />,
      iconColor: "#8B5CF6",
      title: "Avg. Late Hours",
      description: lateHours.description,
      value: lateHours.value,
      percentage: lateHours.percentage
    },
    {
      icon: <Calendar size={20} />,
      iconColor: "#6366F1",
      title: "On-Time Nights",
      description: onTimeNights.description,
      value: onTimeNights.value,
      percentage: onTimeNights.percentage
    },
    {
      icon: <MessageCircle size={20} />,
      iconColor: "#10B981",
      title: "Response Rate",
      description: responseRate.description,
      value: responseRate.value,
      percentage: responseRate.percentage
    }
  ];

  return (
    <InsightsContainer>
      <InsightsHeader>
        <InsightsTitle>Weekly Insights</InsightsTitle>
        <InsightsSubtitle>Your sleep pattern improvements</InsightsSubtitle>
      </InsightsHeader>

      {insights.map((insight, index) => (
        <InsightItem key={index}>
          <InsightHeader>
            <InsightIcon color={insight.iconColor}>
              {insight.icon}
            </InsightIcon>
            <InsightInfo>
              <InsightTitle>{insight.title}</InsightTitle>
              <InsightDescription>{insight.description}</InsightDescription>
            </InsightInfo>
            <InsightValue>{insight.value}</InsightValue>
          </InsightHeader>
          <ProgressBar>
            <ProgressFill 
              color={insight.iconColor} 
              percentage={insight.percentage}
            />
          </ProgressBar>
        </InsightItem>
      ))}
    </InsightsContainer>
  );
}

export default WeeklyInsights;
