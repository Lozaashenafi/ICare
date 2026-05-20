import { app, BrowserWindow } from 'electron';
import { createMainWindow } from './windows';
import { createTray } from './tray';
import { timerService } from './services/timerService';
import { setupHandlers } from './ipcHandlers';

// 1. We keep this flag here to handle the OS "Quit" command (Cmd+Q / Alt+F4)
let isQuitting = false;

app.whenReady().then(() => {
  const win = createMainWindow();
  win.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      win.hide();
    }
    return false;
  });

  createTray(win);
  timerService.init();
  setupHandlers();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    else win.show();
  });
});

// 3. MacOS standard: Quit when all windows are closed only if not hiding to tray
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin' && isQuitting) {
    app.quit();
  }
});

// 4. Set the flag when the user actually wants to quit (e.g. from Taskbar menu)
app.on('before-quit', () => {
  isQuitting = true;
});