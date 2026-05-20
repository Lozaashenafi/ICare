/// <reference types="vite/client" />
import { ElectronAPI } from '@electron-toolkit/preload'

interface CustomAPI {
  getSettings: () => Promise<any>;
  saveSetting: (key: string, value: any) => void;
  getStats: () => Promise<any>;
  getHistory: () => Promise<any[]>;
  toggleTimer: () => void;
  takeBreakNow: () => void;
  closeBreakWindow: () => void;
  completeBreak: () => void;
  skipBreak: () => void;
  saveAllSettings: (settings: any) => void;
  onTimerTick: (callback: (seconds: number) => void) => () => void;
}

declare global {
  interface Window {
    // FIX: This solves the Versions.tsx "Property electron does not exist" error
    electron: ElectronAPI; 
    api: CustomAPI; 
  }
}

// FIX: This solves the "Cannot find module ../../assets/watcher.mp4" error
declare module '*.mp4' {
  const src: string;
  export default src;
}

interface ImportMetaEnv {
  readonly VITE_POSTHOG_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}