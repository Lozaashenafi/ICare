import { useEffect, useState, useCallback } from 'react';
import { X, Eye } from 'lucide-react';
import { PERSONALITY_DATA } from '../../constants/personalities';

export const RoastPopup = () => {
  const [count, setCount] = useState(20);
  const [mascotName, setMascotName] = useState("The Watcher");
  const [roastMessage, setRoastMessage] = useState("");
  const [userName, setUserName] = useState("Victim");
  const [isLoaded, setIsLoaded] = useState(false);

  const radius = 65;
  const circumference = 2 * Math.PI * radius;

  const handleClose = useCallback((wasSuccessful: boolean) => {
    if (wasSuccessful) {
      window.api.completeBreak();
    } else {
      window.api.skipBreak();
    }
  }, []);

  const handleForceExit = () => {
    window.api.completeBreak(); 
  };

  useEffect(() => {
    const initializePopup = async () => {
      try {
        const settings = await window.api.getSettings();
        const selectedMascotKey = settings.mascot || 'watcher';
        const mode = settings.isSavage ? 'savage' : 'gentle';
        const name = settings.userName || "Victim";

        const mascotData = (PERSONALITY_DATA as any)[selectedMascotKey];
        const possibleMessages = mascotData[mode];
        const randomMsg = possibleMessages[Math.floor(Math.random() * possibleMessages.length)];

        setUserName(name);
        setMascotName(mascotData.name);
        setRoastMessage(randomMsg);
        setIsLoaded(true);
      } catch (err) {
        console.error("Popup failed to load settings:", err);
        setRoastMessage("Look away. Now.");
        setIsLoaded(true);
      }
    };

    initializePopup();

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleClose(true); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [handleClose]);

  if (!isLoaded) return null;

  return (
    /* FULL SCREEN CONTAINER */
    <div className="h-screen w-screen flex items-center justify-center bg-transparent overflow-hidden select-none font-sans relative">
      
      {/* THE UI CARD (Centered) */}
      <div className="relative w-[400px] bg-[#002147] border border-white/10 rounded-[40px] p-8 flex flex-col items-center shadow-2xl overflow-hidden z-10">
        
        <div className="absolute inset-0 bg-primary/5 blur-3xl -z-10" />

        {/* CLOSE/SKIP BUTTON */}
        <button 
          onClick={() => handleClose(false)} 
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-all text-white/20 hover:text-white z-20"
        >
          <X size={18} />
        </button>

        {/* 1. RESTORED YOUR PREFERRED EMOJI */}
        <div className="text-6xl mb-6 animate-bounce">😤</div>

        <div className="text-center space-y-2 mb-8">
          <h1 className="text-2xl font-black italic tracking-tighter text-white uppercase">
            {mascotName}
          </h1>
          <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] opacity-80">
            Target: {userName}
          </p>
          <p className="text-slate-400 text-xs italic leading-relaxed px-4 min-h-[45px] flex items-center justify-center">
            "{roastMessage}"
          </p>
        </div>

        {/* TIMER CIRCLE */}
        <div className="relative w-36 h-36 flex items-center justify-center mb-8">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 150 150">
            <circle cx="75" cy="75" r={radius} stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="transparent" />
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
            <span className="text-5xl font-black text-white tabular-nums tracking-tighter">{count}</span>
            <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Seconds</span>
          </div>
        </div>

        {/* INSTRUCTION BADGE */}
        <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-xl">
          <Eye size={10} className="text-tertiary" />
          <span className="text-[8px] font-bold text-white/50 uppercase tracking-widest">
            Focus 20ft distance
          </span>
        </div>
      </div>

      {/* 2. EMERGENCY UNLOCK AT THE BOTTOM OF SCREEN */}
      <button 
        onClick={handleForceExit}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 px-8 py-3 bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white border border-red-600/30 rounded-2xl font-black z-[100] shadow-xl transition-all text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm active:scale-95"
      >
        Emergency Unlock
      </button>
      
    </div>
  );
};