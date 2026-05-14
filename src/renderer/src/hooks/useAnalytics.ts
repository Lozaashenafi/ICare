import { useState, useEffect } from 'react';

export const useAnalytics = () => {
  const [metrics, setMetrics] = useState({
    breaksToday: 0,
    successRate: 100,
    streak: 0,
    performanceScore: 100
  });

  const calculateMetrics = async () => {
    const stats = await window.api.getStats();
    const history = await window.api.getHistory();
    const dateKey = new Date().toISOString().split('T')[0];
    const today = stats[dateKey] || { completed: 0, skipped: 0, pauses: 0 };

    // 1. Success Rate = (Completed / (Completed + Skipped)) * 100
    const totalTriggers = today.completed + today.skipped;
    const successRate = totalTriggers > 0 
      ? Math.round((today.completed / totalTriggers) * 100) 
      : 100;

    // 2. Performance Score
    // Starts at 100, drops by 5% for every pause, and 10% for every skip
    let performance = 100 - (today.pauses * 5) - (today.skipped * 10);
    performance = Math.max(0, performance); // Don't go below 0

    setMetrics({
      breaksToday: today.completed,
      successRate: successRate,
      streak: calculateStreak(stats),
      performanceScore: performance
    });
  };

  // Simple streak calculator
  const calculateStreak = (stats: any) => {
    let streak = 0;
    const dates = Object.keys(stats).sort().reverse();
    for (const d of dates) {
      if (stats[d].completed > 0) streak++;
      else break;
    }
    return streak;
  };

  useEffect(() => {
    calculateMetrics();
    // Refresh stats every minute or when a break starts/ends
    const interval = setInterval(calculateMetrics, 60000);
    return () => clearInterval(interval);
  }, []);

  return metrics;
};