import type { TradeDataItem } from '../types/trade';
import type { SignalDataItem } from '../types/signal';

export function mapTradeDataToSignal(data: TradeDataItem): SignalDataItem {
  const tokenInAmountFormatted = data.tokenInAmount / 10 ** data.tokenInDecimals;
  const tokenOutAmountFormatted = data.tokenOutAmount / 10 ** data.tokenOutDecimals;
  
  const price = data.isBuy
    ? (data.nativeTokenPrice * tokenInAmountFormatted) / tokenOutAmountFormatted
    : (data.nativeTokenPrice * tokenOutAmountFormatted) / tokenInAmountFormatted;

  return {
    signature: data.signature,
    user: data.user,
    smartMoneyName: data.userName,
    direction: data.isBuy ? "buy" : "sell",
    amount: data.isBuy ? tokenOutAmountFormatted : tokenInAmountFormatted,
    symbol: data.symbol,
    price: price,
    cap: price * data.baseTokenSupplied,
    solAmount: data.isBuy ? tokenInAmountFormatted : tokenOutAmountFormatted,
    solAmountUsd: data.isBuy
      ? tokenInAmountFormatted * data.nativeTokenPrice
      : tokenOutAmountFormatted * data.nativeTokenPrice,
    timestamp: data.timestamp,
    address: data.isBuy ? data.tokenOut : data.tokenIn,
    uri: data.uri
  };
}