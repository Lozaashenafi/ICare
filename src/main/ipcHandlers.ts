
import { ipcMain } from 'electron';
import store, { recordBreak, recordPause } from './services/store'; // Import them here
import { timerService } from './services/timerService';
import { getBreakWindow } from './windows';

export const setupHandlers = () => {
  ipcMain.handle('settings:get', () => store.get('settings'));
  ipcMain.handle('stats:get', () => store.get('stats'));
  ipcMain.handle('stats:get-history', () => store.get('history'));

  // Called from RoastPopup.tsx
  ipcMain.on('break:complete', () => {
  recordBreak('completed');
  getBreakWindow()?.close();
});
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
    const isPaused = timerService.togglePause();
    if (isPaused) recordPause(); // Track the penalty
  });
  ipcMain.on('timer:trigger-break', () => {
    timerService.forceBreak();
  });
ipcMain.on('break:complete', () => {
  const win = getBreakWindow();
  if (win) {
    // DESTROY is faster than CLOSE. It prevents the 3-minute hang.
    win.destroy(); 
    console.log("PC Unlocked Instantly.");
  }
});
  ipcMain.on('break:close', () => {
    getBreakWindow()?.close();
  });
};