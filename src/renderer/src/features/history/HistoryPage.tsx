import { useState } from 'react';
import { Coffee, XCircle, TrendingUp, Calendar, ChevronDown } from 'lucide-react';
import { HistoryChart } from './HistoryChart';
import { HistoryLog } from './HistoryLog';
import { useHistory } from '../../hooks/useHistory';

export const HistoryPage = () => {
  const [range, setRange] = useState(7);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { totalCompleted, totalSkipped, focusScore, weeklyStats, recentLogs, isLoading } = useHistory(range);

  const ranges = [
    { label: 'Last 7 Days', value: 7 },
    { label: 'Last 14 Days', value: 14 },
    { label: 'Last 30 Days', value: 30 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-primary tracking-tight font-syne italic">Eye-Care History</h2>
          <p className="text-secondary text-sm font-medium">Tracking your persistence through time.</p>
        </div>

        {/* DYNAMIC RANGE SELECTOR */}
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 px-5 py-2.5 bg-surface border border-border rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary hover:border-primary/30 transition-all shadow-sm"
          >
            <Calendar size={14} className="text-primary" />
            Last {range} Days
            <ChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-canvas border border-border rounded-2xl shadow-2xl z-50 overflow-hidden animate-in zoom-in-95 duration-200">
              {ranges.map((r) => (
                <button
                  key={r.value}
                  onClick={() => {
                    setRange(r.value);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                    range === r.value ? 'bg-primary text-white' : 'text-secondary hover:bg-surface'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="h-64 flex items-center justify-center text-secondary font-bold uppercase tracking-widest text-xs animate-pulse">
          Retrieving Archive...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <HistoryStatCard label="Total Breaks" value={totalCompleted} icon={<Coffee />} sub="Life-time sessions" />
            <HistoryStatCard label="Focus Score" value={`${focusScore}%`} icon={<TrendingUp />} sub="Success accuracy" color="text-tertiary" />
            <HistoryStatCard label="Skipped" value={totalSkipped} icon={<XCircle />} sub="Failure count" color="text-red-500" />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 bg-surface border border-border rounded-[40px] p-10 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5"><Calendar size={80} /></div>
               <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.25em] mb-10">Usage Visualization</h3>
               <HistoryChart data={weeklyStats} />
            </div>
            <div className="xl:col-span-1">
               <HistoryLog logs={recentLogs} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const HistoryStatCard = ({ label, value, icon, sub, color = "text-primary" }: any) => (
  <div className="bg-canvas border border-border p-6 rounded-[32px] flex items-center gap-6 shadow-sm hover:border-primary/20 transition-all group">
    <div className={`w-14 h-14 bg-surface rounded-2xl flex items-center justify-center border border-border group-hover:scale-110 transition-transform ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-[9px] uppercase tracking-[0.2em] text-secondary font-black mb-1">{label}</p>
      <p className="text-3xl font-black text-primary font-mono tabular-nums">{value}</p>
      <p className="text-[10px] text-secondary font-medium">{sub}</p>
    </div>
  </div>
);