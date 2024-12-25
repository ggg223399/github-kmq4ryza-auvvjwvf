import { nanoid } from 'nanoid';
import { mapTradeDataToSignal } from './trade';
import { formatSmartMoneyName } from './format/address';
import type { WebSocketMessage, Signal, SignalDataItem } from '../types/signal';
import type { TradeDataItem } from '../types/trade';

export class WebSocketClient {
  private ws: WebSocket | null = null;
  private subscriptionId: string | null = null;
  private signalCallback: ((signal: Signal) => void) | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout: number | null = null;

  constructor() {
    console.log('WebSocketClient: Initializing...');
    this.connect();
  }

  private connect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log('WebSocketClient: Max reconnection attempts reached');
      return;
    }

    try {
      console.log('WebSocketClient: Connecting to', import.meta.env.VITE_WS_URL);
      this.ws = new WebSocket(import.meta.env.VITE_WS_URL);
      
      this.ws.onopen = () => {
        console.log('WebSocketClient: Connected successfully');
        this.reconnectAttempts = 0;
        this.subscribe();
      };

      this.ws.onmessage = this.handleMessage.bind(this);

      this.ws.onerror = (error) => {
        console.error('WebSocketClient: Connection error', error);
      };

      this.ws.onclose = () => {
        console.log('WebSocketClient: Connection closed');
        this.handleReconnect();
      };
    } catch (error) {
      console.error('WebSocketClient: Connection failed', error);
      this.handleReconnect();
    }
  }

  private handleMessage(event: MessageEvent) {
    try {
      const message = JSON.parse(event.data);
      if (message.type === 'trade' && Array.isArray(message.data)) {
        message.data.forEach(tradeData => {
          if (this.signalCallback) {
            const signalData = mapTradeDataToSignal(tradeData);
            const signal = this.mapSignalData(signalData);
            this.signalCallback(signal);
          }
        });
      }
    } catch (error) {
      console.error('WebSocketClient: Error processing message', error);
    }
  }

  private handleReconnect() {
    this.reconnectAttempts++;
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
    
    console.log(`WebSocketClient: Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);
    
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
    
    this.reconnectTimeout = window.setTimeout(() => {
      this.connect();
    }, delay);
  }

  private subscribe() {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.warn('WebSocketClient: Cannot subscribe, connection not open');
      return;
    }

    this.subscriptionId = nanoid();
    const message: WebSocketMessage = {
      event: 'subscribe',
      data: {
        type: 'trade',
        id: this.subscriptionId
      }
    };

    this.ws.send(JSON.stringify(message));
  }

  private mapSignalData(data: SignalDataItem): Signal {
    return {
      id: data.signature,
      type: data.direction,
      token: data.symbol,
      tokenAddress: data.address,
      tokenAmount: data.amount.toString(),
      solAmount: data.solAmount.toString(),
      price: data.price.toString(),
      marketCap: data.cap.toString(),
      priceUsd: data.solAmountUsd.toString(),
      timestamp: data.timestamp,
      txHash: data.signature,
      smartMoneyAddress: data.user,
      smartMoneyName: formatSmartMoneyName(data.user)
    };
  }

  public onSignal(callback: (signal: Signal) => void): void {
    this.signalCallback = callback;
  }

  public disconnect(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
    
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      this.signalCallback = null;
    }
  }
}