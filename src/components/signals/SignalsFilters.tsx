import React, { useState, useEffect } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { TradeTypeFilter } from './filters/TradeTypeFilter';
import { useSignalStore } from '../../hooks/signals/useSignalStore';
import { useSignalFilterStore } from '../../store/signal/signalFilterStore';

export function SignalsFilters() {
  const [showTradeTypeDropdown, setShowTradeTypeDropdown] = useState(false);
  const { signals } = useSignalStore();
  const { tradeType, setTradeType } = useSignalFilterStore();

  // Log when signals or filter changes
  useEffect(() => {
    console.log('SignalsFilters: Signals updated', {
      totalSignals: signals.length,
      tradeType,
      filteredSignals: signals.filter(signal => {
        if (tradeType === 'all') return true;
        return signal.type === tradeType;
      }).length
    });
  }, [signals, tradeType]);

  const handleTradeTypeChange = (type: 'all' | 'buy' | 'sell') => {
    console.log('SignalsFilters: Trade type changed', { from: tradeType, to: type });
    setTradeType(type);
    setShowTradeTypeDropdown(false);
  };

  return (
    <div className="px-4 pb-4 flex space-x-2">
      {/* Trade Type Filter */}
      <div className="relative flex-1">
        <button 
          onClick={() => setShowTradeTypeDropdown(!showTradeTypeDropdown)}
          className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg
                   bg-surface/50 border border-gray-700/50
                   hover:bg-surface/80 transition-all duration-200 group
                   ${tradeType !== 'all' ? 'border-cyan-500/30' : ''}`}
        >
          <ArrowUpDown size={14} className={`${
            tradeType !== 'all' ? 'text-cyan-400' : 'text-gray-400'
          } group-hover:text-cyan-400 transition-colors`} />
          <span className={`text-sm ${
            tradeType !== 'all' ? 'text-cyan-400' : 'text-gray-400'
          } group-hover:text-cyan-400`}>
            {tradeType === 'all' ? 'Buy & Sell' : 
             tradeType === 'buy' ? 'Buy Only' : 'Sell Only'}
          </span>
        </button>
        <TradeTypeFilter
          isOpen={showTradeTypeDropdown}
          onClose={() => setShowTradeTypeDropdown(false)}
          selected={tradeType}
          onChange={handleTradeTypeChange}
        />
      </div>
    </div>
  );
}