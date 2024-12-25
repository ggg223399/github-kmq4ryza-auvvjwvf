import React from 'react';
import { Pin } from 'lucide-react';

interface PinButtonProps {
  isPinned: boolean;
  onClick: () => void;
}

export function PinButton({ isPinned, onClick }: PinButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-1 rounded-md transition-all duration-200
                 ${isPinned 
                   ? 'text-cyan-400 bg-cyan-500/20' 
                   : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/20'}`}
      title={isPinned ? 'Unpin token' : 'Pin token'}
    >
      <Pin 
        size={14} 
        className={`transform transition-transform duration-200
                   ${isPinned ? 'rotate-45 fill-current' : ''}`} 
      />
    </button>
  );
}