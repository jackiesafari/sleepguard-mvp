import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import SleepScore from './SleepScore';
import WeeklyInsights from './WeeklyInsights';
import QuickActions from './QuickActions';
import ActivityTimeline from './ActivityTimeline';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DashboardContainer = styled.div`
  padding: ${props => props.theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};
  overflow-y: auto;
  background: ${props => props.theme.colors.background};
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: ${props => props.theme.spacing.xl};
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};
`;

const ChartSection = styled.div`
  background: ${props => props.theme.colors.card};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.lg};
  border: 1px solid ${props => props.theme.colors.borderLight};
`;

const ChartTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ChartSubtitle = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

function Dashboard({ activityData, settings }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Process activity data for chart
    const now = new Date();
    const last24Hours = Array.from({ length: 24 }, (_, i) => {
      const hour = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
      return {
        hour: hour.getHours(),
        label: hour.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          hour12: true 
        })
      };
    });

    const activityByHour = last24Hours.map(({ hour, label }) => {
      const count = activityData.filter(activity => {
        const activityHour = new Date(activity.timestamp).getHours();
        return activityHour === hour;
      }).length;
      
      return {
        hour: label,
        count
      };
    });

    setChartData({
      labels: activityByHour.map(item => item.hour),
      datasets: [
        {
          label: 'Activity Count',
          data: activityByHour.map(item => item.count),
          borderColor: '#4F46E5',
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    });
  }, [activityData]);

  const calculateStats = () => {
    const now = new Date();
    const lastHour = activityData.filter(activity => 
      now.getTime() - activity.timestamp < 60 * 60 * 1000
    ).length;
    
    const last24Hours = activityData.filter(activity => 
      now.getTime() - activity.timestamp < 24 * 60 * 60 * 1000
    ).length;
    
    const lateNightActivities = activityData.filter(activity => {
      const hour = new Date(activity.timestamp).getHours();
      return hour >= 23 || hour <= 5;
    }).length;

    return {
      lastHour,
      last24Hours,
      lateNightActivities
    };
  };

  const stats = calculateStats();
  const currentHour = new Date().getHours();
  const isLateNight = currentHour >= 23 || currentHour <= 5;

  const generateReminders = () => {
    if (!isLateNight) return [];
    
    return [
      {
        id: 1,
        message: "It's getting late! Consider winding down soon.",
        time: "11:30 PM",
        type: "gentle"
      },
      {
        id: 2,
        message: "Your body needs rest. Time for bed?",
        time: "12:00 AM",
        type: "reminder"
      },
      {
        id: 3,
        message: "Sleep is essential for health. Please consider sleeping.",
        time: "12:30 AM",
        type: "urgent"
      }
    ];
  };

  const reminders = generateReminders();

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  return (
    <DashboardContainer>
      <DashboardGrid>
        <LeftColumn>
          <SleepScore 
            score={82}
            target="11:00 PM"
            actual="12:45 AM"
            streak={5}
          />
          
          <ActivityTimeline activityData={activityData} />
          
          <ChartSection>
            <ChartTitle>Activity Pattern (Last 24 Hours)</ChartTitle>
            <ChartSubtitle>Track your computer usage patterns throughout the day</ChartSubtitle>
            {chartData && (
              <Line data={chartData} options={chartOptions} />
            )}
          </ChartSection>
        </LeftColumn>

        <RightColumn>
          <QuickActions 
            onGoingToBed={() => console.log('Going to bed now')}
            onFiveMinutes={() => console.log('5 more minutes')}
            onSnooze={() => console.log('Snooze for 30 mins')}
          />
          
          <WeeklyInsights 
            lateHours={{ 
              value: "1.5 hrs", 
              description: "Improved by 30 mins", 
              percentage: 75 
            }}
            onTimeNights={{ 
              value: "5/7", 
              description: "Better than last week", 
              percentage: 71 
            }}
            responseRate={{ 
              value: "85%", 
              description: "You respond well to reminders", 
              percentage: 85 
            }}
          />
        </RightColumn>
      </DashboardGrid>
    </DashboardContainer>
  );
}

export default Dashboard;
