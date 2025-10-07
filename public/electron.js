const { app, BrowserWindow, ipcMain, globalShortcut, screen } = require('electron');
const path = require('path');
const isDev = process.env.ELECTRON_IS_DEV === 'true';

// Keep a global reference of the window object
let mainWindow;
let activityMonitor;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'icon.png'),
    titleBarStyle: 'default',
    show: false // Don't show until ready
  });

  // Load the app
  const startUrl = isDev 
    ? 'http://localhost:3000' 
    : `file://${path.join(__dirname, '../build/index.html')}`;
  
  mainWindow.loadURL(startUrl);

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Initialize activity monitoring
  initializeActivityMonitoring();
}

function initializeActivityMonitoring() {
  // Platform-specific activity monitoring
  const os = require('os');
  
  if (os.platform() === 'darwin') {
    // macOS implementation
    initializeMacActivityMonitoring();
  } else if (os.platform() === 'win32') {
    // Windows implementation
    initializeWindowsActivityMonitoring();
  } else if (os.platform() === 'linux') {
    // Linux implementation
    initializeLinuxActivityMonitoring();
  }
}

function initializeMacActivityMonitoring() {
  // macOS specific activity monitoring using Core Graphics
  const { exec } = require('child_process');
  
  setInterval(() => {
    // Get mouse position and activity
    exec('system_profiler SPUSBDataType | grep -i mouse', (error, stdout) => {
      if (!error && stdout) {
        // Mouse activity detected
        mainWindow.webContents.send('activity-detected', {
          type: 'mouse',
          timestamp: Date.now(),
          platform: 'macos'
        });
      }
    });
  }, 5000); // Check every 5 seconds
}

function initializeWindowsActivityMonitoring() {
  // Windows specific activity monitoring
  const { exec } = require('child_process');
  
  setInterval(() => {
    // Get cursor position using PowerShell
    exec('powershell "Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.Cursor]::Position"', (error, stdout) => {
      if (!error && stdout) {
        mainWindow.webContents.send('activity-detected', {
          type: 'cursor',
          timestamp: Date.now(),
          platform: 'windows',
          position: stdout.trim()
        });
      }
    });
  }, 5000);
}

function initializeLinuxActivityMonitoring() {
  // Linux specific activity monitoring using X11
  const { exec } = require('child_process');
  
  setInterval(() => {
    // Get mouse position using xdotool
    exec('xdotool getmouselocation', (error, stdout) => {
      if (!error && stdout) {
        mainWindow.webContents.send('activity-detected', {
          type: 'mouse',
          timestamp: Date.now(),
          platform: 'linux',
          position: stdout.trim()
        });
      }
    });
  }, 5000);
}

// App event handlers
app.whenReady().then(() => {
  createWindow();
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handlers for communication with renderer process
ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

ipcMain.handle('get-platform', () => {
  return process.platform;
});

ipcMain.handle('minimize-window', () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

ipcMain.handle('close-window', () => {
  if (mainWindow) {
    mainWindow.close();
  }
});

// Prevent navigation away from the app
app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    
    if (parsedUrl.origin !== startUrl) {
      event.preventDefault();
    }
  });
});
