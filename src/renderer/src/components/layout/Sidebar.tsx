import React from 'react';
import { LayoutGrid, LineChart, Settings, Eye, Moon, Sun,  User } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface SidebarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  userName: string; // Add this prop
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onNavigate, userName }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <aside className="w-20 lg:w-64 bg-surface border-r border-border flex flex-col h-screen p-4 lg:p-6 transition-all duration-500">
      
      {/* Brand Logo */}
      <div className="flex items-center justify-center lg:justify-start gap-3 mb-10 px-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold shadow-lg uppercase italic shadow-primary/20">
          I
        </div>
        <h1 className="text-xl font-bold text-primary tracking-tight hidden lg:block uppercase italic">Care</h1>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 flex-1">
        <NavItem icon={<LayoutGrid size={20} />} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => onNavigate('dashboard')} />
        <NavItem icon={<LineChart size={20} />} label="Statistics" active={activeTab === 'stats'} onClick={() => onNavigate('stats')} />
        <NavItem icon={<Settings size={20} />} label="Settings" active={activeTab === 'settings'} onClick={() => onNavigate('settings')} />
        <NavItem icon={<Eye size={20} />} label="Smart Eye" active={activeTab === 'smart'} onClick={() => onNavigate('smart')} />
      </nav>

      {/* User Profile Section */}
       <div className="mb-4 px-2">
        <div className="flex items-center gap-3 p-2 rounded-2xl bg-primary/5 border border-primary/10 overflow-hidden">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white shrink-0 shadow-md shadow-primary/20">
            <User size={16} />
          </div>
          <div className="hidden lg:flex flex-col min-w-0">
            <span className="text-[10px] font-black uppercase text-primary/50 leading-none">Victim</span>
            {/* THIS IS THE FIX: use the prop! */}
            <span className="text-xs font-bold text-primary truncate">
              {userName}
            </span>
          </div>
        </div>
      </div>

      {/* Mood Toggle and Quit */}
      <div className="space-y-1 pt-4 border-t border-border">
        <NavItem 
          onClick={toggleTheme}
          icon={isDark ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />} 
          label={isDark ? "Light Mood" : "Black Mood"} 
        />
        {/* <NavItem icon={<LogOut size={20} />} label="Quit App" /> */}
      </div>
    </aside>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon, label, active, onClick }: NavItemProps) => (
  <div 
    onClick={onClick}
    className={`flex items-center justify-center lg:justify-start gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all ${
      active 
        ? 'bg-primary text-white' 
        : 'text-secondary hover:bg-border/50 hover:text-primary'
    }`}
  >
    <span className="shrink-0">{icon}</span>
    <span className="text-sm hidden lg:block font-bold">{label}</span>
  </div>
);