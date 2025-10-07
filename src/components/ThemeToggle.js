import React from 'react';
import styled from 'styled-components';
import { Sun, Moon } from 'lucide-react';

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const ToggleButton = styled.button`
  position: relative;
  width: 56px;
  height: 28px;
  background: ${props => props.theme.colors.border};
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  padding: 2px;
  
  &:hover {
    background: ${props => props.theme.colors.borderLight};
  }
`;

const ToggleSlider = styled.div`
  position: absolute;
  top: 2px;
  left: 2px;
  width: 24px;
  height: 24px;
  background: ${props => props.theme.colors.white};
  border-radius: 50%;
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${props => props.theme.shadows.sm};
  
  transform: ${props => props.isDark ? 'translateX(28px)' : 'translateX(0)'};
`;

const ThemeIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textSecondary};
  transition: color 0.3s ease;
`;

const ToggleLabel = styled.span`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  font-weight: 500;
  user-select: none;
`;

function ThemeToggle({ isDarkMode, onToggle }) {
  return (
    <ToggleContainer>
      <ThemeIcon>
        <Sun size={16} />
      </ThemeIcon>
      <ToggleButton onClick={onToggle} aria-label="Toggle theme">
        <ToggleSlider isDark={isDarkMode}>
          {isDarkMode ? (
            <Moon size={12} color="#1F2937" />
          ) : (
            <Sun size={12} color="#F59E0B" />
          )}
        </ToggleSlider>
      </ToggleButton>
      <ThemeIcon>
        <Moon size={16} />
      </ThemeIcon>
    </ToggleContainer>
  );
}

export default ThemeToggle;
