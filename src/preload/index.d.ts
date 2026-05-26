import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getSettings: () => Promise<any>;
      saveSetting: (key: string, value: any) => void;
      getStats: () => Promise<any>;
      getHistory: () => Promise<any[]>;
      toggleTimer: () => void;
      takeBreakNow: () => void;
      closeBreakWindow: () => void;
      completeBreak: () => void;
      skipBreak: () => void;
      onTimerTick: (callback: (seconds: number) => void) => () => void;
  onPauseSync: (callback: (isPaused: boolean) => void) => () => void;

    }
  }
}

