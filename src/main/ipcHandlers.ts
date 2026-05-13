
import { ipcMain } from 'electron';
import store from './services/store';
import { timerService } from './services/timerService';
import { getBreakWindow } from './windows';

export const setupHandlers = () => {
  // Async Requests (React asks, Backend answers)
  ipcMain.handle('settings:get', () => store.get('settings'));
  ipcMain.handle('stats:get', () => store.get('stats'));
  ipcMain.handle('stats:get-history', () => store.get('history'));

  // Fire-and-forget (React tells, Backend does)
  ipcMain.on('settings:save', (_, key, value) => {
    store.set(`settings.${key}`, value);
    if (key === 'interval') timerService.resetTimer(); // Update timer if interval changed
  });

  ipcMain.on('timer:toggle', () => timerService.togglePause());
  
  ipcMain.on('timer:trigger-break', () => {
    timerService.forceBreak();
  });

  ipcMain.on('break:close', () => {
    getBreakWindow()?.close();
  });
};