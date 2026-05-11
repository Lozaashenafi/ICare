import { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { TimerHero } from './components/dashboard/TimerHero';
import { WatcherCard, StatsCard } from './components/dashboard/SidebarCards';
import { Bell, HelpCircle } from 'lucide-react';

function App() {
  const [isDark, setIsDark] = useState(false);

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
        <header className="h-20 flex items-center justify-between px-10 border-b border-border-main shrink-0">
          <div className="flex gap-8 text-sm font-semibold text-text-secondary">
            <span className="text-text-primary border-b-2 border-accent pb-7 pt-1">Dashboard</span>
            <span className="pb-7 pt-1 hidden sm:block">History</span>
          </div>
          <div className="flex gap-4 text-text-secondary">
            <Bell size={20} className="cursor-pointer hover:text-accent" />
            <HelpCircle size={20} className="cursor-pointer hover:text-accent hidden sm:block" />
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
          <div className="flex flex-col xl:flex-row gap-8 max-w-7xl mx-auto">
            <div className="flex-[2] min-w-0">
              <TimerHero />
            </div>
            <div className="flex-1 min-w-[300px] space-y-6">
              <WatcherCard />
              <StatsCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;