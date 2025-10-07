const lightTheme = {
  colors: {
    primary: '#6366F1', // Indigo - enhanced
    primaryLight: '#818CF8',
    primaryDark: '#4F46E5',
    secondary: '#10B981', // Emerald
    accent: '#8B5CF6', // Purple accent
    background: '#FAFBFC', // Slightly warmer background
    sidebar: '#FFFFFF',
    card: '#FFFFFF',
    text: '#1E293B',
    textSecondary: '#64748B',
    textLight: '#94A3B8',
    border: '#E2E8F0',
    borderLight: '#F1F5F9',
    hover: '#F8FAFC',
    white: '#FFFFFF',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    // Sleep-focused colors
    sleepScore: '#6366F1',
    sleepScoreBg: '#EEF2FF',
    moon: '#8B5CF6',
    star: '#FBBF24'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1280px'
  }
};

const darkTheme = {
  colors: {
    primary: '#DC2626', // Ruby red primary
    primaryLight: '#EF4444',
    primaryDark: '#B91C1C',
    secondary: '#10B981', // Emerald (kept for contrast)
    accent: '#F97316', // Orange accent for warmth
    background: '#0F0F0F', // Deep black background
    sidebar: '#1A1A1A', // Dark sidebar
    card: '#1E1E1E', // Dark cards
    text: '#F5F5F5', // Light text
    textSecondary: '#A3A3A3', // Muted light text
    textLight: '#737373', // Very muted text
    border: '#2A2A2A', // Dark borders
    borderLight: '#1F1F1F', // Very dark borders
    hover: '#262626', // Dark hover state
    white: '#FFFFFF',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    // Sleep-focused colors (dark mode)
    sleepScore: '#DC2626', // Ruby red
    sleepScoreBg: '#1F0F0F', // Very dark red background
    moon: '#F97316', // Warm orange
    star: '#FBBF24'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)'
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1280px'
  }
};

export { lightTheme, darkTheme };
export const theme = lightTheme; // Default theme
