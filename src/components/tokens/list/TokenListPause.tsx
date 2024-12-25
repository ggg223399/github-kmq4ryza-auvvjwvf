import React from 'react';
import { Pause, Play } from 'lucide-react';
import { useTokenStore } from '../../../store/token/tokenStore';

interface TokenListPauseProps {
  show: boolean;
}

export function TokenListPause({ show }: TokenListPauseProps) {
  const { isPaused, setPaused } = useTokenStore();

  if (!show) return null;

  return (
    <div className="absolute top-4 right-4 z-20 animate-in fade-in">
      <button
        onClick={() => setPaused(!isPaused)}
        className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg
                 transition-all duration-200
                 ${isPaused 
                   ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                   : 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'}`}
      >
        {isPaused ? <Play size={16} /> : <Pause size={16} />}
        <span className="text-sm font-medium">PAUSE</span>
      </button>
    </div>
  );
}