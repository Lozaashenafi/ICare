import React from 'react';
import { LayoutGrid, LineChart, Settings, Eye, TimerOff, Coffee, Moon, Sun, LogOut } from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active = false, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center justify-center lg:justify-start gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all ${
      active 
        ? 'bg-primary text-white shadow-md shadow-primary/20' 
        : 'text-secondary hover:bg-border/40 hover:text-primary'
    }`}
    title={label}
  >
    <span className="shrink-0">{icon}</span>
    <span className="text-sm hidden lg:block font-medium">{label}</span>
  </div>
);

export const Sidebar: React.FC<{ onToggleTheme: () => void; isDark: boolean }> = ({ onToggleTheme, isDark }) => {
  return (
    <aside className="w-20 lg:w-64 bg-surface border-r border-border flex flex-col h-screen p-4 lg:p-6 transition-all">
      
      <div className="flex items-center justify-center lg:justify-start gap-3 mb-10 px-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
          S
        </div>
        <h1 className="text-xl font-bold text-primary tracking-tight hidden lg:block">
          ScreenSavage
        </h1>
      </div>

      <nav className="space-y-1 flex-1">
        <NavItem icon={<LayoutGrid size={20} />} label="Dashboard" active={true} />
        <NavItem icon={<LineChart size={20} />} label="Statistics" />
        <NavItem icon={<Settings size={20} />} label="Settings" />
        <NavItem icon={<Eye size={20} />} label="Smart Eye Mode" />
        
        <div className="py-6"><hr className="border-border" /></div>

        <NavItem icon={<TimerOff size={20} />} label="Pause Timer" />
        <NavItem icon={<Coffee size={20} />} label="Take Break Now" />
      </nav>

      <div className="space-y-1 pt-4 border-t border-border">
        <NavItem 
          onClick={onToggleTheme}
          icon={isDark ? <Sun size={20} /> : <Moon size={20} />} 
          label={isDark ? "Light Mood" : "Dark Mood"} 
        />
        <NavItem icon={<LogOut size={20} />} label="Quit App" />
      </div>
    </aside>
  );
};