// SleepGuard Chrome Extension - Background Service Worker

class SleepGuardBackground {
  constructor() {
    this.activityData = [];
    this.settings = {
      sleepTime: '23:00',
      reminderInterval: 30,
      notifications: true,
      darkMode: false
    };
    this.isMonitoring = true;
    this.lastActivityTime = Date.now();
    this.reminderAlarms = new Map();
    
    this.init();
  }

  async init() {
    await this.loadSettings();
    await this.loadActivityData();
    this.setupEventListeners();
    this.startActivityMonitoring();
    this.setupReminderAlarms();
  }

  async loadSettings() {
    try {
      const result = await chrome.storage.local.get(['sleepGuardSettings']);
      if (result.sleepGuardSettings) {
        this.settings = { ...this.settings, ...result.sleepGuardSettings };
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

  async saveActivityData() {
    try {
      // Keep only last 1000 activities to manage storage
      const recentData = this.activityData.slice(-1000);
      await chrome.storage.local.set({
        sleepGuardActivity: recentData
      });
      this.activityData = recentData;
    } catch (error) {
      console.error('Error saving activity data:', error);
    }
  }

  setupEventListeners() {
    // Listen for tab updates
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (changeInfo.status === 'complete' && tab.url) {
        this.recordActivity('tab', {
          tabId,
          url: tab.url,
          title: tab.title,
          timestamp: Date.now()
        });
      }
    });

    // Listen for tab activation
    chrome.tabs.onActivated.addListener((activeInfo) => {
      this.recordActivity('tab_switch', {
        tabId: activeInfo.tabId,
        timestamp: Date.now()
      });
    });

    // Listen for messages from popup
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      this.handleMessage(message, sender, sendResponse);
      return true; // Keep message channel open for async response
    });

    // Listen for alarm events
    chrome.alarms.onAlarm.addListener((alarm) => {
      this.handleAlarm(alarm);
    });

    // Listen for idle state changes
    chrome.idle.onStateChanged.addListener((newState) => {
      this.handleIdleStateChange(newState);
    });

