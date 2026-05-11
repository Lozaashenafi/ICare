import { Coffee, XCircle, TrendingUp, Calendar } from 'lucide-react';
import { HistoryChart } from './HistoryChart';
import { HistoryLog } from './HistoryLog';

export const HistoryPage = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-primary tracking-tight">Eye-Care History</h2>
          <p className="text-secondary text-sm">Tracking your journey away from the abyss.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-xl text-xs font-bold text-primary hover:bg-border transition-all">
            <Calendar size={14} /> Last 7 Days
          </button>
        </div>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <HistoryStatCard label="Total Breaks" value="142" icon={<Coffee className="text-primary" />} sub="All time" />
        <HistoryStatCard label="Focus Score" value="92%" icon={<TrendingUp className="text-tertiary" />} sub="+4% this week" />
        <HistoryStatCard label="Skipped" value="18" icon={<XCircle className="text-red-500" />} sub="Shameful behavior" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Weekly Chart */}
        <div className="xl:col-span-2 bg-surface border border-border rounded-[32px] p-8">
           <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-8">Weekly Activity</h3>
           <HistoryChart />
        </div>

        {/* Recent Log */}
        <div className="xl:col-span-1">
           <HistoryLog />
        </div>
      </div>
    </div>
  );
};

const HistoryStatCard = ({ label, value, icon, sub }: any) => (
  <div className="bg-canvas border border-border p-6 rounded-3xl flex items-center gap-5">
    <div className="w-12 h-12 bg-surface rounded-2xl flex items-center justify-center text-primary border border-border">
      {icon}
    </div>
    <div>
      <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">{label}</p>
      <p className="text-2xl font-black text-primary">{value}</p>
      <p className="text-[10px] text-secondary">{sub}</p>
    </div>
  </div>
);