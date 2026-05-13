import { useEffect, useState } from 'react';

const ROASTS = [
  "Look away! Your retinas are filing for a restraining order.",
  "20 seconds. Stare at a wall. It's more interesting than your code.",
  "Blink, you beautiful disaster. Blink!",
  "Your eyes are drier than a piece of leftover injera.",
  "The Watcher is disappointed. Look away now.",
  "Your screen isn't going anywhere. Your vision is."
];

export const RoastPopup = () => {
  const [count, setCount] = useState(20);
  const [roast] = useState(() => ROASTS[Math.floor(Math.random() * ROASTS.length)]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Tell the main process to close this window
          (window.api as { closeBreakWindow: () => void }).closeBreakWindow(); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen w-screen bg-primary flex flex-col items-center justify-center p-8 text-white border-8 border-white/10 rounded-[40px] overflow-hidden select-none">
      <div className="text-8xl mb-6 animate-bounce">😤</div>
      <h1 className="text-4xl font-black mb-4 uppercase tracking-tighter text-center">Look Away!</h1>
      <p className="text-xl text-center italic text-white/80 mb-8 max-w-sm">
        "{roast}"
      </p>
      
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle cx="64" cy="64" r="58" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="transparent" />
          <circle 
            cx="64" cy="64" r="58" stroke="white" strokeWidth="8" 
            fill="transparent" 
            strokeDasharray="364.4" 
            strokeDashoffset={364.4 * (1 - count / 20)}
            strokeLinecap="round" 
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <span className="text-4xl font-black">{count}</span>
      </div>
      
      <p className="mt-8 text-[10px] uppercase tracking-[0.3em] font-bold text-white/50">
        Stare at something 20ft away
      </p>
    </div>
  );
};