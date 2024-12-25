import type { Signal, SignalDataItem } from '../../types/signal';
import type { TradeDataItem } from '../../types/trade';

export function mapTradeDataToSignal(
  data: TradeDataItem,
  formatName: (address: string) => string
): Signal {
  const signalData = mapToSignalData(data);
  
  return {
    id: signalData.signature,
    type: signalData.direction,
    token: signalData.symbol,
    tokenAddress: signalData.address,
    tokenAmount: signalData.amount.toString(),
    solAmount: signalData.solAmount.toString(),
    price: signalData.price.toString(),
    marketCap: signalData.cap.toString(),
    priceUsd: signalData.solAmountUsd.toString(),
    timestamp: signalData.timestamp,
    txHash: signalData.signature,
    smartMoneyAddress: signalData.user,
    smartMoneyName: formatName(signalData.user)
  };
}

function mapToSignalData(data: TradeDataItem): SignalDataItem {
  const tokenInAmountFormatted = data.tokenInAmount / Math.pow(10, data.tokenInDecimals);
  const tokenOutAmountFormatted = data.tokenOutAmount / Math.pow(10, data.tokenOutDecimals);
  
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
    price,
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