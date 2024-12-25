import React from 'react';
import { useSignalStore } from '../../hooks/signals/useSignalStore';
import { useSignalFilterStore } from '../../store/signal/signalFilterStore';
import { SignalItem } from './SignalItem';

export function SignalsList() {
  const { signals } = useSignalStore();
  const { tradeType } = useSignalFilterStore();
  
  // Filter signals based on selected trade type
  const filteredSignals = signals.filter(signal => {
    if (tradeType === 'all') return true;
    return signal.type === tradeType;
  });

  console.log('SignalsList: Rendering with signals', {
    total: signals.length,
    filtered: filteredSignals.length,
    tradeType
  });

  return (
    <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-4">
      {filteredSignals.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          Waiting for signals...
        </div>
      ) : (
        filteredSignals.map((signal) => (
          <SignalItem key={signal.id} signal={signal} />
        ))
      )}
    </div>
  );
}