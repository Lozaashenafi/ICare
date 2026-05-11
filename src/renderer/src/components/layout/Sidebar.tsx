import React from 'react';
import { 
  LayoutGrid, 
  LineChart, 
  Settings, 
  Eye, 
  TimerOff, 
  Coffee, 
  Moon, 
  Sun, 
  LogOut 
} from 'lucide-react';

// --- TYPES ---
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

interface SidebarProps {
  onToggleTheme: () => void;
  isDark: boolean;
}

// --- SUB-COMPONENT: NavItem ---
const NavItem: React.FC<NavItemProps> = ({ icon, label, active = false, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center justify-center lg:justify-start gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
      active 
        ? 'bg-sidebar-hover text-text-primary font-semibold shadow-sm' 
        : 'text-text-secondary hover:bg-sidebar-hover hover:text-text-primary'
    }`}
    title={label}
  >
    <span className={`shrink-0 ${active ? 'text-accent' : ''}`}>{icon}</span>
    <span className="text-sm hidden lg:block overflow-hidden whitespace-nowrap">
      {label}
    </span>
  </div>
);

// --- MAIN COMPONENT: Sidebar ---
export const Sidebar: React.FC<SidebarProps> = ({ onToggleTheme, isDark }) => {
  return (
    <aside className="w-20 lg:w-64 bg-sidebar border-r border-border-main flex flex-col h-screen p-4 lg:p-6 transition-all duration-300">
      
      {/* Logo Area */}
      <div className="flex items-center justify-center lg:justify-start gap-2 mb-10 px-2">
        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-accent/20">
          S
        </div>
        <h1 className="text-xl font-bold text-text-primary tracking-tight hidden lg:block">
          ScreenSavage
        </h1>
      </div>

      {/* Main Nav */}
      <nav className="space-y-1 flex-1">
        <NavItem icon={<LayoutGrid size={20} />} label="Dashboard" active={true} />
        <NavItem icon={<LineChart size={20} />} label="Statistics" />
        <NavItem icon={<Settings size={20} />} label="Settings" />
        <NavItem icon={<Eye size={20} />} label="Smart Eye Mode" />
        
        <div className="py-6 lg:py-8">
          <hr className="border-border-main" />
        </div>

        <NavItem icon={<TimerOff size={20} />} label="Pause Timer" />
        <NavItem icon={<Coffee size={20} />} label="Take Break Now" />
      </nav>

      {/* Footer Nav */}
      <div className="space-y-1 pt-4 border-t border-border-main">
        <NavItem 
          onClick={onToggleTheme}
          icon={isDark ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} />} 
          label={isDark ? "White Mood" : "Black Mood"} 
        />
        <NavItem icon={<LogOut size={20} />} label="Quit App" />
      </div>
    </aside>
  );
};