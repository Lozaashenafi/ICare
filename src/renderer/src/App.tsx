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
import { SmartEyePage } from './features/smart/SmartEyePage';

// Main Elements
import { RoastPopup } from './features/break/RoastPopup';
import { Onboarding } from './features/onboarding/Onboarding';
import { initTelemetry , trackEvent} from './services/telemetry';

function App() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userName, setUserName] = useState<string | null>(null);

  // --- REAL BACKEND STATE ---
  const [seconds, setSeconds] = useState(1200); 
  const [totalSeconds, setTotalSeconds] = useState(1200);
const [isPaused, setIsPaused] = useState(false); // Make sure you have this state

  const isBreakWindow = window.location.hash.includes('break');

  if (isBreakWindow) {
    return <RoastPopup />;
  }
useEffect(() => {
  window.api.getSettings().then((s) => {
    if (s.userName && s.userId) {
      setUserName(s.userName);
      
      // Initialize PostHog
      initTelemetry(s.userId, s.userName);
      
      // Track the session start
      trackEvent('app_opened');
    } else {
      setUserName(""); 
    }
  });
}, []);
 useEffect(() => {
  if (!window.api) return;

  // 1. Initial Data Sync
  window.api.getSettings().then((s) => {
    setUserName(s.userName || "");
    const initialSeconds = s.interval * 60;
    setSeconds(initialSeconds);
    setTotalSeconds(initialSeconds);
    if (s.userName && s.userId) {
      setUserName(s.userName);
      
      // Initialize PostHog
      initTelemetry(s.userId, s.userName);
      
      // Track the session start
      trackEvent('app_opened');
    } else {
      setUserName(""); 
    }
  });

  // 2. Timer Tick Listener
  const removeTickListener = window.api.onTimerTick((backendSeconds: number) => {
    setSeconds(backendSeconds);
  });

const removeSyncListener = (window.api as any).onPauseSync((backendPausedState: boolean) => {
  console.log("UI Sync: Timer is now", backendPausedState ? "Paused" : "Running");
  setIsPaused(backendPausedState); 
});

  // CLEANUP: Senior Dev standard to prevent memory leaks
  return () => {
    removeTickListener();
    if (removeSyncListener) removeSyncListener();
  };
}, []);

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
      case 'smart': return <SmartEyePage />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-canvas text-text transition-colors duration-500 overflow-hidden font-sans">
      <Sidebar activeTab={activeTab} onNavigate={setActiveTab} userName={userName} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 flex items-center justify-between px-10 border-b border-border bg-canvas/50 backdrop-blur-md shrink-0 z-10">
          
          {/* SENIOR LOGIC: Only show sub-nav if on Dashboard or History logs */}
          <div className="flex gap-8 text-sm font-bold text-secondary uppercase tracking-widest min-w-[200px]">
            {(activeTab === 'dashboard' || activeTab === 'history') && (
              <>
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
              </>
            )}
          </div>

          <div className="flex items-center gap-5 text-secondary">
            <div className="flex flex-col items-end mr-2 hidden sm:flex text-right">
              <span className="text-[10px] font-black uppercase tracking-tighter text-primary leading-none mb-1">System Status</span>
              <span className="text-[10px] font-bold text-tertiary leading-none uppercase tracking-widest">Active & Watching</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-10 overflow-y-auto custom-scrollbar bg-canvas">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>

        <footer className="h-10 border-t border-border px-10 flex items-center justify-between text-[9px] text-secondary font-mono uppercase tracking-[0.2em] bg-surface/30">
          <div>ICARE <span className="text-primary font-bold">V1.0.0</span></div>
          <div className="flex gap-6">
            <span>MODE: <span className={theme === 'dark' ? 'text-amber-400' : 'text-primary'}>{theme}</span></span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;