import { useState, useEffect, useCallback } from 'react';
interface WeeklyStat {
  day: string;
  count: number;
  height: string;
}
export const useHistory = () => {
  const [data, setData] = useState({
    totalCompleted: 0,
    totalSkipped: 0,
    focusScore: 0,
    weeklyStats: [] as { day: string; count: number; height: string }[],
    recentLogs: [] as any[],
    isLoading: true
  });

  const fetchData = useCallback(async () => {
    if (!window.api) return;

    try {
      // 1. Fetch raw data from Electron Store
      const stats = await window.api.getStats() || {};
      const history = await window.api.getHistory() || [];
      
      let completed = 0;
      let skipped = 0;

      // 2. Sum totals safely
      Object.values(stats).forEach((day: any) => {
        if (day) {
          completed += (day.completed || 0);
          skipped += (day.skipped || 0);
        }
      });

      // 3. Logic: Focus Score
      const total = completed + skipped;
      const score = total > 0 ? Math.round((completed / total) * 100) : 100;

      // 4. Generate 7-Day Stats (Local Time Aware)
      const daysArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const weekly: WeeklyStat[] = []; 

      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        
        // FIX: Manual local date string to avoid UTC "yesterday" bug
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const localKey = `${year}-${month}-${day}`;

        const count = stats[localKey]?.completed || 0;
        
        weekly.push({
          day: daysArr[d.getDay()],
          count: count,
          height: `${Math.min((count / 15) * 100, 100)}%` 
        });
      }

      setData({
        totalCompleted: completed,
        totalSkipped: skipped,
        focusScore: score,
        weeklyStats: weekly,
        recentLogs: history,
        isLoading: false
      });
    } catch (error) {
      console.error("History Engine Error:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();

    // DYNAMIC SYNC: Refresh data whenever the user completes a break
    // We listen for the timer tick; if it hits the reset value (e.g., 20:00), we refresh.
    const removeTickListener = window.api.onTimerTick((seconds: number) => {
       // If the timer just reset to full, it means a break just finished/skipped
       // Change '1200' to your actual default seconds
       if (seconds === 1200) {
         fetchData();
       }
    });

    // Also refresh when the window comes back into focus
    window.addEventListener('focus', fetchData);

    return () => {
      removeTickListener();
      window.removeEventListener('focus', fetchData);
    };
  }, [fetchData]);

  return data;
};