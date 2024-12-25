import { nanoid } from 'nanoid';
import { WebSocketConfig } from './config';
import type { TokenData, TokenSubscribeMessage, TimeFilter, TokenResponse } from '../../types/token';

export class TokenWebSocketClient {
  private ws: WebSocket | null = null;
  private tokenCallback: ((tokens: TokenData[]) => void) | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private attempt = 0;
  private currentTimeFilter: TimeFilter = '30m';
  private subscriptionId: string | null = null;

  constructor() {
    console.log('TokenWebSocketClient: Initializing...');
    this.connect();
  }

  private connect() {
    if (this.attempt >= WebSocketConfig.MAX_RETRIES) {
      console.warn('TokenWebSocketClient: Max retries reached');
      return;
    }

    this.cleanup();

    try {
      console.log('TokenWebSocketClient: Connecting to', WebSocketConfig.WS_URL);
      this.ws = new WebSocket(WebSocketConfig.WS_URL);
      this.setupEventHandlers();
    } catch (error) {
      console.error('TokenWebSocketClient: Connection failed', error);
      this.scheduleReconnect();
    }
  }

  private setupEventHandlers() {
    if (!this.ws) return;

    this.ws.onopen = () => {
      console.log('TokenWebSocketClient: Connected');
      this.attempt = 0;
      this.subscribe();
    };

    this.ws.onclose = () => {
      console.log('TokenWebSocketClient: Closed');
      this.scheduleReconnect();
    };

    this.ws.onerror = (error) => {
      console.error('TokenWebSocketClient: Error occurred', error);
    };

    this.ws.onmessage = this.handleMessage.bind(this);
  }

  private scheduleReconnect() {
    const delay = Math.min(
      WebSocketConfig.BASE_DELAY * Math.pow(2, this.attempt),
      WebSocketConfig.MAX_DELAY
    );

    console.log(`TokenWebSocketClient: Reconnecting in ${delay}ms (attempt ${this.attempt + 1})`);

    this.reconnectTimer = setTimeout(() => {
      this.attempt++;
      this.connect();
    }, delay);
  }

  private cleanup() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  private subscribe() {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.warn('TokenWebSocketClient: Cannot subscribe, connection not open');
      return;
    }

    this.subscriptionId = nanoid();
    const message: TokenSubscribeMessage = {
      event: 'subscribe',
      data: {
        type: this.currentTimeFilter === '30m' ? 'token30mins' : 'token1hour',
        id: this.subscriptionId
      }
    };

    console.log('TokenWebSocketClient: Sending subscription', message);
    this.ws.send(JSON.stringify(message));
  }

  private handleMessage(event: MessageEvent) {
    try {
      const data = JSON.parse(event.data) as TokenResponse;
      console.log('TokenWebSocketClient: Received message', data);

      if ((data.type === 'token30mins' || data.type === 'token1hour') && Array.isArray(data.data)) {
        if (this.tokenCallback) {
          console.log('TokenWebSocketClient: Updating tokens', data.data.length);
          this.tokenCallback(data.data);
        }
      }
    } catch (error) {
      console.error('TokenWebSocketClient: Message processing error', error);
    }
  }

  public onTokens(callback: (tokens: TokenData[]) => void) {
    console.log('TokenWebSocketClient: Registered token callback');
    this.tokenCallback = callback;
  }

  public setTimeFilter(timeFilter: TimeFilter) {
    console.log('TokenWebSocketClient: Setting time filter to', timeFilter);
    if (this.currentTimeFilter === timeFilter) return;
    
    this.currentTimeFilter = timeFilter;
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.subscribe();
    }
  }

  public disconnect() {
    console.log('TokenWebSocketClient: Disconnecting...');
    this.cleanup();
    this.tokenCallback = null;
  }
}