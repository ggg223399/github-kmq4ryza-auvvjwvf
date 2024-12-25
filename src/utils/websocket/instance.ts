import { WebSocketClient } from './WebSocketClient';

// Singleton instance
let wsInstance: WebSocketClient | null = null;

export function getWebSocketInstance(): WebSocketClient {
  if (!wsInstance) {
    wsInstance = new WebSocketClient();
  }
  return wsInstance;
}

export function cleanupWebSocket(): void {
  if (wsInstance) {
    wsInstance.disconnect();
    wsInstance = null;
  }
}