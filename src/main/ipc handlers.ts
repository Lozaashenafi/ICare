import { ipcMain } from 'electron';
import store from './services/store';

export const setupHandlers = () => {
  // Handle requests for data (Async)
  ipcMain.handle('get-stats', () => {
    return store.get('stats');
  });

  ipcMain.handle('get-settings', () => {
    return store.get('settings');
  });

  // Handle saving data (Sync)
  ipcMain.on('save-setting', (_, key, value) => {
    store.set(`settings.${key}`, value);
  });
};