import React from 'react';
import { Medal, Flame, Eye, Crown } from 'lucide-react';

export const Achievements = () => {
  return (
    <div className="bg-surface border border-border rounded-[32px] p-8 space-y-6">
      <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4 text-center">Badges Earned</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <Badge icon={<Flame />} label="7 Day Streak" unlocked={true} />
        <Badge icon={<Eye />} label="Eagle Vision" unlocked={true} />
        <Badge icon={<Crown />} label="Savage Lord" unlocked={false} />
        <Badge icon={<Medal />} label="Early Bird" unlocked={true} />
      </div>

      <div className="mt-8 pt-6 border-t border-border text-center">
        <p className="text-[10px] text-secondary font-bold uppercase tracking-widest">Mastery Level</p>
        <div className="w-full bg-border h-2 rounded-full mt-3 overflow-hidden">
          <div className="bg-primary h-full w-[70%] transition-all duration-1000" />
        </div>
        <p className="text-[10px] text-primary font-bold mt-2 italic">70% to "Blink Master" status</p>
      </div>
    </div>
  );
};

const Badge = ({ icon, label, unlocked }: any) => (
  <div className={`flex flex-col items-center p-4 rounded-2xl border transition-all ${
    unlocked ? 'bg-canvas border-border text-primary grayscale-0 opacity-100' : 'bg-transparent border-dashed border-border text-secondary grayscale opacity-40'
  }`}>
    <div className={`mb-2 ${unlocked ? 'text-primary' : 'text-secondary'}`}>
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <span className="text-[9px] font-bold uppercase text-center leading-tight">{label}</span>
  </div>
);