    // Listen for installation/startup
    chrome.runtime.onInstalled.addListener(() => {
      this.handleInstallation();
    });
  }

  async handleMessage(message, sender, sendResponse) {
    switch (message.action) {
      case 'goingToBed':
        await this.handleGoingToBed(message);
        sendResponse({ success: true });
        break;
        
      case 'snooze':
        await this.handleSnooze(message);
        sendResponse({ success: true });
        break;
        
      case 'getActivityData':
        sendResponse({ data: this.activityData });
        break;
        
      case 'getSettings':
        sendResponse({ settings: this.settings });
        break;
        
      case 'updateSettings':
        this.settings = { ...this.settings, ...message.settings };
        await this.saveSettings();
        sendResponse({ success: true });
        break;
        
      case 'clearData':
        await this.clearAllData();
        sendResponse({ success: true });
        break;
        
      default:
        sendResponse({ error: 'Unknown action' });
    }
  }

  recordActivity(type, data) {
    if (!this.isMonitoring) return;

    const activity = {
      id: Date.now() + Math.random(),
      type,
      timestamp: Date.now(),
      ...data
    };

    this.activityData.push(activity);
    this.lastActivityTime = Date.now();

    // Save data periodically (every 10 activities)
    if (this.activityData.length % 10 === 0) {
      this.saveActivityData();
    }

    // Check if we should show late night reminder
    this.checkLateNightReminder();
  }

  checkLateNightReminder() {
    const now = new Date();
    const hour = now.getHours();
    const isLateNight = hour >= 23 || hour <= 5;

    if (isLateNight && this.settings.notifications) {
      // Check if we've been active for more than 30 minutes during late hours
      const thirtyMinutesAgo = now.getTime() - (30 * 60 * 1000);
      const recentActivity = this.activityData.filter(
        activity => activity.timestamp > thirtyMinutesAgo
      );

      if (recentActivity.length > 20) {
        this.showSleepReminder();
      }
    }
  }

  async showSleepReminder() {
    // Check if we already showed a reminder recently
    const lastReminder = await chrome.storage.local.get(['lastReminder']);
    const now = Date.now();
    
    if (lastReminder.lastReminder && (now - lastReminder.lastReminder) < (30 * 60 * 1000)) {
      return; // Don't show reminder if shown within last 30 minutes
    }

    // Create notification
    await chrome.notifications.create({
      type: 'basic',
      title: 'SleepGuard - Time for Bed?',
      message: 'You\'ve been active for a while. Consider winding down for better sleep quality.',
      buttons: [
        { title: 'Going to Bed' },
        { title: '5 More Minutes' }
      ]
    });

    // Save reminder timestamp
    await chrome.storage.local.set({
      lastReminder: now
    });
  }

  async handleGoingToBed(message) {
    // Record bedtime
    await chrome.storage.local.set({
      lastBedtime: message.timestamp
    });

    // Clear any pending reminders
    await chrome.alarms.clear('sleepReminder');
    
    // Show bedtime notification
    await chrome.notifications.create({
      type: 'basic',
      title: 'SleepGuard',
      message: 'Good night! Sleep well! 🌙'
    });
  }

  async handleSnooze(message) {
    const duration = message.duration || 30;
    const alarmName = `sleepReminder_${Date.now()}`;
    
    // Set alarm for reminder
    chrome.alarms.create(alarmName, {
      delayInMinutes: duration
    });

    this.reminderAlarms.set(alarmName, {
      duration,
      createdAt: Date.now()
    });
  }

  async handleAlarm(alarm) {
    if (alarm.name.startsWith('sleepReminder_')) {
      // Show snooze reminder
      await chrome.notifications.create({
        type: 'basic',
        title: 'SleepGuard - Reminder',
        message: 'Your snooze time is up. Time to consider going to bed?',
        buttons: [
          { title: 'Going to Bed' },
          { title: 'Snooze Again' }
        ]
      });

      // Clean up alarm
      this.reminderAlarms.delete(alarm.name);
    }
  }

  handleIdleStateChange(newState) {
    if (newState === 'active') {
      this.recordActivity('idle_return', {
        timestamp: Date.now(),
        idleState: 'active'
      });
    } else if (newState === 'idle') {
      this.recordActivity('idle_start', {
        timestamp: Date.now(),
        idleState: 'idle'
      });
    }
  }

  async handleInstallation() {
    // Set up default alarms and initial data
    console.log('SleepGuard extension installed');
    
    // Request notification permission
    try {
      await chrome.notifications.getPermissionLevel();
    } catch (error) {
      console.log('Notification permission not available');
    }
  }

  setupReminderAlarms() {
    // Set up periodic sleep time reminders
    const sleepTime = this.settings.sleepTime;
    const [hours, minutes] = sleepTime.split(':').map(Number);
    
    // Create daily reminder at sleep time
    chrome.alarms.create('dailySleepReminder', {
      when: this.getNextSleepTime(hours, minutes)
    });
  }

  getNextSleepTime(hours, minutes) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
    
    if (today <= now) {
      today.setDate(today.getDate() + 1);
    }
    
    return today.getTime();
  }

  startActivityMonitoring() {
    // Simulate mouse and keyboard activity detection
    // In a real implementation, this would use content scripts
    setInterval(() => {
      if (this.isMonitoring) {
        // Simulate random activity
        if (Math.random() < 0.1) { // 10% chance every 5 seconds
          this.recordActivity('simulated_activity', {
            type: Math.random() < 0.5 ? 'mouse' : 'keyboard',
            timestamp: Date.now()
          });
        }
      }
    }, 5000);
  }

  async clearAllData() {
    this.activityData = [];
    await chrome.storage.local.clear();
    await this.saveSettings();
    await this.saveActivityData();
  }

  // Utility method to get activity statistics
  getActivityStats() {
    const now = Date.now();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStart = today.getTime();

    const todayActivity = this.activityData.filter(
      activity => activity.timestamp >= todayStart
    );

    const stats = {
      today: {
        total: todayActivity.length,
        mouse: todayActivity.filter(a => a.type.includes('mouse')).length,
        keyboard: todayActivity.filter(a => a.type.includes('keyboard')).length,
        tab: todayActivity.filter(a => a.type.includes('tab')).length
      },
      lateNight: todayActivity.filter(activity => {
        const hour = new Date(activity.timestamp).getHours();
        return hour >= 23 || hour <= 5;
      }).length
    };

    return stats;
  }
}

// Initialize background script
new SleepGuardBackground();
