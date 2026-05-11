export const TimerHero = () => (
  <div className="bg-card-bg border border-border-main rounded-[32px] p-6 lg:p-12 flex flex-col items-center shadow-sm relative overflow-hidden transition-colors duration-500">
    <div className="text-center mb-10">
      <h2 className="text-xl lg:text-2xl font-bold text-text-primary uppercase tracking-widest">Next Break In</h2>
      <p className="text-text-secondary text-xs lg:text-sm mt-1">Hyper-focused mode</p>
    </div>

    <div className="relative w-56 h-56 lg:w-72 lg:h-72 mb-12">
      <svg className="w-full h-full -rotate-90">
        {/* Track color uses border color */}
        <circle cx="50%" cy="50%" r="45%" stroke="var(--color-border-main)" strokeWidth="12" fill="transparent" />
        <circle cx="50%" cy="50%" r="45%" stroke="var(--color-text-primary)" strokeWidth="12" fill="transparent" strokeDasharray="816.8" strokeDashoffset="200" strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl lg:text-6xl font-bold text-text-primary">18:45</span>
      </div>
    </div>

    <div className="flex gap-4 w-full max-w-md">
      <button className="flex-1 bg-text-primary text-canvas py-4 rounded-2xl font-bold hover:opacity-90 transition-all">
        Start Break Now
      </button>
      <button className="flex-1 border border-border-main text-text-primary py-4 rounded-2xl font-bold hover:bg-sidebar transition-all">
        Pause Timer
      </button>
    </div>
  </div>
);