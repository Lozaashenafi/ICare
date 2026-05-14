import { useState, useEffect, useCallback } from 'react';

// Define strict interfaces to replace 'any'
interface ChartDataItem {
  day: string;
  val: number;
  actualCount: number;
}

interface Metrics {
  productivityScore: number;
  streak: number;
  totalCompleted: number;
  totalFailed: number;
  chartData: ChartDataItem[];
  recentLogs: any[];
  mastery: number;
  isLoading: boolean; // Professional addition: track loading state
}

export const useStats = () => {
  const [metrics, setMetrics] = useState<Metrics>({
    productivityScore: 0,
    streak: 0,
    totalCompleted: 0,
    totalFailed: 0,
    chartData: [],
    recentLogs: [],
    mastery: 0,
    isLoading: true,
  });

  const calculateStreak = useCallback((stats: Record<string, any>) => {
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const key = d.toISOString().split('T')[0];
      
      const dayData = stats[key];
      if (dayData && dayData.completed > 0) {
        streak++;
      } else if (i === 0) {
        // It's today, and we haven't completed a break yet. Don't break the streak.
        continue;
      } else {
        // Found a hole in the past, stop counting.
        break;
      }
    }
    return streak;
  }, []);

  const calculate = useCallback(async () => {
    // SAFETY GUARD: Check if Electron bridge is ready
    if (!window.api) {
      console.warn('Backend API not initialized yet.');
      return;
    }

    try {
      // Parallel fetching for performance
      const [stats, history] = await Promise.all([
        window.api.getStats() || {},
        window.api.getHistory() || []
      ]);

      const dateKey = new Date().toISOString().split('T')[0];
      
      // 1. Calculate Totals with Safety Reducer
      let completed = 0;
      let failed = 0;
      
      Object.values(stats).forEach((day: any) => {
        if (day) {
          completed += day.completed || 0;
          failed += day.skipped || 0;
        }
      });

      // 2. Productivity Score Logic
      const today = stats[dateKey] || { completed: 0, skipped: 0, pauses: 0 };
      const totalTriggers = today.completed + today.skipped;
      
      const baseScore = totalTriggers > 0 
        ? (today.completed / totalTriggers) * 100 
        : 100;
      
      const penalty = (today.pauses || 0) * 2; 
      const finalScore = Math.max(0, Math.min(100, Math.round(baseScore - penalty)));

      // 3. Weekly Chart Data (Immutable Construction)
      const daysArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const weekly: ChartDataItem[] = [];
      
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const key = d.toISOString().split('T')[0];
        const count = stats[key]?.completed || 0;
        
        weekly.push({ 
          day: daysArr[d.getDay()], 
          val: Math.min((count / 15) * 100, 100), 
          actualCount: count 
        });
      }

      setMetrics({
        productivityScore: finalScore,
        streak: calculateStreak(stats),
        totalCompleted: completed,
        totalFailed: failed,
        chartData: weekly,
        recentLogs: history.slice(0, 4),
        mastery: Math.min(Math.round((completed / 500) * 100), 100),
        isLoading: false,
      });
    } catch (error) {
      console.error('Critical Error in useStats Engine:', error);
      setMetrics(prev => ({ ...prev, isLoading: false }));
    }
  }, [calculateStreak]);

  useEffect(() => {
    calculate();
    
    // Optional: Refresh data if the window regains focus
     window.addEventListener('focus', calculate);
  return () => window.removeEventListener('focus', calculate);
  }, [calculate]);

  return metrics;
};