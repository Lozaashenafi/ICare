export const ActivityChart = () => {
  const data = [
    { day: 'Mon', val: 70 },
    { day: 'Tue', val: 45 },
    { day: 'Wed', val: 95 },
    { day: 'Thu', val: 60 },
    { day: 'Fri', val: 85 },
    { day: 'Sat', val: 30 },
    { day: 'Sun', val: 50 },
  ];

  return (
    <div className="flex items-end justify-between h-64 w-full px-4">
      {data.map((item) => (
        <div key={item.day} className="flex-1 flex flex-col items-center group relative h-full justify-end">
          {/* Bar Label (Value) */}
          <span className="absolute -top-8 text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            {Math.floor(item.val / 5)} Breaks
          </span>
          
          {/* The Bar */}
          <div 
            style={{ height: `${item.val}%` }}
            className="w-8 lg:w-14 bg-primary/10 border-t-4 border-primary rounded-t-xl group-hover:bg-primary/25 transition-all duration-500 cursor-pointer"
          />
          
          {/* Day Label */}
          <span className="text-[10px] font-bold text-secondary mt-6 uppercase tracking-widest">
            {item.day}
          </span>
        </div>
      ))}
    </div>
  );
};