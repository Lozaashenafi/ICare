
import { ipcMain } from 'electron';
import store, { recordBreak } from './services/store'; // Import them here
import { timerService } from './services/timerService';
import { getBreakWindow, getMainWindow } from './windows';

export const setupHandlers = () => {
  ipcMain.handle('settings:get', () => store.get('settings'));
  ipcMain.handle('stats:get', () => store.get('stats'));
  ipcMain.handle('stats:get-history', () => store.get('history'));

ipcMain.on('settings:save-all', (event, newSettings) => {
  store.set('settings', newSettings);
  
  // FORCE REFRESH: This ensures any other part of the app 
  // (like the dashboard) gets the new data immediately
  event.reply('settings:updated', newSettings); 
  
  if (timerService) timerService.resetTimer();
  console.log("Settings successfully persisted to disk.");
});

ipcMain.on('break:skip', () => {
  recordBreak('skipped');
  getBreakWindow()?.close();
});

ipcMain.on('timer:toggle', () => {
  const newState = timerService.togglePause();
  // Tell React to update UI
  getMainWindow()?.webContents.send('timer:sync-state', newState);
  // Tell Tray to update checkbox
  ipcMain.emit('timer:state-changed', null, newState);
});

ipcMain.on('timer:external-toggle', (_, isPaused) => {
  timerService.setPause(isPaused); // This now works!
  getMainWindow()?.webContents.send('timer:sync-state', isPaused);
});
ipcMain.on('timer:force-break', () => {
    console.log("Senior Log: Force Break Command Received");
    timerService.forceBreak();
  });

ipcMain.on('app:show-dashboard', () => {
    const win = getMainWindow();
    if (win) {
      win.show();
      win.focus();
    }
  });
ipcMain.on('timer:external-toggle', (_, shouldPause) => {
    timerService.setPause(shouldPause);
    // Tell the React UI to update the button text/color
    getMainWindow()?.webContents.send('timer:sync-state', shouldPause);
  });
ipcMain.on('break:complete', () => {
  recordBreak('completed');
  const win = getBreakWindow();
  if (win) {
    win.destroy();
    console.log("Break completed — PC unlocked.");
  }
});
  ipcMain.on('break:close', () => {
    getBreakWindow()?.close();
  });
};