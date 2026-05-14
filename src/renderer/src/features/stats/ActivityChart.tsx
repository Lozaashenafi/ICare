export const ActivityChart = ({ data }: { data: any[] }) => (
  <div className="flex items-end justify-between h-64 w-full px-4">
    {data.map((item, i) => (
      <div key={i} className="flex-1 flex flex-col items-center group relative h-full justify-end">
        <span className="absolute -top-8 text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {item.actualCount} Breaks
        </span>
        <div 
          style={{ height: `${item.val}%` }}
          className="w-8 lg:w-14 bg-primary/10 border-t-4 border-primary rounded-t-xl group-hover:bg-primary/25 transition-all duration-700"
        />
        <span className="text-[10px] font-bold text-secondary mt-6 uppercase tracking-widest">{item.day}</span>
      </div>
    ))}
  </div>
);