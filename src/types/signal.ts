// WebSocket message types
export interface WebSocketMessage {
  event: 'subscribe';
  data: {
    type: string;
    id: string;
  };
}

export interface SignalDataItem {
  signature: string;
  smartMoneyName: string;
  user: string;
  direction: "buy" | "sell";
  amount: number;
  symbol: string;
  price: number;
  cap: number;
  solAmount: number;
  solAmountUsd: number;
  timestamp: number;
  address: string;
  uri: string;
}

// Internal signal type for UI
export interface Signal {
  id: string;
  type: 'buy' | 'sell';
  token: string;
  tokenAddress: string;
  tokenAmount: string;
  solAmount: string;
  price: string;
  marketCap: string;
  priceUsd: string;
  timestamp: number;
  txHash: string;
  smartMoneyAddress: string;
  smartMoneyName: string;
}