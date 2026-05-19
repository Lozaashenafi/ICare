import { useEffect, useState } from 'react';
import { useTheme } from './context/ThemeContext';

// Layout & UI Components
import { Sidebar } from './components/layout/Sidebar';
import { TimerHero } from './components/dashboard/TimerHero';
import { WatcherCard, StatsCard } from './components/dashboard/SidebarCards';

// Feature Pages
import { HistoryPage } from './features/history/HistoryPage';
import { StatsPage } from './features/stats/StatsPage';
import { SettingsPage } from './features/settings/SettingsPage';

// Lucide Icons
import { Bell, HelpCircle } from 'lucide-react';
import { RoastPopup } from './features/break/RoastPopup';
import { Onboarding } from './features/onboarding/Onboarding';
import { initTelemetry } from './services/telemetry';
import { SmartEyePage } from './features/smart/SmartEyePage';

function App() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userName, setUserName] = useState<string | null>(null);

  // --- REAL BACKEND STATE ---
  const [seconds, setSeconds] = useState(1200); 
  const [totalSeconds, setTotalSeconds] = useState(1200);
  const [isPaused, setIsPaused] = useState(false);

  // 1. DETECTION: Is this the Popup Window?
  const isBreakWindow = window.location.hash.includes('break');

  // 2. FIX: If it's the break window, show it IMMEDIATELY. 
  // Do not wait for userName or settings logic.
  if (isBreakWindow) {
    return <RoastPopup />;
  }

  // 3. MAIN WINDOW LOGIC: Fetch settings and start bridge
  useEffect(() => {
    if (!window.api) {
      console.warn("Waiting for bridge...");
      return;
    }

    window.api.getSettings().then((settings) => {
      if (!settings.userName || settings.userName.trim() === "") {
        setUserName(""); // Trigger onboarding
      } else {
        setUserName(settings.userName);
        initTelemetry(settings.userId, settings.userName);
      }

      const initialSeconds = settings.interval * 60;
      setSeconds(initialSeconds);
      setTotalSeconds(initialSeconds);
    });

    // Listen for Ticks
    const removeTickListener = window.api.onTimerTick((backendSeconds: number) => {
      setSeconds(backendSeconds);
    });

    return () => {
      if (removeTickListener) removeTickListener();
    };
  }, []);

  // 4. MAIN WINDOW VIEW GUARDS
  if (userName === null) {
    return (
      <div className="h-screen bg-canvas flex items-center justify-center text-primary font-bold uppercase tracking-widest animate-pulse">
        Initializing Watcher...
      </div>
    );
  }

  if (userName === "") {
    return (
      <Onboarding onComplete={(name) => {
        setUserName(name);
        window.api.getSettings().then(s => initTelemetry(s.userId, name));
      }} />
    );
  }

  // --- TAB RENDERING LOGIC ---
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="flex flex-col xl:flex-row gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex-[2] min-w-0">
              <TimerHero seconds={seconds} totalSeconds={totalSeconds} isPaused={isPaused} />
            </div>
            <div className="flex-1 min-w-[300px] space-y-6">
              <WatcherCard />
              <StatsCard />
            </div>
          </div>
        );
      case 'stats': return <StatsPage />;
      case 'history': return <HistoryPage />;
      case 'settings': return <SettingsPage />;
      case 'smart':
          return <SmartEyePage />;

      default:
        return <TimerHero seconds={seconds} totalSeconds={totalSeconds} isPaused={isPaused} />;
    }
  };

  // --- MAIN LAYOUT ---
  return (
    <div className="flex h-screen bg-canvas text-text transition-colors duration-500 overflow-hidden font-sans">
      <Sidebar activeTab={activeTab} onNavigate={setActiveTab} userName={userName} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 flex items-center justify-between px-10 border-b border-border bg-canvas/50 backdrop-blur-md shrink-0 z-10">
          <div className="flex gap-8 text-sm font-bold text-secondary uppercase tracking-widest">
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

          <div className="flex items-center gap-5 text-secondary">
            <div className="flex flex-col items-end mr-2 hidden sm:flex">
              <span className="text-[10px] font-black uppercase tracking-tighter text-primary">System Status</span>
              <span className="text-[10px] font-bold text-tertiary">Active & Watching</span>
            </div>
            <Bell size={20} className="cursor-pointer hover:text-primary transition-colors" />
            <HelpCircle size={20} className="cursor-pointer hover:text-primary transition-colors" />
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-10 overflow-y-auto custom-scrollbar bg-canvas">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>

        <footer className="h-10 border-t border-border px-10 flex items-center justify-between text-[9px] text-secondary font-mono uppercase tracking-[0.2em] bg-surface/30">
          <div>ICare <span className="text-primary font-bold">v1.0.4</span></div>
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