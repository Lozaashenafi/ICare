import { app, BrowserWindow, ipcMain } from 'electron';
import { createMainWindow, getMainWindow } from './windows';
import { createTray } from './tray';
import { timerService } from './services/timerService';
import { setupHandlers } from './ipcHandlers';

// Prevent app from closing when windows are closed
let isQuitting = false;

app.whenReady().then(() => {
  const win = createMainWindow();
  createTray(win);
  timerService.init();
  setupHandlers();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

// Handle the "X" button - hide window instead of quitting
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin' && !isQuitting) {
    getMainWindow()?.hide();
  }
});

// Real quit logic
app.on('before-quit', () => isQuitting = true);