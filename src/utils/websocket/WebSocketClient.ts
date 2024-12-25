import { nanoid } from 'nanoid';
import { WebSocketConfig } from './config';
import { MockWebSocket } from '../../mock/websocket/mockWebSocket';
import type { TokenDataItem } from '../../types/token';

export class WebSocketClient implements WebSocketInterface {
  private ws: WebSocket | null = null;
  private messageCallback: ((data: TokenDataItem[]) => void) | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private attempt = 0;

  constructor() {
    this.connect();
  }

  private connect() {
    if (this.attempt >= WebSocketConfig.RECONNECT.MAX_RETRIES) {
      console.warn('WebSocketClient: Max retries reached');
      this.handleError(new Error('Max reconnection attempts reached'));
      return;
    }

    this.cleanup();

    try {
      if (!WebSocketConfig.WS_URL) {
        throw new Error('WebSocket URL is not configured');
      }

      // Use MockWebSocket in development
      const WS = import.meta.env.DEV ? MockWebSocket : WebSocket;
      this.ws = new WS(WebSocketConfig.WS_URL) as WebSocket;
      this.setupEventHandlers();
    } catch (error) {
      console.error('WebSocketClient: Connection failed', error);
      this.handleError(error);
      this.scheduleReconnect();
    }
  }

  private handleError(error: unknown) {
    // Implement proper error handling
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('WebSocketClient Error:', errorMessage);
  }

  private setupEventHandlers() {
    if (!this.ws) return;

    this.ws.onopen = () => {
      console.log('WebSocketClient: Connected');
      this.attempt = 0;
      this.subscribe();
    };

    this.ws.onclose = () => {
      console.log('WebSocketClient: Closed');
      this.handleError(new Error('WebSocket connection closed'));
      this.scheduleReconnect();
    };

    this.ws.onerror = (error) => {
      console.log('WebSocketClient: Error occurred', error);
      this.handleError(error);
    };

    this.ws.onmessage = this.handleMessage.bind(this);
  }

  private handleMessage(event: MessageEvent) {
    try {
      const data = JSON.parse(event.data);
      if (data.type === 'trade' && Array.isArray(data.data)) {
        this.messageCallback?.(data.data);
      }
    } catch (error) {
      console.error('WebSocketClient: Message processing error', error);
    }
  }

  private scheduleReconnect() {
    const delay = Math.min(
      WebSocketConfig.RECONNECT.BASE_DELAY * Math.pow(2, this.attempt),
      WebSocketConfig.RECONNECT.MAX_DELAY
    );

    console.log(`WebSocketClient: Reconnecting in ${delay}ms (attempt ${this.attempt + 1})`);

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
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;

    const message = {
      event: 'subscribe',
      data: {
        type: 'trade',
        id: nanoid()
      }
    };

    this.ws.send(JSON.stringify(message));
  }

  public onMessage(callback: (data: TokenDataItem[]) => void) {
    this.messageCallback = callback;
  }

  public disconnect() {
    this.cleanup();
    this.messageCallback = null;
  }
}