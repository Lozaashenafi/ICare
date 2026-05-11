export const WatcherCard = () => (
  <div className="bg-surface border border-border rounded-[32px] p-8 text-center transition-all">
    <div className="w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-canvas shadow-inner">
      <img src="https://images.unsplash.com/photo-1541339907198-e08759dfc12e?w=200" alt="Watcher" className="w-full h-full object-cover" />
    </div>
    <h3 className="text-lg font-bold text-primary mb-1">The Watcher</h3>
    <p className="text-secondary text-xs italic">"I see you. Blink, human."</p>
  </div>
);

export const StatsCard = () => (
  <div className="space-y-3 mt-6">
    <StatItem label="Today's Breaks" value="12" />
    <StatItem label="Success Rate" value="94%" />
    <StatItem label="Streak" value="5 Days" active />
  </div>
);

const StatItem = ({ label, value, active }: any) => (
  <div className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${
    active ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-surface border-border text-primary'
  }`}>
    <span className={`text-sm ${active ? 'text-white/80' : 'text-secondary'}`}>{label}</span>
    <span className="font-bold">{value}</span>
  </div>
);