import { useState, useEffect, useCallback } from 'react';

export const useAnalytics = () => {
  const [metrics, setMetrics] = useState({
    breaksToday: 0,
    successRate: 100,
    streak: 0,
    performanceScore: 100,
    isLoading: true
  });

  // Helper to get local date key "YYYY-MM-DD"
  const getLocalDateKey = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const calculateMetrics = useCallback(async () => {
    if (!window.api) return;

    try {
      const stats = await window.api.getStats() || {};
      const dateKey = getLocalDateKey();
      const today = stats[dateKey] || { completed: 0, skipped: 0, pauses: 0 };

      // 1. Success Rate = (Completed / (Completed + Skipped))
      const totalTriggers = today.completed + today.skipped;
      const successRate = totalTriggers > 0 
        ? Math.round((today.completed / totalTriggers) * 100) 
        : 100;

      // 2. Performance Score logic (Weighted penalties)
      let performance = 100 - (today.pauses * 5) - (today.skipped * 10);
      performance = Math.max(0, Math.min(100, performance));

      setMetrics({
        breaksToday: today.completed,
        successRate,
        streak: calculateStreak(stats),
        performanceScore: performance,
        isLoading: false
      });
    } catch (err) {
      console.error("Analytics Engine Error:", err);
    }
  }, []);

  const calculateStreak = (stats: any) => {
    let streak = 0;
    const today = new Date();
    
    // We check backwards from yesterday. 
    // Today only counts if they've already done a break, but doesn't break the streak if they haven't yet.
    for (let i = 0; i < 365; i++) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      
      if (stats[key]?.completed > 0) {
        streak++;
      } else {
        // If it's today and 0, we continue checking yesterday. 
        // If it's NOT today and 0, the streak is officially broken.
        if (i > 0) break; 
      }
    }
    return streak;
  };

  useEffect(() => {
    calculateMetrics();

    // SENIOR MOVE: Sync with the backend timer.
    // Every time the timer ticks, we check if it's "1200" (reset).
    // If it is, it means a break just finished/skipped, so we REFRESH metrics instantly.
    const removeTickListener = window.api.onTimerTick((seconds: number) => {
      if (seconds >= 1198) { // Checking for the reset window
        calculateMetrics();
      }
    });

    // Also refresh when user switches back to the app window
    window.addEventListener('focus', calculateMetrics);

    return () => {
      removeTickListener();
      window.removeEventListener('focus', calculateMetrics);
    };
  }, [calculateMetrics]);

  return metrics;
};