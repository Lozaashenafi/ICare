import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Fingerprint, Eye } from 'lucide-react';
import { trackEvent } from '../../services/telemetry';

export const Onboarding = ({ onComplete }: { onComplete: (name: string) => void }) => {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (name.trim().length < 2 || isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      const current = await window.api.getSettings();
      await window.api.saveAllSettings({ ...current, userName: name.trim() });
        trackEvent('user_onboarded', { name: name.trim() });

      onComplete(name.trim());
    } catch (err) {
      console.error("Onboarding failed:", err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#000B1A] flex items-center justify-center p-6 text-white font-sans overflow-hidden relative">
      
      {/* 1. AMBIENT BACKGROUND GLOWS */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#002147] blur-[120px] rounded-full opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#7C5CFC]/10 blur-[100px] rounded-full opacity-30" />

      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full z-10"
      >
        {/* 2. THE WATCHER ICON */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 bg-[#002147] border border-white/10 rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
               <Eye size={40} className="text-[#00E5C3] animate-pulse" />
            </div>
            {/* Pulsing Ring */}
            <div className="absolute inset-0 border-2 border-[#00E5C3]/20 rounded-3xl animate-ping scale-110" />
          </div>
        </div>

        {/* 3. CONTENT */}
        <div className="text-center space-y-4 mb-10">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter font-syne">
            Identify <span className="text-[#00E5C3]">Yourself</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-[#7C5CFC] font-bold text-[10px] uppercase tracking-[0.3em]">
            <ShieldAlert size={12} />
            Surveillance Initialization
          </div>
          <p className="text-slate-400 text-sm italic leading-relaxed px-6">
            "I need a name for the database before your vision becomes a 404 error. What should I call you?"
          </p>
        </div>

        {/* 4. THE INPUT FIELD */}
        <div className="relative group">
          <div className="absolute inset-0 bg-[#7C5CFC]/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <div className="relative">
            <input 
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="TYPE YOUR NAME..."
              className="w-full bg-[#00162B] border-2 border-white/5 p-5 rounded-[24px] text-center text-xl font-black placeholder:text-white/5 outline-none focus:border-[#7C5CFC]/50 transition-all text-[#00E5C3] uppercase tracking-widest"
            />
            <Fingerprint className="absolute right-6 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-[#7C5CFC] transition-colors" size={24} />
          </div>
        </div>

        {/* 5. ACTION BUTTON */}
        <button 
          onClick={handleSubmit}
          disabled={name.trim().length < 2 || isSubmitting}
          className="mt-6 w-full group relative overflow-hidden bg-white rounded-[24px] p-5 transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
        >
          <div className="absolute inset-0 bg-[#00E5C3] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative z-10 text-[#000B1A] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3">
            {isSubmitting ? "Linking Neural Path..." : "Enter the Abyss"}
          </span>
        </button>

        {/* FOOTER HINT */}
        <p className="mt-8 text-[9px] text-center font-bold text-white/20 uppercase tracking-[0.4em]">
          Terminal ID: {Math.random().toString(36).substring(7).toUpperCase()}
        </p>
      </motion.div>
    </div>
  );
};