import { useAnalytics } from '../../hooks/useAnalytics';

export const WatcherCard = () => {
  const { performanceScore } = useAnalytics();
  
  // Dynamic message based on performance
  const getWatcherMessage = () => {
    if (performanceScore > 90) return "Impressive. You are actually obeying.";
    if (performanceScore > 70) return "I saw that pause. Don't let it happen again.";
    return "Your eyes are failing and it's your fault. Pathletic.";
  };

  return (
    <div className="bg-surface border border-border rounded-[32px] p-8 text-center transition-all">
      <div className="relative w-24 lg:w-32 mx-auto mb-6">
        <div className="w-full h-full rounded-full overflow-hidden border-4 border-canvas shadow-inner">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08759dfc12e?w=200" 
            className={`w-full h-full object-cover transition-all duration-700 ${performanceScore < 50 ? 'sepia hue-rotate-180' : ''}`} 
          />
        </div>
        {/* Performance Badge */}
        <div className="absolute -bottom-2 right-0 bg-primary text-white text-[10px] px-2 py-1 rounded-lg font-bold">
          {performanceScore}%
        </div>
      </div>
      <h3 className="text-lg font-bold text-primary mb-1">The Watcher</h3>
      <p className="text-secondary text-xs italic">"{getWatcherMessage()}"</p>
    </div>
  );
};

export const StatsCard = () => {
  const { breaksToday, successRate, streak } = useAnalytics();

  return (
    <div className="space-y-3 mt-6">
      <StatItem label="Today's Breaks" value={breaksToday.toString()} />
      <StatItem label="Success Rate" value={`${successRate}%`} danger={successRate < 80} />
      <StatItem label="Streak" value={`${streak} Days`} active />
    </div>
  );
};

const StatItem = ({ label, value, active, danger }: any) => (
  <div className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${
    active ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
    : danger ? 'bg-red-500/10 border-red-500/20 text-red-500'
    : 'bg-surface border-border text-primary'
  }`}>
    <span className={`text-sm ${active ? 'text-white/80' : 'text-secondary'}`}>{label}</span>
    <span className="font-bold font-mono">{value}</span>
  </div>
);