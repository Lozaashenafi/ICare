import { CheckCircle2, AlertCircle } from 'lucide-react';

export const HistoryLog = ({ logs }: { logs: any[] }) => {
  const formatTime = (ts: number) => {
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-primary uppercase tracking-widest px-2">Recent Activity</h3>
      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {logs.length === 0 && <p className="text-xs text-secondary text-center py-10">No data yet.</p>}
        {logs.map((log, i) => (
          <div key={i} className="bg-surface/50 border border-border p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-primary">{formatTime(log.timestamp)}</span>
              <div className="flex flex-col">
                <span className={`text-xs font-bold ${log.status === 'completed' ? 'text-tertiary' : 'text-red-500'}`}>
                  {log.status === 'completed' ? 'Success' : 'Skipped'}
                </span>
                <span className="text-[10px] text-secondary">{log.duration}s session</span>
              </div>
            </div>
            {log.status === 'completed' ? <CheckCircle2 size={16} className="text-tertiary" /> : <AlertCircle size={16} className="text-red-500" />}
          </div>
        ))}
      </div>
    </div>
  );
};