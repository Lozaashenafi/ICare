/// <reference types="vite/client" />

export interface ElectronAPI {
  getSettings: () => Promise<{ interval: number }>;
  saveSetting: (key: string, value: any) => void;
  getStats: () => Promise<any>;
  getHistory: () => Promise<any>;
  toggleTimer: () => void;
  takeBreakNow: () => void;
  closeBreakWindow: () => void;
  onTimerTick: (callback: (seconds: number) => void) => () => void;
}

declare global {
  interface Window {
    api: ElectronAPI;
  }
}

export {};

