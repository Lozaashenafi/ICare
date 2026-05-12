import Store from 'electron-store';

// Define the shape of our data for TypeScript
interface BreakLog {
  timestamp: number;
  status: 'completed' | 'skipped';
  duration: number; // seconds
}
interface Settings {
  interval: number;
  duration: number;
  theme: 'light' | 'dark';
  isSavage: boolean;
  mascot: string;
}

interface DailyStats {
  [date: string]: { // key format: "YYYY-MM-DD"
    completed: number;
    skipped: number;
    totalSeconds: number;
  }
}

interface AppSchema {
  settings: Settings;
  stats: DailyStats;
  history: BreakLog[];
}

const StoreClass = (typeof Store === 'function' ? Store : (Store as any).default) as typeof Store;

const store = new StoreClass<AppSchema>({
  defaults: {
    settings: {
      interval: 20,
      duration: 20,
      theme: 'light',
      isSavage: true,
      mascot: 'watcher'
    },
    stats: {},
    history: []
  }
});

export default store;