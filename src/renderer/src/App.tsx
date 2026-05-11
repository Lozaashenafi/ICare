import { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { TimerHero } from './components/dashboard/TimerHero';
import { WatcherCard, StatsCard } from './components/dashboard/SidebarCards';
// import { Bell, HelpCircle } from 'lucide-react';
import { HistoryPage } from './features/history/HistoryPage';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Apply the "dark" class to the HTML tag whenever state changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="flex h-screen bg-canvas text-text-primary transition-colors duration-500">
      {/* Pass the toggle function to the sidebar */}
      <Sidebar onToggleTheme={() => setIsDark(!isDark)} isDark={isDark} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Tabs */}
        <header className="h-20 flex items-center justify-between px-10 border-b border-border shrink-0">
          <div className="flex gap-8 text-sm font-semibold text-secondary">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`pb-7 pt-1 transition-all ${activeTab === 'dashboard' ? 'text-primary border-b-2 border-primary' : 'hover:text-primary'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`pb-7 pt-1 transition-all ${activeTab === 'history' ? 'text-primary border-b-2 border-primary' : 'hover:text-primary'}`}
            >
              History
            </button>
          </div>
        </header>

        <main className="flex-1 p-10 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' ? (
              <div className="flex flex-col xl:flex-row gap-8">
                 <div className="flex-[2] min-w-0"><TimerHero /></div>
                 <div className="flex-1 min-w-[300px] space-y-6">
                    <WatcherCard />
                    <StatsCard />
                 </div>
              </div>
            ) : (
              <HistoryPage />
            )}
          </div>
        </main>
      </div>
    </div>
  );

}

export default App;