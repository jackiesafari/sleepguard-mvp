import React from 'react';
import styled from 'styled-components';
import { Settings as SettingsIcon, Bell, Moon, Clock, Shield } from 'lucide-react';

const SettingsContainer = styled.div`
  padding: ${props => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
  overflow-y: auto;
`;

const SettingsSection = styled.div`
  background: ${props => props.theme.colors.card};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  border: 1px solid ${props => props.theme.colors.border};
  overflow: hidden;
`;

const SectionHeader = styled.div`
  padding: ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.background};
`;

const SectionContent = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.md} 0;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const SettingInfo = styled.div`
  flex: 1;
`;

const SettingLabel = styled.div`
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const SettingDescription = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 0.875rem;
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
`;

const Select = styled.select`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 0.875rem;
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
`;

const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 24px;
    
    &:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }
  
  input:checked + .slider {
    background-color: ${props => props.theme.colors.primary};
  }
  
  input:checked + .slider:before {
    transform: translateX(24px);
  }
`;

const Button = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.theme.colors.primary};
  color: white;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primaryLight};
  }
  
  &:disabled {
    background: ${props => props.theme.colors.textSecondary};
    cursor: not-allowed;
  }
`;

const PrivacyInfo = styled.div`
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.md};
  border-left: 4px solid ${props => props.theme.colors.info};
`;

function Settings({ settings, onSettingsChange }) {
  const handleSettingChange = (key, value) => {
    onSettingsChange({ [key]: value });
  };

  const exportData = () => {
    // In a real app, this would export user data
    const data = {
      settings,
      exportDate: new Date().toISOString(),
      version: '1.0.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sleepguard-settings.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearData = () => {
    if (window.confirm('Are you sure you want to clear all activity data? This action cannot be undone.')) {
      // In a real app, this would clear the database
      console.log('Data cleared');
    }
  };

  return (
    <SettingsContainer>
      <SettingsSection>
        <SectionHeader>
          <Bell size={20} />
          <div>
            <h3>Sleep Reminders</h3>
            <div style={{ fontSize: '0.875rem', color: '#64748B', marginTop: '4px' }}>
              Configure when and how you receive sleep reminders
            </div>
          </div>
        </SectionHeader>
        
        <SectionContent>
          <SettingItem>
            <SettingInfo>
              <SettingLabel>Sleep Time</SettingLabel>
              <SettingDescription>
                The time when you typically want to go to sleep
              </SettingDescription>
            </SettingInfo>
            <Input
              type="time"
              value={settings.sleepTime}
              onChange={(e) => handleSettingChange('sleepTime', e.target.value)}
            />
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Reminder Interval</SettingLabel>
              <SettingDescription>
                How often to show reminders during late-night activity (in minutes)
              </SettingDescription>
            </SettingInfo>
            <Select
              value={settings.reminderInterval}
              onChange={(e) => handleSettingChange('reminderInterval', parseInt(e.target.value))}
            >
              <option value={15}>Every 15 minutes</option>
              <option value={30}>Every 30 minutes</option>
              <option value={60}>Every hour</option>
              <option value={120}>Every 2 hours</option>
            </Select>
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Enable Notifications</SettingLabel>
              <SettingDescription>
                Show sleep reminder notifications
              </SettingDescription>
            </SettingInfo>
            <Toggle>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleSettingChange('notifications', e.target.checked)}
              />
              <span className="slider"></span>
            </Toggle>
          </SettingItem>
        </SectionContent>
      </SettingsSection>

      <SettingsSection>
        <SectionHeader>
          <Moon size={20} />
          <div>
            <h3>Sleep Schedule</h3>
            <div style={{ fontSize: '0.875rem', color: '#64748B', marginTop: '4px' }}>
              Define your sleep schedule and quiet hours
            </div>
          </div>
        </SectionHeader>
        
        <SectionContent>
          <SettingItem>
            <SettingInfo>
              <SettingLabel>Quiet Hours</SettingLabel>
              <SettingDescription>
                Enable quiet hours mode (11 PM - 6 AM)
              </SettingDescription>
            </SettingInfo>
            <Toggle>
              <input
                type="checkbox"
                checked={settings.quietHours}
                onChange={(e) => handleSettingChange('quietHours', e.target.checked)}
              />
              <span className="slider"></span>
            </Toggle>
          </SettingItem>
        </SectionContent>
      </SettingsSection>

      <SettingsSection>
        <SectionHeader>
          <Shield size={20} />
          <div>
            <h3>Privacy & Data</h3>
            <div style={{ fontSize: '0.875rem', color: '#64748B', marginTop: '4px' }}>
              Manage your data and privacy settings
            </div>
          </div>
        </SectionHeader>
        
        <SectionContent>
          <SettingItem>
            <SettingInfo>
              <SettingLabel>Export Settings</SettingLabel>
              <SettingDescription>
                Download your settings and preferences
              </SettingDescription>
            </SettingInfo>
            <Button onClick={exportData}>
              Export Data
            </Button>
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Clear Activity Data</SettingLabel>
              <SettingDescription>
                Remove all stored activity history
              </SettingDescription>
            </SettingInfo>
            <Button onClick={clearData} style={{ background: '#EF4444' }}>
              Clear Data
            </Button>
          </SettingItem>

          <PrivacyInfo>
            <div style={{ fontWeight: 500, marginBottom: '4px' }}>
              🔒 Privacy First
            </div>
            <div style={{ fontSize: '0.875rem' }}>
              All data is stored locally on your device. No personal information is sent to external servers. 
              Activity monitoring only tracks input events, not content.
            </div>
          </PrivacyInfo>
        </SectionContent>
      </SettingsSection>
    </SettingsContainer>
  );
}

export default Settings;
