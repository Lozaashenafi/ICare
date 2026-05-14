import { CheckCircle2, XCircle } from "lucide-react";

export const RecentLog = ({ activities }: { activities: any[] }) => (
  <div className="bg-canvas border border-border rounded-[32px] overflow-hidden shadow-sm">
    <div className="p-6 border-b border-border bg-surface/30">
      <h3 className="text-sm font-bold text-primary uppercase tracking-widest">Session Archive</h3>
    </div>
    <div className="divide-y divide-border">
      {activities.map((act, i) => (
        <div key={i} className="p-5 flex items-center justify-between hover:bg-surface/50 transition-colors">
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-full ${act.status === 'completed' ? 'bg-tertiary/10 text-tertiary' : 'bg-red-500/10 text-red-500'}`}>
              {act.status === 'completed' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
            </div>
            <div>
              <p className="text-sm font-bold text-primary capitalize">{act.status}</p>
              <p className="text-[10px] text-secondary font-medium">
                {new Date(act.timestamp).toLocaleTimeString()} • {act.duration}s Session
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-primary bg-surface px-3 py-1 rounded-lg border border-border">
            #{activities.length - i}
          </span>
        </div>
      ))}
    </div>
  </div>
);