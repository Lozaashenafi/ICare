import React from 'react';

interface RowProps { label: string; desc: string; children: React.ReactNode; }
export const SettingRow = ({ label, desc, children }: RowProps) => (
  <div className="flex items-center justify-between gap-8 animate-in fade-in duration-500">
    <div className="space-y-1">
      <h4 className="text-sm font-bold text-primary">{label}</h4>
      <p className="text-[11px] text-secondary leading-relaxed max-w-[280px]">{desc}</p>
    </div>
    {children}
  </div>
);

export const SettingToggle = ({ label, desc, value, onChange }: any) => (
  <SettingRow label={label} desc={desc}>
    <button 
      onClick={() => onChange(!value)}
      className={`w-12 h-6 rounded-full transition-all duration-500 relative shadow-inner ${
        value ? 'bg-primary' : 'bg-border'
      }`}
    >
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-md transition-all duration-500 ${
        value ? 'left-7' : 'left-1'
      }`} />
    </button>
  </SettingRow>
);

export const SettingSlider = ({ label, value, unit, desc, min, max, onChange }: any) => (
  <SettingRow label={label} desc={desc}>
    <div className="flex items-center gap-4 w-48 group">
      <input 
        type="range" min={min} max={max} value={value} 
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="flex-1 accent-primary cursor-pointer h-1.5 bg-surface rounded-lg appearance-none border border-border"
      />
      <span className="text-xs font-mono font-bold text-primary bg-surface px-2 py-1 rounded-lg border border-border min-w-[55px] text-center shadow-sm">
        {value}{unit}
      </span>
    </div>
  </SettingRow>
);

const STYLE_OPTIONS = [
  { id: 'savage', label: 'Savage', desc: 'Aggressive roast' },
  { id: 'normal', label: 'Normal', desc: 'Casual reminder' },
  { id: 'friendly', label: 'Friendly', desc: 'Warm nudge' },
  { id: 'motivational', label: 'Motivational', desc: 'Inspiring push' }
];

export const StyleSelector = ({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) => (
  <div className="space-y-4">
    <p className="text-[10px] text-secondary font-black uppercase tracking-[0.2em]">Message Style</p>
    <div className="grid grid-cols-4 gap-3">
      {STYLE_OPTIONS.map(s => (
        <button
          key={s.id}
          onClick={() => onSelect(s.id)}
          className={`p-3 rounded-2xl border-2 transition-all duration-300 text-center ${
            selected === s.id
              ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5'
              : 'border-border bg-transparent hover:border-primary/30'
          }`}
        >
          <p className={`text-[10px] font-black uppercase tracking-tighter ${selected === s.id ? 'text-primary' : 'text-secondary'}`}>
            {s.label}
          </p>
          <p className="text-[9px] text-secondary mt-0.5">{s.desc}</p>
        </button>
      ))}
    </div>
  </div>
);

export const MascotPicker = ({ selected, onSelect }: any) => {
  const mascots = [
    { id: 'watcher', img: 'https://images.unsplash.com/photo-1541339907198-e08759dfc12e?w=100', name: 'The Watcher' },
    { id: 'joker', img: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=100', name: 'Savage Joker' },
    { id: 'robot', img: 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?w=100', name: 'Unit 404' }
  ];

  return (
    <div className="space-y-4">
      <p className="text-[10px] text-secondary font-black uppercase tracking-[0.2em]">Active Entity</p>
      <div className="grid grid-cols-3 gap-4">
        {mascots.map(m => (
          <div 
            key={m.id} 
            onClick={() => onSelect(m.id)}
            className={`cursor-pointer p-4 rounded-3xl border-2 transition-all duration-300 group ${
              selected === m.id ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5' : 'border-border bg-transparent hover:border-primary/30'
            }`}
          >
            <img src={m.img} className={`w-14 h-14 rounded-2xl mx-auto mb-3 object-cover transition-transform duration-500 group-hover:scale-110 ${selected === m.id ? '' : 'grayscale'}`} />
            <p className={`text-[10px] font-black uppercase tracking-tighter ${selected === m.id ? 'text-primary' : 'text-secondary'}`}>
              {m.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}