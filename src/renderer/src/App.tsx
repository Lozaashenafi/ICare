import { useState } from 'react';
import { useTheme } from './context/ThemeContext';

// Layout & UI Components
import { Sidebar } from './components/layout/Sidebar';
import { TimerHero } from './components/dashboard/TimerHero';
import { WatcherCard, StatsCard } from './components/dashboard/SidebarCards';

// Feature Pages
import { HistoryPage } from './features/history/HistoryPage';
import { StatsPage } from './features/stats/StatsPage';
import { SettingsPage } from './features/settings/SettingsPage';

// Lucide Icons (Optional for header)
import { Bell, HelpCircle } from 'lucide-react';

function App() {
  const { theme } = useTheme(); // Uses the Provider we set up
  const [activeTab, setActiveTab] = useState('dashboard');

  /**
   * Helper function to render the correct view based on the activeTab state.
   * This keeps the return statement clean and readable.
   */
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="flex flex-col xl:flex-row gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex-[2] min-w-0">
              <TimerHero />
            </div>
            <div className="flex-1 min-w-[300px] space-y-6">
              <WatcherCard />
              <StatsCard />
            </div>
          </div>
        );
      case 'stats':
        return <StatsPage />;
      case 'history':
        return <HistoryPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <TimerHero />;
    }
  };

  return (
    <div className="flex h-screen bg-canvas text-text transition-colors duration-500 overflow-hidden">
      
      {/* 1. Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onNavigate={setActiveTab}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* 2. Top Navigation Bar */}
        <header className="h-20 flex items-center justify-between px-10 border-b border-border bg-canvas/50 backdrop-blur-md shrink-0 z-10">
          <div className="flex gap-8 text-sm font-bold text-secondary uppercase tracking-widest">
            {/* Contextual Tabs: Dashboard & History are usually paired */}
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`pb-7 pt-1 transition-all border-b-2 outline-none ${
                activeTab === 'dashboard' ? 'text-primary border-primary' : 'border-transparent hover:text-primary'
              }`}
            >
              Real-time
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`pb-7 pt-1 transition-all border-b-2 outline-none ${
                activeTab === 'history' ? 'text-primary border-primary' : 'border-transparent hover:text-primary'
              }`}
            >
              Logs
            </button>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-5 text-secondary">
            <div className="flex flex-col items-end mr-2 hidden sm:flex">
              <span className="text-[10px] font-black uppercase tracking-tighter text-primary">System Status</span>
              <span className="text-[10px] font-bold text-tertiary">Active & Watching</span>
            </div>
            <Bell size={20} className="cursor-pointer hover:text-primary transition-colors" />
            <HelpCircle size={20} className="cursor-pointer hover:text-primary transition-colors" />
          </div>
        </header>

        {/* 3. Dynamic Main Content Area */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto custom-scrollbar bg-canvas">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>

        {/* 4. Global Status Footer */}
        <footer className="h-10 border-t border-border px-10 flex items-center justify-between text-[9px] text-secondary font-mono uppercase tracking-[0.2em] bg-surface/30">
          <div>
            ScreenSavage <span className="text-primary font-bold">v1.0.4</span>
          </div>
          <div className="flex gap-6">
            <span>Mode: <span className={theme === 'dark' ? 'text-amber-400' : 'text-primary'}>{theme}</span></span>
            <span className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
              Engine Online
            </span>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default App;