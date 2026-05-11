import { CheckCircle2, AlertCircle } from 'lucide-react';

export const HistoryLog = () => {
  const logs = [
    { time: '14:20', status: 'Taken', msg: 'Good eye distance', color: 'text-tertiary' },
    { time: '13:40', status: 'Taken', msg: '20 seconds exactly', color: 'text-tertiary' },
    { time: '13:00', status: 'Skipped', msg: 'The Watcher is angry', color: 'text-red-500' },
    { time: '12:20', status: 'Taken', msg: 'Hydrated & Rested', color: 'text-tertiary' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-primary uppercase tracking-widest px-2">Today's Log</h3>
      <div className="space-y-2">
        {logs.map((log, i) => (
          <div key={i} className="bg-surface/50 border border-border p-4 rounded-2xl flex items-center justify-between hover:bg-surface transition-colors cursor-default">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-primary">{log.time}</span>
              <div className="flex flex-col">
                <span className={`text-xs font-bold ${log.color}`}>{log.status}</span>
                <span className="text-[10px] text-secondary">{log.msg}</span>
              </div>
            </div>
            {log.status === 'Taken' ? (
              <CheckCircle2 size={16} className="text-tertiary" />
            ) : (
              <AlertCircle size={16} className="text-red-500" />
            )}
          </div>
        ))}
      </div>
      <button className="w-full py-3 text-[10px] font-bold text-secondary uppercase tracking-[0.2em] hover:text-primary transition-colors">
        View Full Archive
      </button>
    </div>
  );
};