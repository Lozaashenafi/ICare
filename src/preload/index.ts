import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  // --- SETTINGS ---
  getSettings: () => ipcRenderer.invoke('settings:get'),
  saveSetting: (key: string, value: any) => ipcRenderer.send('settings:save', key, value),

  // --- STATS ---
  getStats: () => ipcRenderer.invoke('stats:get'),
  getHistory: () => ipcRenderer.invoke('stats:get-history'),

  // --- TIMER CONTROL ---
  toggleTimer: () => ipcRenderer.send('timer:toggle'),
  takeBreakNow: () => ipcRenderer.send('timer:trigger-break'),
  closeBreakWindow: () => ipcRenderer.send('break:close'),

  // --- LISTENERS (Main -> React) ---
  onTimerTick: (callback: (seconds: number) => void) => {
    const subscription = (_event, value) => callback(value)
    ipcRenderer.on('timer:tick', subscription)
    return () => ipcRenderer.removeListener('timer:tick', subscription)
  }
})