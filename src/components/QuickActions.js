import React from 'react';
import styled from 'styled-components';
import { Moon, Clock, Coffee } from 'lucide-react';

const ActionsContainer = styled.div`
  background: ${props => props.theme.colors.card};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.lg};
  border: 1px solid ${props => props.theme.colors.borderLight};
`;

const ActionsHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ActionsTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const ActionsSubtitle = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const PrimaryAction = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  transition: all 0.2s ease;
  box-shadow: ${props => props.theme.shadows.md};
  
  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SecondaryAction = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.background};
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.sm};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ActionIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function QuickActions({ 
  onGoingToBed = () => console.log('Going to bed now'),
  onFiveMinutes = () => console.log('5 more minutes'),
  onSnooze = () => console.log('Snooze for 30 mins')
}) {
  return (
    <ActionsContainer>
      <ActionsHeader>
        <ActionsTitle>Quick Actions</ActionsTitle>
        <ActionsSubtitle>Manage your sleep schedule</ActionsSubtitle>
      </ActionsHeader>

      <ActionButtons>
        <PrimaryAction onClick={onGoingToBed}>
          <ActionIcon>
            <Moon size={20} />
          </ActionIcon>
          Going to Bed Now
        </PrimaryAction>

        <SecondaryAction onClick={onFiveMinutes}>
          <ActionIcon>
            <Clock size={20} />
          </ActionIcon>
          5 More Minutes
        </SecondaryAction>

        <SecondaryAction onClick={onSnooze}>
          <ActionIcon>
            <Coffee size={20} />
          </ActionIcon>
          Snooze for 30 Mins
        </SecondaryAction>
      </ActionButtons>
    </ActionsContainer>
  );
}

export default QuickActions;
