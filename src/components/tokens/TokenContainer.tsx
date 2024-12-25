import React, { useState } from 'react';
import { TokenList } from './TokenList';
import { TokenListControls } from './TokenListControls';
import { useTokenInitialization } from '../../hooks/tokens/useTokenInitialization';
import { useTokenWebSocket } from '../../hooks/tokens/useTokenWebSocket';
import type { TimeFilter } from '../../types/token';

export function TokenContainer() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('30m');
  const [isHovered, setIsHovered] = useState(false);
  
  // Initialize tokens via HTTP
  useTokenInitialization(timeFilter);
  
  // Setup WebSocket for real-time updates
  useTokenWebSocket(timeFilter);

  return (
    <div className="flex-1 flex flex-col bg-background overflow-hidden">
      <TokenListControls 
        timeFilter={timeFilter}
        onTimeFilterChange={setTimeFilter}
        showPause={isHovered}
      />
      <TokenList />
    </div>
  );
}