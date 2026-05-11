export const WatcherCard = () => (
  <div className="bg-card-bg border border-border-main rounded-[32px] p-8 text-center shadow-sm transition-colors duration-500">
    <div className="w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-sidebar">
      <img src="..." className="w-full h-full object-cover grayscale dark:grayscale-0" />
    </div>
    <h3 className="text-xl font-bold text-text-primary mb-2">The Watcher</h3>
    <p className="text-text-secondary text-xs italic">"Blink once. I dare you."</p>
  </div>
);

export const StatsCard = () => (
  <div className="space-y-4 mt-6">
    <StatItem label="Today's Breaks" value="12" />
    <StatItem label="Success Rate" value="94%" />
    <StatItem label="Streak" value="5 Days" active />
  </div>
);

const StatItem = ({ label, value, active }: any) => (
  <div className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${
    active ? 'bg-sidebar border-accent border-l-4' : 'bg-sidebar/50 border-border-main'
  }`}>
    <span className="text-sm text-text-secondary font-medium">{label}</span>
    <span className="font-bold text-text-primary">{value}</span>
  </div>
);