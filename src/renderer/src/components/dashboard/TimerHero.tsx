import { TimerOff, Coffee } from 'lucide-react';

interface TimerHeroProps {
  seconds: number;
  totalSeconds: number; // Used to calculate the circle progress
  isPaused: boolean;
}

interface ElectronAPI {
  toggleTimer: () => void;
  takeBreakNow: () => void;
}

declare const window: {
  api: ElectronAPI;
} & Window;

export const TimerHero = ({ seconds, totalSeconds, isPaused }: TimerHeroProps) => {
  // 1. Format seconds to MM:SS
  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // 2. SVG Circle Progress Math
  // Radius is 45% of 280px (approx 126). Circumference = 2 * π * r ≈ 791
  const radius = 126; 
  const circumference = 2 * Math.PI * radius;
  const percentage = seconds / totalSeconds;
  const strokeDashoffset = circumference * (1 - percentage);

  // 3. Button Actions (Calling our Electron Bridge)
  const handleToggle = () => window.api.toggleTimer();
  const handleForceBreak = () => window.api.takeBreakNow();

  return (
    <div className="bg-canvas border border-border rounded-[32px] p-6 lg:p-12 flex flex-col items-center shadow-sm relative overflow-hidden transition-all">
      <div className="text-center mb-10">
        <h2 className="text-xl lg:text-2xl font-bold text-primary uppercase tracking-widest">
          {isPaused ? 'Timer Paused' : 'Next Break In'}
        </h2>
        <p className="text-secondary text-xs lg:text-sm mt-1">
          {isPaused ? 'You are cheating your eyes...' : 'Focus Mode Active'}
        </p>
      </div>

      <div className="relative w-64 h-64 lg:w-80 lg:h-80 mb-12">
        <svg className="w-full h-full -rotate-90">
          <circle 
            cx="50%" cy="50%" r="45%" 
            stroke="currentColor" strokeWidth="10" 
            fill="transparent" className="text-border" 
          />
          <circle 
            cx="50%" cy="50%" r="45%" 
            stroke="currentColor" strokeWidth="10" 
            fill="transparent" 
            style={{ 
              strokeDasharray: circumference, 
              strokeDashoffset: isNaN(strokeDashoffset) ? 0 : strokeDashoffset 
            }}
            strokeLinecap="round" 
            className="text-primary transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl lg:text-7xl font-black text-primary">
            {formatTime(seconds)}
          </span>
          <span className="text-[10px] text-secondary uppercase tracking-widest mt-2 font-bold">
            Remaining
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <button 
          onClick={handleForceBreak}
          className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
        >
          <Coffee size={18} /> Take Break Now
        </button>
        <button 
          onClick={handleToggle}
          className={`flex-1 border py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
            isPaused 
            ? 'bg-tertiary/10 border-tertiary text-tertiary animate-pulse' 
            : 'border-border text-primary hover:bg-surface'
          }`}
        >
          <TimerOff size={18} /> {isPaused ? 'Resume Timer' : 'Pause Timer'}
        </button>
      </div>
    </div>
  );
};