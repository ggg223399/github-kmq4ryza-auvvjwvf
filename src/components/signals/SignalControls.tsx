import React from 'react';
import { Pause, Play, RefreshCw } from 'lucide-react';
import { useSignalStore } from '../../hooks/signals/useSignalStore';

export function SignalControls() {
  const { isPaused, setPaused, clearSignals } = useSignalStore();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setPaused(!isPaused)}
        className={`p-1.5 rounded-md transition-colors duration-200
                 ${isPaused 
                   ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                   : 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'}`}
      >
        {isPaused ? <Play size={14} /> : <Pause size={14} />}
      </button>
      <button
        onClick={clearSignals}
        className="p-1.5 rounded-md bg-surface/50 text-gray-400 
                 hover:bg-surface/80 hover:text-cyan-400
                 transition-colors duration-200"
      >
        <RefreshCw size={14} />
      </button>
    </div>
  );
}