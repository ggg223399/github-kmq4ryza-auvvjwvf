import React from 'react';
import { SignalsHeader } from './SignalsHeader';
import { SignalsSearch } from './SignalsSearch';
import { SignalsFilters } from './SignalsFilters';
import { SignalsList } from './SignalsList';
import { useSignalConnection } from '../../hooks/signals/useSignalConnection';
import { useSignalStore } from '../../hooks/signals/useSignalStore';

interface SignalsProps {
  isCollapsed: boolean;
  onCollapse: () => void;
}

export function Signals({ isCollapsed, onCollapse }: SignalsProps) {
  useSignalConnection();
  const { signals, isPaused } = useSignalStore();

  return (
    <div className={`flex flex-col bg-background transition-all duration-300 ease-in-out
                   ${isCollapsed ? 'h-[52px]' : 'h-full'}`}>
      <SignalsHeader 
        lastUpdate={signals[0]?.timestamp || Date.now()}
        isCollapsed={isCollapsed}
        onCollapse={onCollapse}
        isPaused={isPaused}
      />
      
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300
                    ${isCollapsed ? 'h-0' : ''}`}>
   
        <SignalsFilters />
        <SignalsList />
      </div>
    </div>
  );
}