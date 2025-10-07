import React from 'react';
import styled from 'styled-components';
import { Target, Clock, Moon } from 'lucide-react';

const SleepScoreContainer = styled.div`
  background: ${props => props.theme.colors.card};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.lg};
  border: 1px solid ${props => props.theme.colors.borderLight};
  position: relative;
  overflow: hidden;
`;

const ScoreHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ScoreTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const ScoreSubtitle = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const ScoreDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  position: relative;
`;

const CircularProgress = styled.div`
  width: 160px;
  height: 160px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProgressRing = styled.svg`
  width: 160px;
  height: 160px;
  transform: rotate(-90deg);
  position: absolute;
`;

const ProgressCircle = styled.circle`
  fill: none;
  stroke: ${props => props.theme.colors.borderLight};
  stroke-width: 8;
`;

const ProgressCircleActive = styled.circle`
  fill: none;
  stroke: ${props => props.theme.colors.sleepScore};
  stroke-width: 8;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.5s ease-in-out;
`;

const ScoreText = styled.div`
  text-align: center;
  z-index: 2;
`;

const ScoreNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  line-height: 1;
`;

const ScoreTotal = styled.div`
  font-size: 1rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-top: ${props => props.theme.spacing.xs};
`;

const ScoreBadge = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: ${props => props.theme.colors.sleepScoreBg};
  color: ${props => props.theme.colors.sleepScore};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.md};
`;

const MetricCard = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid ${props => props.theme.colors.borderLight};
`;

const MetricIcon = styled.div`
  width: 32px;
  height: 32px;
  margin: 0 auto ${props => props.theme.spacing.sm};
  background: ${props => props.color || props.theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const MetricValue = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const MetricLabel = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

function SleepScore({ score = 82, target = "11:00 PM", actual = "12:45 AM", streak = 5 }) {
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <SleepScoreContainer>
      <ScoreHeader>
        <ScoreTitle>Sleep Score</ScoreTitle>
        <ScoreSubtitle>Your sleep health overview</ScoreSubtitle>
      </ScoreHeader>

      <ScoreBadge>
        <span>↗</span>
        <span>+12% vs last week</span>
      </ScoreBadge>

      <ScoreDisplay>
        <CircularProgress>
          <ProgressRing>
            <ProgressCircle cx="80" cy="80" r={radius} />
            <ProgressCircleActive
              cx="80"
              cy="80"
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </ProgressRing>
          <ScoreText>
            <ScoreNumber>{score}</ScoreNumber>
            <ScoreTotal>/ 100</ScoreTotal>
          </ScoreText>
        </CircularProgress>
      </ScoreDisplay>

      <MetricsGrid>
        <MetricCard>
          <MetricIcon color="#6366F1">
            <Target size={16} />
          </MetricIcon>
          <MetricValue>{target}</MetricValue>
          <MetricLabel>Target</MetricLabel>
        </MetricCard>

        <MetricCard>
          <MetricIcon color="#10B981">
            <Clock size={16} />
          </MetricIcon>
          <MetricValue>{actual}</MetricValue>
          <MetricLabel>Actual</MetricLabel>
        </MetricCard>

        <MetricCard>
          <MetricIcon color="#8B5CF6">
            <Moon size={16} />
          </MetricIcon>
          <MetricValue>{streak} days</MetricValue>
          <MetricLabel>Streak</MetricLabel>
        </MetricCard>
      </MetricsGrid>
    </SleepScoreContainer>
  );
}

export default SleepScore;
