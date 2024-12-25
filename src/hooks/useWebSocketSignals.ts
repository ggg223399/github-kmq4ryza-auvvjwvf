import { useState, useEffect, useCallback } from 'react';
import { getSignalWebSocket } from '../utils/websocket/manager';
import type { Signal } from '../types/signal';

export function useWebSocketSignals() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const wsClient = getSignalWebSocket();

    wsClient.onSignal((signal) => {
      if (!isPaused) {
        setSignals(prev => [signal, ...prev]);
      }
    });

    return () => {
      // Don't disconnect here - the instance is managed globally
      wsClient.onSignal(() => {});
    };
  }, [isPaused]);

  const clearSignals = useCallback(() => {
    setSignals([]);
  }, []);

  return {
    signals,
    isPaused,
    setIsPaused,
    clearSignals
  };
}