import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  // Listen for timer updates from the brain
  onTimerUpdate: (callback) => ipcRenderer.on('timer-update', (_event, value) => callback(value)),
  // Tell the brain to pause/resume
  toggleTimer: () => ipcRenderer.send('toggle-timer'),
  // Tell the brain to trigger a break now (for testing)
  startBreak: () => ipcRenderer.send('start-break'),
  getStats: () => ipcRenderer.invoke('get-stats'),
  getSettings: () => ipcRenderer.invoke('get-settings'),
  saveSetting: (key: string, value: any) => ipcRenderer.send('save-setting', key, value),
})