import Store from 'electron-store';

interface BreakLog {
  timestamp: number;
  status: 'completed' | 'skipped';
  duration: number;
}

interface DailyStats {
  completed: number;
  skipped: number;
  pauses: number;
  totalSeconds: number;
}

interface AppSchema {
  settings: {
    interval: number;
    duration: number;
    theme: 'light' | 'dark';
    isSavage: boolean;
    mascot: string;
  };
  stats: Record<string, DailyStats>; // Key is YYYY-MM-DD
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

/**
 * SENIOR LOGIC: Records a break event to the permanent JSON store
 */
export const recordBreak = (status: 'completed' | 'skipped') => {
  const now = new Date();
  const dateKey = now.toISOString().split('T')[0]; // Format: 2024-05-14
  
  // 1. Get existing stats or create fresh ones for today
  const allStats = store.get('stats') || {};
  const todayStats: DailyStats = allStats[dateKey] || { 
    completed: 0, 
    skipped: 0, 
    pauses: 0, 
    totalSeconds: 0 
  };

  // 2. Update the numbers
  if (status === 'completed') {
    todayStats.completed += 1;
    todayStats.totalSeconds += (store.get('settings.duration') || 20);
  } else {
    todayStats.skipped += 1;
  }

  // 3. Save the updated stats back to the dictionary
  allStats[dateKey] = todayStats;
  store.set('stats', allStats);

  // 4. Update Detailed History (Keep last 50 entries)
  const history = store.get('history') || [];
  history.unshift({
    timestamp: Date.now(),
    status,
    duration: store.get('settings.duration')
  });

  store.set('history', history.slice(0, 50));
  
  console.log(`[Store] recorded ${status} break for ${dateKey}`);
};

/**
 * Record a pause (Performance Penalty)
 */
export const recordPause = () => {
  const dateKey = new Date().toISOString().split('T')[0];
  const allStats = store.get('stats') || {};
  const todayStats = allStats[dateKey] || { completed: 0, skipped: 0, pauses: 0, totalSeconds: 0 };
  
  todayStats.pauses += 1;
  allStats[dateKey] = todayStats;
  store.set('stats', allStats);
};

export default store;