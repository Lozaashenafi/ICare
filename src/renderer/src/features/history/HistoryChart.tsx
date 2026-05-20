
interface ChartItem {
  day: string;
  count: number;
  height: string;
}

export const HistoryChart = ({ data }: { data: ChartItem[] }) => {

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-secondary text-[10px] uppercase tracking-widest animate-pulse">
        Waiting for telemetry...
      </div>
    );
  }

  return (
    <div className="flex items-end justify-between h-48 w-full gap-3 px-2">
      {data.map((item, i) => (
        <div key={i} className="flex-1 flex flex-col items-center group">
          {/* Bar Container */}
          <div className="relative w-full flex flex-col justify-end items-center h-40">
            
            {/* 1. TOOLTIP (Appears on hover) */}
            <span className="absolute -top-10 bg-primary text-white text-[9px] font-black px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1 shadow-xl z-20 whitespace-nowrap">
              {item.count} Breaks
            </span>

            {/* 2. BACKGROUND TRACK (Makes it look pro even with 0 breaks) */}
            <div className="absolute inset-0 w-8 lg:w-12 bg-border/20 rounded-t-lg mx-auto" />

            {/* 3. DYNAMIC FILL BAR */}
            <div 
              style={{ 
                height: item.height,
                minHeight: item.count > 0 ? '4px' : '0px' // Ensures at least a sliver shows if count > 0
              }}
              className="w-8 lg:w-12 bg-primary shadow-[0_0_15px_rgba(0,33,71,0.2)] border-t-2 border-white/20 rounded-t-lg z-10 group-hover:bg-primary/80 transition-all duration-700 ease-out relative"
            >
              {/* Subtle Glossy Effect */}
              <div className="absolute inset-x-0 top-0 h-full w-full bg-gradient-to-b from-white/10 to-transparent rounded-t-lg" />
            </div>

          </div>

          {/* 4. DAY LABEL */}
          <span className="text-[10px] font-black text-secondary mt-5 uppercase tracking-tighter">
            {item.day}
          </span>
        </div>
      ))}
    </div>
  );
};