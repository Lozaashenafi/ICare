// src/renderer/src/env.d.ts

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
  saveAllSettings: (settings: any) => void; // <--- ADD THIS LINE
  onTimerTick: (callback: (seconds: number) => void) => () => void;
}

interface Window {
  // Use 'any' here as a fallback if the toolkit type is being stubborn, 
  // but explicitly defining CustomAPI is the goal.
  api: CustomAPI; 
}