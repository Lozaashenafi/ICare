import React, { useState } from 'react';

// Reusable Row Wrapper
export const SettingRow = ({ label, desc, children }: any) => (
  <div className="flex items-center justify-between gap-8">
    <div className="space-y-1">
      <h4 className="text-sm font-bold text-primary">{label}</h4>
      <p className="text-[11px] text-secondary leading-relaxed">{desc}</p>
    </div>
    {children}
  </div>
);

// Toggle Switch
export const SettingToggle = ({ label, desc, defaultChecked = false }: any) => {
  const [enabled, setEnabled] = useState(defaultChecked);
  return (
    <SettingRow label={label} desc={desc}>
      <button 
        onClick={() => setEnabled(!enabled)}
        className={`w-12 h-6 rounded-full transition-all duration-300 relative ${enabled ? 'bg-primary' : 'bg-border'}`}
      >
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${enabled ? 'left-7' : 'left-1'}`} />
      </button>
    </SettingRow>
  );
};

// Range Slider
export const SettingSlider = ({ label, value: initial, unit, desc, min, max }: any) => {
  const [val, setVal] = useState(initial);
  return (
    <SettingRow label={label} desc={desc}>
      <div className="flex items-center gap-4 w-48">
        <input 
          type="range" min={min} max={max} value={val} onChange={(e) => setVal(e.target.value)}
          className="flex-1 accent-primary cursor-pointer"
        />
        <span className="text-xs font-mono font-bold text-primary bg-surface px-2 py-1 rounded border border-border min-w-[50px] text-center">
          {val}{unit}
        </span>
      </div>
    </SettingRow>
  );
};

// Mascot Selector
export const MascotPicker = () => {
  const mascots = [
    { id: 'watcher', img: 'https://images.unsplash.com/photo-1541339907198-e08759dfc12e?w=100', name: 'The Watcher' },
    { id: 'joker', img: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=100', name: 'Savage Joker' },
    { id: 'robot', img: 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?w=100', name: 'Unit 404' }
  ];
  const [selected, setSelected] = useState('watcher');

  return (
    <div className="space-y-4">
      <p className="text-[11px] text-secondary font-bold uppercase tracking-widest">Active Mascot</p>
      <div className="grid grid-cols-3 gap-4">
        {mascots.map(m => (
          <div 
            key={m.id} 
            onClick={() => setSelected(m.id)}
            className={`cursor-pointer p-3 rounded-2xl border-2 transition-all text-center ${
              selected === m.id ? 'border-primary bg-primary/5' : 'border-border bg-transparent hover:border-primary/30'
            }`}
          >
            <img src={m.img} className="w-12 h-12 rounded-full mx-auto mb-2 object-cover" />
            <p className="text-[10px] font-bold text-primary">{m.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}