import { useEffect } from 'react';
import { useTokenStore } from '../../store/token/tokenStore';
import { formatTokenData } from '../../services/token/tokenFormatter';
import { WebSocketClient } from '../../utils/websocket/WebSocketClient';
import { WebSocketConfig } from '../../utils/websocket/config';
import type { TokenDataItem } from '../../types/token';

export function useTokenWebSocket(timeRange: string) {
  const { addTokens, isPaused } = useTokenStore();

  useEffect(() => {
    if (isPaused || !WebSocketConfig.WS_URL) return;

    const ws = new WebSocketClient();

    ws.onMessage(async (data: TokenDataItem[]) => {
      if (!Array.isArray(data)) return;
      
      try {
        const formattedTokens = await Promise.all(
          data.map(formatTokenData)
        );
        addTokens(formattedTokens);
      } catch (error) {
        console.error('Failed to process token data:', error);
      }
    });

    return () => ws.disconnect();
  }, [timeRange, isPaused, addTokens]);
}