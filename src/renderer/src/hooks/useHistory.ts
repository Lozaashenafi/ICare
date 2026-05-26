import { useState, useEffect, useCallback } from 'react';

interface WeeklyStat {
  day: string;
  count: number;
  height: string;
}

// 1. Accept daysRange as a parameter (default to 7)
export const useHistory = (daysRange: number = 7) => {
  const [data, setData] = useState({
    totalCompleted: 0,
    totalSkipped: 0,
    focusScore: 0,
    weeklyStats: [] as WeeklyStat[],
    recentLogs: [] as any[],
    isLoading: true
  });

  const fetchData = useCallback(async () => {
    if (!window.api) return;
    
    // Set loading to true when switching ranges
    setData(prev => ({ ...prev, isLoading: true }));

    try {
      const stats = await window.api.getStats() || {};
      const history = await window.api.getHistory() || [];
      
      let completed = 0;
      let skipped = 0;

      // Calculate All-Time Totals (Object.values approach is fine for summary cards)
      Object.values(stats).forEach((day: any) => {
        if (day) {
          completed += (day.completed || 0);
          skipped += (day.skipped || 0);
        }
      });

      const total = completed + skipped;
      const score = total > 0 ? Math.round((completed / total) * 100) : 100;

      // Logic for the Graph: Process the specific range requested
      const daysArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const rangeStats: WeeklyStat[] = []; 

      // 2. Loop based on the dynamic daysRange
      for (let i = daysRange - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const dayNum = String(d.getDate()).padStart(2, '0');
        const localKey = `${year}-${month}-${dayNum}`;

        const count = stats[localKey]?.completed || 0;
        
        // 3. Dynamic Labels: Show Date (MM/DD) for long ranges, Day Name for 7-day range
        const label = daysRange > 7 
          ? `${d.getMonth() + 1}/${d.getDate()}` 
          : daysArr[d.getDay()];

        rangeStats.push({
          day: label,
          count: count,
          height: `${Math.min((count / 15) * 100, 100)}%` 
        });
      }

      setData({
        totalCompleted: completed,
        totalSkipped: skipped,
        focusScore: score,
        weeklyStats: rangeStats,
        recentLogs: history,
        isLoading: false
      });
    } catch (error) {
      console.error("History Engine Error:", error);
      setData(prev => ({ ...prev, isLoading: false }));
    }
  }, [daysRange]); // 4. Dependency on daysRange is critical

  useEffect(() => {
    fetchData();

    // DYNAMIC SYNC: Refresh when a break ends
    const removeTickListener = window.api.onTimerTick((seconds: number) => {
       if (seconds >= 1199) { // Using 1199 to catch the reset safely
         fetchData();
       }
    });

    window.addEventListener('focus', fetchData);

    return () => {
      removeTickListener();
      window.removeEventListener('focus', fetchData);
    };
  }, [fetchData]);

  return data;
};