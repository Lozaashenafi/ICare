import { useEffect, useState } from 'react';
import { X, Eye } from 'lucide-react';

const ROASTS = [
  "Your eyes are drier than a piece of leftover injera.",
  "Stop staring. The code won't fix itself.",
  "Stare at a wall. It has more personality.",
  "Blink, you beautiful disaster.",
];

export const RoastPopup = () => {
  const [count, setCount] = useState(20);
  const [roast] = useState(() => ROASTS[Math.floor(Math.random() * ROASTS.length)]);

  const radius = 65;
  const circumference = 2 * Math.PI * radius;

  const handleClose = (wasSuccessful: boolean) => {
  if (wasSuccessful) {
    window.api.completeBreak(); // Fixed typo from 'completeBrea'
  } else {
    window.api.skipBreak();
  }
};

useEffect(() => {
  const timer = setInterval(() => {
    setCount((prev) => {
      if (prev <= 1) {
        clearInterval(timer);
        handleClose(true); // Auto-complete when timer hits 0
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
  return () => clearInterval(timer);
}, []);
  return (
    /* We use h-full w-full and overflow-hidden to prevent any scrolling */
    <div className="h-full w-full flex items-center justify-center bg-transparent overflow-hidden select-none font-sans">
      
      {/* The UI Card */}
      <div className="relative w-[400px] bg-[#002147] border border-white/10 rounded-[40px] p-8 flex flex-col items-center shadow-2xl">
        
        {/* Glow behind card */}
        <div className="absolute inset-0 bg-primary/5 blur-3xl -z-10" />

        {/* Close Button */}
        <button 
  onClick={() => handleClose(false)} // User explicitly skipped
  className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-all text-white/20 hover:text-white"
>
  <X size={18} />
</button>

        {/* Mascot */}
        <div className="text-6xl mb-6 filter drop-shadow-lg animate-bounce">😤</div>

        {/* Text */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-black italic tracking-tighter text-white uppercase">
            STARE AWAY
          </h1>
          <p className="text-slate-400 text-xs italic leading-relaxed px-4">
            "{roast}"
          </p>
        </div>

        {/* Timer Circle */}
        <div className="relative w-36 h-36 flex items-center justify-center mb-8">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 150 150">
            <circle 
              cx="75" cy="75" r={radius} 
              stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="transparent" 
            />
            <circle 
              cx="75" cy="75" r={radius} 
              stroke="white" strokeWidth="6" fill="transparent" 
              strokeDasharray={circumference} 
              style={{ 
                strokeDashoffset: circumference * (1 - count / 20),
                transition: 'stroke-dashoffset 1s linear' 
              }}
              strokeLinecap="round" 
            />
          </svg>
          <div className="flex flex-col items-center">
            <span className="text-5xl font-black text-white tabular-nums">{count}</span>
            <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Seconds</span>
          </div>
        </div>

        {/* Instruction Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-xl">
          <Eye size={10} className="text-tertiary" />
          <span className="text-[8px] font-bold text-white/50 uppercase tracking-widest">
            Focus 20ft distance
          </span>
        </div>
      </div>
    </div>
  );
};