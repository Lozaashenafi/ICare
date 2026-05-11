import { TimerOff } from 'lucide-react';

export const TimerHero = () => (
  <div className="bg-canvas border border-border rounded-[32px] p-6 lg:p-12 flex flex-col items-center shadow-sm relative overflow-hidden transition-all">
    <div className="text-center mb-10">
      <h2 className="text-xl lg:text-2xl font-bold text-primary uppercase tracking-widest">Next Break In</h2>
      <p className="text-secondary text-xs lg:text-sm mt-1">Focus Mode Active</p>
    </div>

    <div className="relative w-64 h-64 lg:w-80 lg:h-80 mb-12">
      <svg className="w-full h-full -rotate-90">
        <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-border" />
        <circle 
          cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="10" 
          fill="transparent" strokeDasharray="816.8" strokeDashoffset="200" 
          strokeLinecap="round" className="text-primary transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl lg:text-7xl font-black text-primary">18:45</span>
        <span className="text-[10px] text-secondary uppercase tracking-widest mt-2">Minutes Left</span>
      </div>
    </div>

    <div className="flex gap-4 w-full max-w-md">
      <button className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/10">
        Start Break Now
      </button>
      <button className="flex-1 border border-border text-primary py-4 rounded-2xl font-bold hover:bg-surface transition-all">
        Pause Timer
      </button>
    </div>
  </div>
);