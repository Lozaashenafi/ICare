import React from 'react';
import { Clock, Monitor, User, Info, Save } from 'lucide-react';
import {  SettingToggle, SettingSlider, MascotPicker, StyleSelector } from './SettingsComponents';
import { useSettings } from '../../hooks/useSettings';

export const SettingsPage: React.FC = () => {
  const { settings, updateSetting, saveChanges, hasChanges, isLoading } = useSettings();

  if (isLoading || !settings) {
    return <div className="p-10 text-secondary font-bold uppercase text-xs animate-pulse">Accessing Secure Config...</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl pb-20">
      <div>
        <h2 className="text-3xl font-black text-primary tracking-tight font-syne italic uppercase">Configuration</h2>
        <p className="text-secondary text-sm font-medium mt-1">Behavioral parameters for ScreenSavage.</p>
      </div>

      {/* 1. Timer Config */}
      <SettingSection title="20-20-20 Protocol" icon={<Clock size={18} />}>
        <SettingSlider 
          label="Interval" 
          desc="Frequency of the roast sessions."
          value={settings.interval} 
          unit="m" 
          min={5} max={60}
          onChange={(val: number) => updateSetting('interval', val)}
        />
        <SettingSlider 
          label="Duration" 
          desc="Time required to stare at the void."
          value={settings.duration} 
          unit="s" 
          min={10} max={60}
          onChange={(val: number) => updateSetting('duration', val)}
        />
      </SettingSection>

      {/* 2. Personality */}
      <SettingSection title="Entity & Personality" icon={<User size={18} />}>
        <MascotPicker 
          selected={settings.mascot} 
          onSelect={(id: string) => updateSetting('mascot', id)} 
        />
        <StyleSelector
          selected={settings.messageStyle || 'savage'}
          onSelect={(val: string) => updateSetting('messageStyle', val)}
        />
      </SettingSection>

      {/* 3. System */}
      <SettingSection title="System Integration" icon={<Monitor size={18} />}>
        <SettingToggle 
          label="Launch on Startup" 
          desc="Start ICare automatically."
          value={settings.launchOnBoot}
          onChange={(val: boolean) => updateSetting('launchOnBoot', val)}
        />
        <SettingToggle 
          label="Stay on Top" 
          desc="Break window will bypass all other apps."
          value={settings.stayOnTop}
          onChange={(val: boolean) => updateSetting('stayOnTop', val)}
        />
      </SettingSection>

      {/* SAVE BUTTON SECTION - NEW */}
      <div className="flex flex-col items-end gap-4">
        {hasChanges && (
          <div className="flex items-center gap-2 text-primary animate-bounce">
            <Info size={14} />
            <p className="text-[10px] font-bold uppercase tracking-widest">You have unsaved changes</p>
          </div>
        )}
        
        <button 
          onClick={saveChanges}
          disabled={!hasChanges}
          className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase text-xs transition-all shadow-xl ${
            hasChanges 
            ? 'bg-primary text-white hover:scale-105 active:scale-95 shadow-primary/20' 
            : 'bg-surface text-secondary border border-border cursor-not-allowed opacity-50'
          }`}
        >
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="flex items-center gap-2 p-4 bg-primary/5 rounded-2xl border border-primary/10">
        <Info size={14} className="text-primary" />
        <p className="text-[10px] text-primary/70 font-medium">Click "Save Changes" to commit parameters to the secure store.</p>
      </div>
    </div>
  );
};

const SettingSection = ({ title, icon, children }: any) => (
  <div className="bg-canvas border border-border rounded-[40px] overflow-hidden shadow-sm hover:border-primary/20 transition-colors duration-500">
    <div className="px-10 py-6 border-b border-border bg-surface/30 flex items-center gap-4">
      <div className="p-2 bg-primary/5 rounded-xl text-primary">{icon}</div>
      <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em]">{title}</h3>
    </div>
    <div className="p-10 space-y-10">
      {children}
    </div>
  </div>
);