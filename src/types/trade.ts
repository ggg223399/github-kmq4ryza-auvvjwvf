export interface TradeDataItem {
  signature: string;
  timestamp: number;
  user: string;
  userName: string;
  amount: number;
  decimal: number;
  isBuy: boolean;
  tokenIn: string;
  tokenOut: string;
  tokenInDecimals: number;
  tokenOutDecimals: number;
  tokenInAmount: number;
  tokenOutAmount: number;
  nativeTokenPrice: number;
  baseTokenSupplied: number;
  symbol: string;
  uri: string;
}