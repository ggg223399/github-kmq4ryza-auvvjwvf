import { useEffect } from 'react';
import { WebSocketClient } from '../utils/websocket/WebSocketClient';
import { useTokenStore } from '../store/token/tokenStore';
import { formatTokenData } from '../services/token/tokenFormatter';
import type { TokenDataItem } from '../types/token';

export function useTokenWebSocket(timeRange: string) {
  const { addTokens, isPaused } = useTokenStore();

  useEffect(() => {
    if (isPaused) return;

    const ws = new WebSocketClient();

    ws.onMessage(async (data: TokenDataItem[]) => {
      if (!Array.isArray(data)) return;
      
      const formattedTokens = await Promise.all(
        data.map(formatTokenData)
      );
      
      addTokens(formattedTokens);
    });

    return () => ws.disconnect();
  }, [timeRange, isPaused, addTokens]);
}