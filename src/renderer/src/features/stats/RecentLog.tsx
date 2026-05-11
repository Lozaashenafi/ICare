import { CheckCircle2, XCircle, Clock } from 'lucide-react';

export const RecentLog = () => {
  const activities = [
    { time: '16:45', status: 'Success', dur: '20s', message: 'Perfect focus away' },
    { time: '16:25', status: 'Failed', dur: '0s', message: 'User closed popup' },
    { time: '16:05', status: 'Success', dur: '22s', message: 'Deep blink cycle' },
    { time: '15:45', status: 'Success', dur: '20s', message: 'Viewed 20ft distance' },
  ];

  return (
    <div className="bg-canvas border border-border rounded-[32px] overflow-hidden shadow-sm">
      <div className="p-6 border-b border-border bg-surface/30">
        <h3 className="text-sm font-bold text-primary uppercase tracking-widest">Session Archive</h3>
      </div>
      <div className="divide-y divide-border">
        {activities.map((act, i) => (
          <div key={i} className="p-5 flex items-center justify-between hover:bg-surface/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-full ${act.status === 'Success' ? 'bg-tertiary/10 text-tertiary' : 'bg-red-500/10 text-red-500'}`}>
                {act.status === 'Success' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
              </div>
              <div>
                <p className="text-sm font-bold text-primary">{act.status} Break</p>
                <div className="flex items-center gap-2 text-[10px] text-secondary font-medium">
                  <Clock size={10} /> {act.time} • {act.message}
                </div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-primary bg-surface px-3 py-1 rounded-lg border border-border">
              {act.dur}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};