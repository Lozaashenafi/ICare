import React from 'react';
import { ShieldAlert, Monitor,  Lock } from 'lucide-react';
import { useSettings } from '../../hooks/useSettings';

export const SmartEyePage: React.FC = () => {
  const { settings, updateSetting, saveChanges, hasChanges } = useSettings();

  if (!settings) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl">
      <div>
        <h2 className="text-3xl font-black text-primary tracking-tight font-syne italic uppercase">Smart Eye Mode</h2>
        <p className="text-secondary text-sm font-medium mt-1">Advanced forced-productivity protocols.</p>
      </div>

      {/* FEATURE EXPLANATION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-primary/5 border border-primary/10 p-6 rounded-[32px] space-y-4">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Lock size={24} />
          </div>
          <h3 className="font-bold text-primary">Total Lockout</h3>
          <p className="text-xs text-secondary leading-relaxed">
            When active, ScreenSavage will create an invisible wall over your entire PC. 
            Mouse clicks and keyboard input will be ignored until the 20-second break ends.
          </p>
        </div>

        <div className="bg-surface border border-border p-6 rounded-[32px] space-y-4">
          <div className="w-12 h-12 bg-surface rounded-2xl flex items-center justify-center text-primary border border-border">
            <ShieldAlert size={24} />
          </div>
          <h3 className="font-bold text-primary">Zero Cheating</h3>
          <p className="text-xs text-secondary leading-relaxed">
            Standard popups can be ignored or moved. Smart Eye Mode ensures you 
            actually stop working. High-intensity eye-care for serious developers.
          </p>
        </div>
      </div>

      {/* THE TOGGLE CARD */}
      <div className="bg-canvas border border-border rounded-[40px] p-10 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Monitor size={120} className="text-primary" />
        </div>
        
        <div className="flex items-center justify-between relative z-10">
          <div className="space-y-2">
            <h3 className="text-xl font-black text-primary uppercase italic">Enable Stealth Lockout</h3>
            <p className="text-sm text-secondary max-w-md">
              Toggle this on to make your PC completely idle during break sessions. 
            </p>
          </div>

          <button 
            onClick={() => updateSetting('smartEyeEnabled', !settings.smartEyeEnabled)}
            className={`w-20 h-10 rounded-full transition-all duration-500 relative shadow-inner ${
              settings.smartEyeEnabled ? 'bg-primary' : 'bg-border'
            }`}
          >
            <div className={`absolute top-1.5 w-7 h-7 rounded-full bg-white shadow-lg transition-all duration-500 ${
              settings.smartEyeEnabled ? 'left-11' : 'left-1.5'
            }`} />
          </button>
        </div>
      </div>

      {/* SAVE ACTION */}
      {hasChanges && (
        <div className="flex justify-end animate-in slide-in-from-right-4">
          <button 
            onClick={saveChanges}
            className="bg-primary text-white px-10 py-4 rounded-2xl font-black uppercase text-xs shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            Deploy Protocol
          </button>
        </div>
      )}
    </div>
  );
};