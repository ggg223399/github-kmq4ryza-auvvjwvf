import { useEffect } from 'react';
import { WebSocketClient } from '../../utils/websocket';
import { useSignalStore } from './useSignalStore';

export function useSignalConnection() {
  const { addSignal } = useSignalStore();

  useEffect(() => {
    const wsClient = new WebSocketClient();
    wsClient.onSignal(addSignal);
    return () => wsClient.disconnect();
  }, [addSignal]);
}