import type { WebSocketConfig } from './types';

export const WebSocketConfig = {
  WS_URL: import.meta.env.VITE_WS_URL || 'wss://ws.dev.pump.space/smart-money',
  RECONNECT: {
    BASE_DELAY: 1000,
    MAX_DELAY: 30000,
    MAX_RETRIES: 5
  }
}