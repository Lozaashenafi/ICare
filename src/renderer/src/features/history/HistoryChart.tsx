export const HistoryChart = ({ data }: { data: any[] }) => {
  return (
    <div className="flex items-end justify-between h-48 w-full gap-2">
      {data.map((item, i) => (
        <div key={i} className="flex-1 flex flex-col items-center group">
          <div className="relative w-full flex justify-center">
             <span className="absolute -top-8 bg-primary text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {item.count}
             </span>
             <div 
               style={{ height: item.height }}
               className="w-8 lg:w-12 bg-primary/10 border-t-4 border-primary rounded-t-lg group-hover:bg-primary/20 transition-all duration-500"
             />
          </div>
          <span className="text-[10px] font-bold text-secondary mt-4 uppercase">{item.day}</span>
        </div>
      ))}
    </div>
  );
};