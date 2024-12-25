import { generateMockTokenData } from './mockTokenData';
import type { TokenDataItem } from '../../types/token';

const MOCK_INTERVAL = 5000; // 5 seconds between updates

export class MockWebSocket implements WebSocket {
  private intervalId: number | null = null;
  public readyState: number = WebSocket.CONNECTING;
  public binaryType: BinaryType = 'blob';
  public bufferedAmount: number = 0;
  public extensions: string = '';
  public protocol: string = '';
  public url: string = '';
  
  public onclose: ((ev: CloseEvent) => any) | null = null;
  public onerror: ((ev: Event) => any) | null = null;
  public onmessage: ((ev: MessageEvent) => any) | null = null;
  public onopen: ((ev: Event) => any) | null = null;

  constructor(url: string) {
    this.url = url;
    setTimeout(() => {
      this.readyState = WebSocket.OPEN;
      this.onopen?.(new Event('open'));
      this.startMockMessages();
    }, 100);
  }

  private startMockMessages() {
    // Send initial batch of tokens
    const initialTokens = Array.from({ length: 10 }, generateMockTokenData);
    this.sendMockMessage('token30mins', initialTokens);

    // Send periodic updates
    this.intervalId = window.setInterval(() => {
      // Generate 1-2 new tokens
      const newTokens = Array.from(
        { length: Math.floor(Math.random() * 2) + 1 }, 
        generateMockTokenData
      );
      this.sendMockMessage('token30mins', newTokens);
    }, MOCK_INTERVAL);
  }

  private sendMockMessage(type: string, data: TokenDataItem[]) {
    this.onmessage?.(new MessageEvent('message', {
      data: JSON.stringify({ type, data })
    }));
  }

  send(data: string) {
    // Handle subscription message
    try {
      const message = JSON.parse(data);
      console.log('MockWebSocket: Received message', message);
    } catch (error) {
      console.error('MockWebSocket: Failed to parse message', error);
    }
  }

  close() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.readyState = WebSocket.CLOSED;
    this.onclose?.(new CloseEvent('close'));
  }

  addEventListener() {}
  removeEventListener() {}
  dispatchEvent(): boolean { return true; }
}