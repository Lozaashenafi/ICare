
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

  ipcMain.on('break:close', () => {
    getBreakWindow()?.close();
  });
};