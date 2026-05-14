import { useState, useEffect } from 'react';

export const useHistory = () => {
  const [data, setData] = useState({
    totalCompleted: 0,
    totalSkipped: 0,
    focusScore: 0,
    weeklyStats: [] as { day: string; count: number; height: string }[],
    recentLogs: [] as any[]
  });

  const fetchData = async () => {
    const stats = await window.api.getStats();
    const history = await window.api.getHistory();
    
    // 1. Calculate All-Time Totals
    let completed = 0;
    let skipped = 0;
    Object.values(stats).forEach((day: any) => {
      completed += day.completed;
      skipped += day.skipped;
    });

    // 2. Calculate Focus Score (Completed vs Skipped)
    const total = completed + skipped;
    const score = total > 0 ? Math.round((completed / total) * 100) : 100;

    // 3. Generate Last 7 Days for the Chart
    const daysArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekly: { day: string; count: number; height: string }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const count = stats[key]?.completed || 0;
      
      weekly.push({
        day: daysArr[d.getDay()],
        count: count,
        // Calculate height percentage relative to a target of 15 breaks/day
        height: `${Math.min((count / 15) * 100, 100)}%` 
      });
    }

    setData({
      totalCompleted: completed,
      totalSkipped: skipped,
      focusScore: score,
      weeklyStats: weekly,
      recentLogs: history // The last 50 entries
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return data;
};