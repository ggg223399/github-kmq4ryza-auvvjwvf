import { useCallback } from 'react';
import type { Signal } from '../../types/signal';

export function useSignalFilters(
  signals: Signal[],
  searchTerm: string,
  selectedSmartMoneyIds: string[],
  selectedTradeType: 'all' | 'buy' | 'sell'
) {
  return useCallback(() => {
    return signals.filter(signal => {
      // Filter by search term
      if (searchTerm && !signal.tokenAddress.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Filter by trade type
      if (selectedTradeType !== 'all' && signal.type !== selectedTradeType) {
        return false;
      }

      // Filter by smart money
      if (selectedSmartMoneyIds.length > 0) {
        return selectedSmartMoneyIds.includes(signal.smartMoneyAddress);
      }

      return true;
    });
  }, [signals, searchTerm, selectedSmartMoneyIds, selectedTradeType]);
}