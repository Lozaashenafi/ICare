import React from 'react';
import { ActivityChart } from './ActivityChart';
import { RecentLog } from './RecentLog';
import { Achievements } from './Achievements';
import { Trophy, Target, Zap, ShieldAlert } from 'lucide-react';

export const StatsPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-primary tracking-tight">Performance Analytics</h2>
          <p className="text-secondary text-sm font-medium mt-1">Detailed breakdown of your eye-care habits.</p>
        </div>
      </div>

      {/* High-Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <QuickStat label="Productivity Score" value="94%" icon={<Target size={20} />} trend="+2.4%" color="text-tertiary" />
        <QuickStat label="Current Streak" value="5 Days" icon={<Zap size={20} />} trend="Personal Best" color="text-amber-500" />
        <QuickStat label="Breaks Completed" value="142" icon={<Trophy size={20} />} trend="+12 this week" color="text-primary" />
        <QuickStat label="Failed Breaks" value="18" icon={<ShieldAlert size={20} />} trend="-5% vs last month" color="text-red-500" />
      </div>

      {/* Charts and Achievement Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* Main Chart Card */}
          <div className="bg-surface border border-border rounded-[32px] p-8 shadow-sm">
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-10">Weekly Break Distribution</h3>
            <ActivityChart />
          </div>
          
          {/* Recent History Table */}
          <RecentLog />
        </div>

        {/* Right Sidebar: Achievements */}
        <div className="xl:col-span-1">
          <Achievements />
        </div>
      </div>
    </div>
  );
};

const QuickStat = ({ label, value, icon, trend, color }: any) => (
  <div className="bg-canvas border border-border p-6 rounded-[28px] shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl bg-surface border border-border ${color}`}>
        {icon}
      </div>
      <span className="text-[10px] font-bold text-tertiary bg-tertiary/10 px-2 py-1 rounded-lg">
        {trend}
      </span>
    </div>
    <p className="text-[10px] uppercase tracking-widest text-secondary font-bold mb-1">{label}</p>
    <p className="text-3xl font-black text-primary">{value}</p>
  </div>
);