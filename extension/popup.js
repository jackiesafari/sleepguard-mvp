// SleepGuard Chrome Extension - Popup Script

class SleepGuardPopup {
  constructor() {
    this.currentTheme = 'light';
    this.activityData = [];
    this.settings = {
      sleepTime: '23:00',
      reminderInterval: 30,
      notifications: true,
      darkMode: false
    };
    
    this.init();
  }

  async init() {
    await this.loadSettings();
    await this.loadActivityData();
    this.setupEventListeners();
    this.updateUI();
    this.checkLateNightMode();
    this.startPeriodicUpdates();
  }

  async loadSettings() {
    try {
      const result = await chrome.storage.local.get(['sleepGuardSettings']);
      if (result.sleepGuardSettings) {
        this.settings = { ...this.settings, ...result.sleepGuardSettings };
        this.currentTheme = this.settings.darkMode ? 'dark' : 'light';
      }
    } catch (error) {
      console.log('No settings found, using defaults');
    }
  }

  async saveSettings() {
    try {
      await chrome.storage.local.set({
        sleepGuardSettings: this.settings
      });
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }

  async loadActivityData() {
    try {
      const result = await chrome.storage.local.get(['sleepGuardActivity']);
      if (result.sleepGuardActivity) {
        this.activityData = result.sleepGuardActivity;
      }
    } catch (error) {
      console.log('No activity data found');
    }
  }

  setupEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Quick action buttons
    const goingToBedBtn = document.getElementById('goingToBed');
    if (goingToBedBtn) {
      goingToBedBtn.addEventListener('click', () => this.handleGoingToBed());
    }

    const fiveMinutesBtn = document.getElementById('fiveMinutes');
    if (fiveMinutesBtn) {
      fiveMinutesBtn.addEventListener('click', () => this.handleFiveMinutes());
    }

    const snoozeBtn = document.getElementById('snooze');
    if (snoozeBtn) {
      snoozeBtn.addEventListener('click', () => this.handleSnooze());
    }

    // Settings button
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => this.openSettings());
    }
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.settings.darkMode = this.currentTheme === 'dark';
    this.saveSettings();
    this.updateTheme();
  }

  updateTheme() {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    
    // Update toggle icon
    const toggleIcon = document.getElementById('toggleIcon');
    if (toggleIcon) {
      if (this.currentTheme === 'dark') {
        toggleIcon.innerHTML = `
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/>
        `;
      } else {
        toggleIcon.innerHTML = `
          <circle cx="12" cy="12" r="5" fill="currentColor"/>
        `;
      }
    }
  }

  updateUI() {
    this.updateTheme();
    this.updateSleepScore();
    this.updateActivityDisplay();
    this.updateTimeDisplay();
  }

  updateSleepScore() {
    // Calculate sleep score based on activity patterns
    const score = this.calculateSleepScore();
    const scoreNumber = document.querySelector('.score-number');
    if (scoreNumber) {
      scoreNumber.textContent = score;
    }

    // Update progress circle
    const progressCircle = document.querySelector('.progress-circle');
    if (progressCircle) {
      const circumference = 2 * Math.PI * 54; // radius = 54
      const offset = circumference - (score / 100) * circumference;
      progressCircle.style.strokeDashoffset = offset;
    }

    // Update metrics with demo data
    this.updateMetrics();
  }

  calculateSleepScore() {
    // Simple scoring algorithm based on activity patterns
    const now = new Date();
    const hour = now.getHours();
    
    // Base score
    let score = 85;
    
    // Penalty for late night activity
    if (hour >= 23 || hour <= 5) {
      score -= 15;
    }
    
    // Bonus for consistent sleep schedule
    if (this.activityData.length > 0) {
      const recentActivity = this.activityData.filter(activity => 
        now.getTime() - activity.timestamp < 24 * 60 * 60 * 1000
      );
      
      if (recentActivity.length < 50) {
        score += 10; // Bonus for less activity
      }
    }
    
    return Math.max(0, Math.min(100, score));
  }

  updateMetrics() {
    // Update target time
    const targetMetric = document.querySelector('.metric:first-child .metric-value');
    if (targetMetric) {
      targetMetric.textContent = this.settings.sleepTime;
    }

    // Update actual time (demo: current time)
    const actualMetric = document.querySelector('.metric:nth-child(2) .metric-value');
    if (actualMetric) {
      const now = new Date();
      actualMetric.textContent = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: false
      });
    }

    // Update streak (demo: random between 3-7)
    const streakMetric = document.querySelector('.metric:last-child .metric-value');
    if (streakMetric) {
      streakMetric.textContent = `${Math.floor(Math.random() * 5) + 3} days`;
    }
  }

  updateActivityDisplay() {
    // Generate demo activity data if none exists
    if (this.activityData.length === 0) {
      this.generateDemoActivity();
    }

    // Update activity counts
    const now = Date.now();
    const todayStart = new Date().setHours(0, 0, 0, 0);
    const todayActivity = this.activityData.filter(activity => 
      activity.timestamp >= todayStart
    );

    // Count different activity types
    const mouseCount = todayActivity.filter(a => a.type === 'mouse').length;
    const keyboardCount = todayActivity.filter(a => a.type === 'keyboard').length;
    const tabCount = todayActivity.filter(a => a.type === 'tab').length;

    // Update activity counts in UI
    const activityCounts = document.querySelectorAll('.activity-count');
    if (activityCounts.length >= 3) {
      activityCounts[0].textContent = mouseCount;
      activityCounts[1].textContent = keyboardCount;
      activityCounts[2].textContent = tabCount;
    }
  }

  generateDemoActivity() {
    const now = Date.now();
    const types = ['mouse', 'keyboard', 'tab'];
    
    for (let i = 0; i < 100; i++) {
      const timestamp = now - (Math.random() * 24 * 60 * 60 * 1000);
      const type = types[Math.floor(Math.random() * types.length)];
      
      this.activityData.push({
        id: i,
        type,
        timestamp,
        url: 'chrome://newtab/',
        title: 'New Tab'
      });
    }
    
    // Save demo data
    chrome.storage.local.set({
      sleepGuardActivity: this.activityData
    });
  }

  updateTimeDisplay() {
    const now = new Date();
    const hour = now.getHours();
    const isLateNight = hour >= 23 || hour <= 5;
    
    // Update time status
    const timeStatus = document.getElementById('timeStatus');
    if (timeStatus) {
      timeStatus.textContent = isLateNight ? 'Late Night Mode' : 'Normal Hours';
    }
    
    // Update late night dot
    const lateNightDot = document.getElementById('lateNightDot');
    if (lateNightDot) {
      lateNightDot.classList.toggle('active', isLateNight);
    }
    
    // Show/hide late night warning
    const warning = document.getElementById('lateNightWarning');
    if (warning) {
      warning.style.display = isLateNight ? 'flex' : 'none';
    }
  }

  checkLateNightMode() {
    const now = new Date();
    const hour = now.getHours();
    
    // Auto-switch to dark mode during late hours if not manually set
    if (!this.settings.darkMode && (hour >= 20 || hour <= 6)) {
      this.currentTheme = 'dark';
      this.updateTheme();
    }
  }

  startPeriodicUpdates() {
    // Update time display every minute
    setInterval(() => {
      this.updateTimeDisplay();
      this.checkLateNightMode();
    }, 60000);
    
    // Update activity data every 30 seconds
    setInterval(() => {
      this.loadActivityData();
      this.updateActivityDisplay();
      this.updateSleepScore();
    }, 30000);
  }

  handleGoingToBed() {
    // Send message to background script
    chrome.runtime.sendMessage({
      action: 'goingToBed',
      timestamp: Date.now()
    });
    
    // Show feedback
    this.showNotification('Good night! Sleep well! 🌙');
  }

  handleFiveMinutes() {
    chrome.runtime.sendMessage({
      action: 'snooze',
      duration: 5,
      timestamp: Date.now()
    });
    
    this.showNotification('5 more minutes granted ⏰');
  }

  handleSnooze() {
    chrome.runtime.sendMessage({
      action: 'snooze',
      duration: 30,
      timestamp: Date.now()
    });
    
    this.showNotification('Snoozed for 30 minutes ☕');
  }

  openSettings() {
    // Open options page or show settings in popup
    chrome.runtime.openOptionsPage();
  }

  showNotification(message) {
    // Create temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--primary);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 0.875rem;
      z-index: 1000;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

// Initialize the popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SleepGuardPopup();
});
