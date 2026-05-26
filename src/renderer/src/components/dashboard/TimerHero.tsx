import { TimerOff, Coffee, Play } from 'lucide-react';

interface TimerHeroProps {
  seconds: number;
  totalSeconds: number;
  isPaused: boolean;
}

// DELETE THE ElectronAPI interface and declare const window part here!
// We already defined these globally in env.d.ts

export const TimerHero = ({ seconds, totalSeconds, isPaused }: TimerHeroProps) => {
  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const radius = 126; 
  const circumference = 2 * Math.PI * radius;
  const percentage = seconds / totalSeconds;
  const strokeDashoffset = circumference * (1 - percentage);

  // Use the global window.api directly
  const handleToggle = () => window.api.toggleTimer();
  const handleForceBreak = () => window.api.takeBreakNow();

  return (
    <div className="bg-canvas border border-border rounded-[32px] p-6 lg:p-12 flex flex-col items-center shadow-sm relative overflow-hidden transition-all">
      <div className="text-center mb-10">
        <h2 className="text-xl lg:text-2xl font-black text-primary uppercase tracking-widest">
          {isPaused ? 'System Idle' : 'Next Break In'}
        </h2>
        <p className="text-secondary text-xs lg:text-sm mt-1 font-medium italic">
          {isPaused ? 'The Watcher is waiting...' : 'Focus Mode Active'}
        </p>
      </div>

      <div className="relative w-64 h-64 lg:w-80 lg:h-80 mb-12">
        <svg className="w-full h-full -rotate-90">
          <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-border" />
          <circle 
            cx="50%" cy="50%" r="45%" 
            stroke="currentColor" strokeWidth="10" 
            fill="transparent" 
            style={{ 
              strokeDasharray: circumference, 
              strokeDashoffset: isNaN(strokeDashoffset) ? 0 : strokeDashoffset,
              opacity: isPaused ? 0.3 : 1 
            }}
            strokeLinecap="round" 
            className="text-primary transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-5xl lg:text-7xl font-black tabular-nums transition-colors ${isPaused ? 'text-secondary' : 'text-primary'}`}>
            {formatTime(seconds)}
          </span>
          <span className="text-[10px] text-secondary uppercase tracking-widest mt-2 font-black opacity-50">
            {isPaused ? 'Paused' : 'Remaining'}
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        {/* TAKE BREAK NOW BUTTON */}
        <button 
          onClick={handleForceBreak}
          className="flex-1 bg-primary text-white py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
        >
          <Coffee size={16} /> Take Break Now
        </button>
        
        {/* PAUSE/CONTINUE BUTTON */}
        <button 
          onClick={handleToggle}
          className={`flex-1 border py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest transition-all flex items-center justify-center gap-2 ${
            isPaused 
            ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-[1.02]' 
            : 'border-border text-primary hover:bg-surface'
          }`}
        >
          {isPaused ? <Play size={16} fill="currentColor" /> : <TimerOff size={16} />}
          {isPaused ? 'Continue Timer' : 'Pause Timer'}
        </button>
      </div>
    </div>
  );
};