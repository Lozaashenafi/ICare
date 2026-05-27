import { app, BrowserWindow } from 'electron';
import { createMainWindow, getMainWindow } from './windows';
import { createTray } from './tray';
import { timerService } from './services/timerService';
import { setupHandlers } from './ipcHandlers';

// --- 1. SINGLE INSTANCE LOCK ---
// This prevents multiple "ICare" icons from appearing in your top bar
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  // If another ICare is already running, kill this one immediately
  app.quit();
} else {
  // If someone tries to open a second ICare, just show the existing window
  app.on('second-instance', () => {
    const win = getMainWindow();
    if (win) {
      if (win.isMinimized()) win.restore();
      win.show();
      win.focus();
    }
  });

  app.whenReady().then(() => {
    app.setName('ICare');
    const win = createMainWindow();

    // --- 2. THE "X" BUTTON LOGIC ---
    // CHOICE A: If you want 'X' to fully QUIT the app (remove the bar icon):
    win.on('closed', () => {
      app.quit(); 
    });

    /* 
    CHOICE B: (Commented out) If you wanted to hide to tray instead:
    win.on('close', (event) => {
        event.preventDefault();
        win.hide();
    });
    */

    setupHandlers();
    createTray(win);
    timerService.init();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    });
  });
}

// Ensure all processes die when quitting
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});