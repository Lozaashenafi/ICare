import { contextBridge, ipcRenderer } from 'electron'

// 1. LOG TO CONSOLE SO WE KNOW IT LOADED
console.log('%c [Preload] Bridge Initialized', 'color: #00E5C3; font-weight: bold;');

const api = {
  getSettings: () => ipcRenderer.invoke('settings:get'),
  saveAllSettings: (settings: any) => ipcRenderer.send('settings:save-all', settings),
  saveSetting: (key: string, value: any) => ipcRenderer.send('settings:save', key, value),
  getStats: () => ipcRenderer.invoke('stats:get'),
  getHistory: () => ipcRenderer.invoke('stats:get-history'),
  toggleTimer: () => ipcRenderer.send('timer:toggle'),
  takeBreakNow: () => ipcRenderer.send('timer:trigger-break'),
  closeBreakWindow: () => ipcRenderer.send('break:close'),
  completeBreak: () => ipcRenderer.send('break:complete'),
  skipBreak: () => ipcRenderer.send('break:skip'),
  onTimerTick: (callback: (seconds: number) => void) => {
    const listener = (_event: any, value: number) => callback(value)
    ipcRenderer.on('timer:tick', listener)
    return () => ipcRenderer.removeListener('timer:tick', listener)
  }
}

// 2. EXPOSE TO WINDOW
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (fallback for non-isolated)
  window.api = api
}