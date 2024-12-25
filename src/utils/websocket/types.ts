export interface WebSocketInterface {
  onMessage(callback: (data: any[]) => void): void;
  disconnect(): void;
}

export interface WebSocketConfig {
  WS_URL: string;
  RECONNECT: {
    BASE_DELAY: number;
    MAX_DELAY: number;
    MAX_RETRIES: number;
  };
}