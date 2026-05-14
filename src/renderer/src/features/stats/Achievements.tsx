import { Crown, Eye, Flame, Medal } from "lucide-react";

const Badge = ({ icon, label, unlocked }: { icon: React.ReactNode; label: string; unlocked: boolean }) => (
  <div className={`flex items-center gap-3 p-3 rounded-lg border ${unlocked ? 'bg-primary/10 border-primary' : 'bg-surface border-border opacity-50'}`}>
    <div className="text-primary">{icon}</div>
    <span className="text-xs font-semibold text-primary">{label}</span>
  </div>
);

export const Achievements = ({ mastery, streak, total }: any) => {
  return (
    <div className="bg-surface border border-border rounded-[32px] p-8 space-y-6">
      <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4 text-center">Badges Earned</h3>
      <div className="grid grid-cols-2 gap-4">
        <Badge icon={<Flame />} label="7 Day Streak" unlocked={streak >= 7} />
        <Badge icon={<Eye />} label="Eagle Vision" unlocked={total >= 50} />
        <Badge icon={<Crown />} label="Savage Lord" unlocked={total >= 100 && streak >= 10} />
        <Badge icon={<Medal />} label="First Steps" unlocked={total >= 1} />
      </div>

      <div className="mt-8 pt-6 border-t border-border text-center">
        <p className="text-[10px] text-secondary font-bold uppercase tracking-widest">Mastery Level</p>
        <div className="w-full bg-border h-2 rounded-full mt-3 overflow-hidden">
          <div style={{ width: `${mastery}%` }} className="bg-primary h-full transition-all duration-1000" />
        </div>
        <p className="text-[10px] text-primary font-bold mt-2 italic">{mastery}% to "Blink Master"</p>
      </div>
    </div>
  );
};