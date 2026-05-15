
import { ipcMain , app} from 'electron';
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
ipcMain.on('settings:save-all', (_, newSettings) => {
  console.log('[Backend] Bulk saving settings:', newSettings);
  
  // 1. Update the store
  store.set('settings', newSettings);

  // 2. Refresh services that depend on these settings
  if (timerService) {
    timerService.resetTimer(); // Immediately updates the dashboard clock
  }

  // 3. Update OS settings (Boot)
  if (newSettings.launchOnBoot !== undefined) {
    app.setLoginItemSettings({ openAtLogin: newSettings.launchOnBoot });
  }
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