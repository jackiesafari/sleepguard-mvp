// SleepGuard Chrome Extension - Options Page Script

class SleepGuardOptions {
  constructor() {
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
    this.setupEventListeners();
    this.updateUI();
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
      
      // Notify background script of settings change
      chrome.runtime.sendMessage({
        action: 'updateSettings',
        settings: this.settings
      });
      
      this.showNotification('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      this.showNotification('Error saving settings', 'error');
    }
  }

  setupEventListeners() {
    // Save settings button
    const saveBtn = document.getElementById('saveSettings');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => this.saveSettings());
    }

    // Reset settings button
    const resetBtn = document.getElementById('resetSettings');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.resetSettings());
    }

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Settings inputs
    const sleepTime = document.getElementById('sleepTime');
    if (sleepTime) {
      sleepTime.addEventListener('change', (e) => {
        this.settings.sleepTime = e.target.value;
      });
    }

    const reminderInterval = document.getElementById('reminderInterval');
    if (reminderInterval) {
      reminderInterval.addEventListener('change', (e) => {
        this.settings.reminderInterval = parseInt(e.target.value);
      });
    }

    const notifications = document.getElementById('notifications');
    if (notifications) {
      notifications.addEventListener('change', (e) => {
        this.settings.notifications = e.target.checked;
      });
    }

    const darkMode = document.getElementById('darkMode');
    if (darkMode) {
      darkMode.addEventListener('change', (e) => {
        this.settings.darkMode = e.target.checked;
        this.updateTheme();
      });
    }

    // Action buttons
    const exportBtn = document.getElementById('exportData');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportData());
    }

    const clearBtn = document.getElementById('clearData');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.clearData());
    }
  }

  updateUI() {
    // Update form values
    document.getElementById('sleepTime').value = this.settings.sleepTime;
    document.getElementById('reminderInterval').value = this.settings.reminderInterval;
    document.getElementById('notifications').checked = this.settings.notifications;
    document.getElementById('darkMode').checked = this.settings.darkMode;
    
    this.updateTheme();
  }

  toggleTheme() {
    this.settings.darkMode = !this.settings.darkMode;
    document.getElementById('darkMode').checked = this.settings.darkMode;
    this.updateTheme();
  }

  updateTheme() {
    document.documentElement.setAttribute('data-theme', 
      this.settings.darkMode ? 'dark' : 'light'
    );
    
    // Update toggle icon
    const toggleIcon = document.getElementById('toggleIcon');
    if (toggleIcon) {
      if (this.settings.darkMode) {
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

  async resetSettings() {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
      this.settings = {
        sleepTime: '23:00',
        reminderInterval: 30,
        notifications: true,
        darkMode: false
      };
      
      await this.saveSettings();
      this.updateUI();
      this.showNotification('Settings reset to defaults');
    }
  }

  async exportData() {
    try {
      // Get all stored data
      const result = await chrome.storage.local.get();
      
      const exportData = {
        settings: result.sleepGuardSettings || {},
        activity: result.sleepGuardActivity || [],
        exportDate: new Date().toISOString(),
        version: '1.0.0'
      };

      // Create and download file
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json'
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sleepguard-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      this.showNotification('Data exported successfully!');
    } catch (error) {
      console.error('Error exporting data:', error);
      this.showNotification('Error exporting data', 'error');
    }
  }

  async clearData() {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      try {
        // Clear all storage
        await chrome.storage.local.clear();
        
        // Notify background script
        chrome.runtime.sendMessage({
          action: 'clearData'
        });
        
        // Reset to defaults
        this.settings = {
          sleepTime: '23:00',
          reminderInterval: 30,
          notifications: true,
          darkMode: false
        };
        
        this.updateUI();
        this.showNotification('All data cleared successfully');
      } catch (error) {
        console.error('Error clearing data:', error);
        this.showNotification('Error clearing data', 'error');
      }
    }
  }

  showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      z-index: 1000;
      opacity: 0;
      transform: translateY(-20px);
      transition: all 0.3s ease;
      background: ${type === 'error' ? '#EF4444' : '#10B981'};
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(-20px)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
}

// Initialize options page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SleepGuardOptions();
});
