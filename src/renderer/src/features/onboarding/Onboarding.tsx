import { useState } from 'react';

export const Onboarding = ({ onComplete }: { onComplete: (name: string) => void }) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim().length < 2) return;
    window.api.saveSetting('userName', name);
    onComplete(name);
  };

  return (
    <div className="h-screen w-screen bg-primary flex items-center justify-center p-10 text-white font-sans">
      <div className="max-w-md w-full text-center space-y-8 animate-in zoom-in duration-500">
        <div className="text-8xl animate-bounce">😤</div>
        <h1 className="text-4xl font-black uppercase italic tracking-tighter">Welcome to the Abyss</h1>
        <p className="text-white/60 text-sm italic">
          "I need a name to put on your digital tombstone when your eyes fail. What should I call you?"
        </p>
        
        <input 
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name..."
          className="w-full bg-white/10 border-2 border-white/20 p-4 rounded-2xl text-center text-xl font-bold placeholder:text-white/20 outline-none focus:border-white transition-all"
        />

        <button 
          onClick={handleSubmit}
          className="w-full bg-white text-primary py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl"
        >
          Begin Surveillance
        </button>
      </div>
    </div>
  );
};