import { useEffect, useState, useCallback } from 'react';
import { X, Eye } from 'lucide-react';
import { PERSONALITY_DATA } from '../../constants/personalities';
import { MESSAGES } from '../../content/messages';
import watcherVid from '../../assets/watcher.mp4'; // Import your video

export const RoastPopup = () => {
  const [count, setCount] = useState(20);
  const [mascotName, setMascotName] = useState("");
  const [roastMessage, setRoastMessage] = useState("");
  const [userName, setUserName] = useState("Victim");
  const [isSmartEye, setIsSmartEye] = useState(false);
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

  useEffect(() => {
    const initializePopup = async () => {
      try {
        if (!window.api) {
          console.error("Popup: bridge not available");
          setRoastMessage("Look away. Now.");
          setIsLoaded(true);
          return;
        }
        const settings = await window.api.getSettings();
        const mascotKey = settings.mascot || 'watcher';
        const style = settings.messageStyle || 'savage';
        const name = settings.userName || 'Victim';
        const smartEye = settings.smartEyeEnabled || false;

        const mascotMeta = PERSONALITY_DATA[mascotKey];
        const mascotMessages = MESSAGES[mascotKey];
        const styleMessages = mascotMessages?.[style];
        const fallbackMessages = mascotMessages?.savage;
        const pool = styleMessages || fallbackMessages || ['Look away. Now.'];
        const randomMsg = pool[Math.floor(Math.random() * pool.length)];

        setUserName(name);
        setMascotName(mascotMeta?.name || 'The Watcher');
        setRoastMessage(randomMsg);
        setIsSmartEye(smartEye);
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
    <div className={`h-screen w-screen flex items-center justify-center overflow-hidden select-none font-sans relative ${isSmartEye ? 'bg-black/[0.03]' : 'bg-transparent'}`}>
      
      {isSmartEye && (
        <div className="absolute inset-0 bg-black/10 z-0 animate-in fade-in duration-700" />
      )}

      <div className="relative w-[400px] bg-[#002147] border border-white/10 rounded-[40px] p-8 flex flex-col items-center shadow-2xl overflow-hidden z-10">
        
        <div className="absolute inset-0 bg-primary/5 blur-3xl -z-10" />

        <button 
          onClick={() => handleClose(false)} 
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-all text-white/20 hover:text-white z-20"
        >
          <X size={18} />
        </button>
    {/* 1. DYNAMIC RECTANGULAR VIDEO DISPLAY */}
    <div className="relative w-full max-w-[320px] h-24 mt-4 mb-4 group">
      {/* The Screen Frame */}
      <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl bg-black/40 relative">
        <video
          src={watcherVid}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-all duration-1000 grayscale hover:grayscale-0"
        />
        
        {/* Digital Overlay: Scanlines & Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] opacity-30" />
        
        {/* Subtle Inner Glow */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]" />

        {/* Recording Indicator */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-0.5 bg-black/40 backdrop-blur-sm rounded-md border border-white/5">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[8px] font-black text-white/70 tracking-widest uppercase">REC</span>
        </div>
      </div>

      {/* Outer Glow (Rectangular) */}
      <div className="absolute -inset-2 rounded-[24px] bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
    </div>
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