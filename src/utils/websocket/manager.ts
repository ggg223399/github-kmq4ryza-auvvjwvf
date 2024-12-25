import { WebSocketClient } from './WebSocketClient';
import { TokenWebSocketClient } from './TokenWebSocketClient';

// Singleton instances
let signalWsInstance: WebSocketClient | null = null;
let tokenWsInstance: TokenWebSocketClient | null = null;

export function getSignalWebSocket(): WebSocketClient {
  if (!signalWsInstance) {
    signalWsInstance = new WebSocketClient();
  }
  return signalWsInstance;
}

export function getTokenWebSocket(): TokenWebSocketClient {
  if (!tokenWsInstance) {
    tokenWsInstance = new TokenWebSocketClient();
  }
  return tokenWsInstance;
}

export function cleanupWebSockets(): void {
  if (signalWsInstance) {
    signalWsInstance.disconnect();
    signalWsInstance = null;
  }
  if (tokenWsInstance) {
    tokenWsInstance.disconnect();
    tokenWsInstance = null;
  }
}