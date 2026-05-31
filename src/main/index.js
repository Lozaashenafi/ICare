import { app, BrowserWindow } from 'electron';
import { createMainWindow, getMainWindow } from './windows';
import { createTray } from './tray';
import { timerService } from './services/timerService';
import { setupHandlers } from './ipcHandlers';

// 1. CRITICAL: Linux fixes must happen BEFORE the lock request
// Add this at the very top, before Lock or App initialization
if (process.platform === 'linux') {
  // Force X11/XWayland instead of pure Wayland for stability in dev
  process.env.ELECTRON_OZONE_PLATFORM_HINT = 'x11';
  
  app.disableHardwareAcceleration();
  app.commandLine.appendSwitch('no-sandbox');
  app.commandLine.appendSwitch('disable-gpu');
  app.commandLine.appendSwitch('disable-software-rasterizer');
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  console.log("⚠️ Another instance is already running. Quitting...");
  app.quit();
} else {
  app.on('second-instance', () => {
    console.log("🔄 Second instance detected, focusing main window.");
    const win = getMainWindow();
    if (win) {
      if (win.isMinimized()) win.restore();
      win.show();
      win.focus();
    }
  });

 app.whenReady().then(() => {
    console.log("🚀 App is ready. Initializing components...");
    
    try {
      app.setName('ICare');
      const win = createMainWindow();

      // Show the window immediately to bypass Wayland "ready-to-show" bugs
      win.show(); 
      console.log("✨ Window forced to show");

      win.on('closed', () => {
        app.quit(); 
      });

      setupHandlers();
      createTray(win);
      timerService.init();

      app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
      });
    } catch (error) {
      console.error("❌ CRITICAL ERROR DURING INIT:", error);
    }
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});