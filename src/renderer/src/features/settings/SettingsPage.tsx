import React, { useState } from 'react';
import { Bell, Clock, Monitor, User, ShieldCheck, Volume2, Globe } from 'lucide-react';
import { SettingRow, SettingToggle, SettingSlider, MascotPicker } from './SettingsComponents';

export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl">
      <div>
        <h2 className="text-3xl font-black text-primary tracking-tight">App Configuration</h2>
        <p className="text-secondary text-sm font-medium mt-1">Fine-tune your Savage experience.</p>
      </div>

      {/* Timer Configuration */}
      <SettingSection title="20-20-20 Rules" icon={<Clock size={18} />}>
        <SettingSlider label="Break Frequency" value="20" unit="min" desc="How often should I roast you?" min={5} max={60} />
        <SettingSlider label="Break Duration" value="20" unit="sec" desc="Time spent looking at a distance." min={10} max={60} />
      </SettingSection>

      {/* Personality & Language */}
      <SettingSection title="Personality & Humor" icon={<User size={18} />}>
        <MascotPicker />
        <SettingRow label="Humor Style" desc="Switch between Savage Roasts and Gentle Reminders.">
           <div className="flex bg-surface p-1 rounded-xl border border-border">
              <button className="px-4 py-1.5 text-[10px] font-bold bg-primary text-white rounded-lg shadow-sm">Savage</button>
              <button className="px-4 py-1.5 text-[10px] font-bold text-secondary hover:text-primary">Gentle</button>
           </div>
        </SettingRow>
        <SettingToggle label="Ethiopian/Amharic Mix" desc="Enable random Amharic humor (e.g. 'Injera eyes')." defaultChecked />
      </SettingSection>

      {/* System Settings */}
      <SettingSection title="System" icon={<Monitor size={18} />}>
        <SettingToggle label="Launch on Boot" desc="Start ScreenSavage automatically." defaultChecked />
        <SettingToggle label="Sound Effects" desc="Play a 'Ding' (or a scream) when time is up." defaultChecked />
        <SettingToggle label="Stay on Top" desc="Always show popups above other windows." />
      </SettingSection>
    </div>
  );
};

const SettingSection = ({ title, icon, children }: any) => (
  <div className="bg-canvas border border-border rounded-[32px] overflow-hidden shadow-sm">
    <div className="px-8 py-5 border-b border-border bg-surface/30 flex items-center gap-3">
      <div className="text-primary">{icon}</div>
      <h3 className="text-sm font-bold text-primary uppercase tracking-widest">{title}</h3>
    </div>
    <div className="p-8 space-y-8">
      {children}
    </div>
  </div>
);