import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import { trackEvent } from '../../services/telemetry';
import img from '../../assets/icon.png'; // Example image import

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
    <div className="h-screen w-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-[#001f3f] font-sans">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-md w-full text-center space-y-8"
      >
        {/* Vibe: Simple & Bold */}
        <div className="flex justify-center">
          <img src={img} alt="EyeJoker Logo" className="w-16 h-16" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">
            Identify Yourself.
          </h1>
          <p className="text-slate-400 text-sm font-medium leading-relaxed px-4">
            "I need a name to address you by while I'm judging your screen time habits."
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <div className="relative group">
            <input 
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Enter your name..."
              className="w-full bg-white border-2 border-slate-100 px-8 py-5 rounded-[2rem] text-center text-lg font-bold outline-none focus:border-[#001f3f] focus:ring-4 focus:ring-[#001f3f]/5 transition-all shadow-sm"
            />
          </div>

          <button 
            onClick={handleSubmit}
            disabled={name.trim().length < 2 || isSubmitting}
            className="w-full bg-[#001f3f] text-white rounded-[2rem] py-5 font-black uppercase tracking-[0.2em] text-[10px] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-20 disabled:grayscale flex items-center justify-center gap-3 shadow-xl shadow-[#001f3f]/20"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              <>
                Let's Begin <ArrowRight size={14} />
              </>
            )}
          </button>
        </div>

        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest pt-8">
          Surveillance System Active
        </p>
      </motion.div>
    </div>
  );
};