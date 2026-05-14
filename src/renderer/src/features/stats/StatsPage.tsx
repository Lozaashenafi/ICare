import React from 'react';
import { ActivityChart } from './ActivityChart';
import { RecentLog } from './RecentLog';
import { Achievements } from './Achievements';
import { useStats } from '../../hooks/useStats';
// CRITICAL: Ensure these are all imported
import { Trophy, Target, Zap, ShieldAlert } from 'lucide-react';

export const StatsPage: React.FC = () => {
  const { 
    productivityScore, 
    streak, 
    totalCompleted, 
    totalFailed, 
    chartData, 
    recentLogs, 
    mastery,
    isLoading 
  } = useStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-secondary animate-pulse font-bold tracking-widest uppercase text-xs">
          Syncing with The Watcher...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-3xl font-black text-primary tracking-tight font-syne italic">Analytics</h2>
        <p className="text-secondary text-sm font-medium mt-1">Deep telemetry of your eye health.</p>
      </div>

      {/* High-Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <QuickStat label="Score" value={`${productivityScore}%`} icon={<Target size={20} />} trend="Live" color="text-tertiary" />
        <QuickStat label="Streak" value={`${streak} Days`} icon={<Zap size={20} />} trend="Active" color="text-amber-500" />
        <QuickStat label="Total" value={totalCompleted.toString()} icon={<Trophy size={20} />} trend="Success" color="text-primary" />
        <QuickStat label="Failed" value={totalFailed.toString()} icon={<ShieldAlert size={20} />} trend="Skips" color="text-red-500" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <div className="bg-surface border border-border rounded-[32px] p-8 shadow-sm">
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-10">Break Distribution</h3>
            <ActivityChart data={chartData} />
          </div>
          <RecentLog activities={recentLogs} />
        </div>

        <div className="xl:col-span-1">
          <Achievements mastery={mastery} streak={streak} total={totalCompleted} />
        </div>
      </div>
    </div>
  );
};

const QuickStat = ({ label, value, icon, trend, color }: any) => (
  <div className="bg-canvas border border-border p-6 rounded-[28px] shadow-sm hover:border-primary/20 transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl bg-surface border border-border ${color} group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <span className="text-[9px] font-black text-primary bg-primary/5 px-2 py-1 rounded-lg uppercase tracking-tighter">
        {trend}
      </span>
    </div>
    <p className="text-[10px] uppercase tracking-widest text-secondary font-bold mb-1">{label}</p>
    <p className="text-3xl font-black text-primary font-mono tabular-nums">{value}</p>
  </div>
);