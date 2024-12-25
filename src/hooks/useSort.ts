import { useState, useCallback } from 'react';
import { usePinnedTokens } from './usePinnedTokens';
import type { TokenData } from '../types/token';
import type { SortDirection } from '../types/sort';

export function useSort() {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const { pinnedTokens } = usePinnedTokens();

  const handleSort = useCallback((key: string) => {
    if (sortKey === key) {
      setSortDirection(current => {
        if (current === null) return 'desc';
        if (current === 'desc') return 'asc';
        return null;
      });
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }

    if (sortDirection === 'asc') {
      setSortKey(null);
      setSortDirection(null);
    }
  }, [sortKey, sortDirection]);

  const getSortedTokens = useCallback((tokens: TokenData[]) => {
    // First split tokens into pinned and unpinned
    const pinnedList = tokens.filter(token => pinnedTokens.has(token.tokenAddress));
    const unpinnedList = tokens.filter(token => !pinnedTokens.has(token.tokenAddress));

    // Sort function
    const sortFn = (a: TokenData, b: TokenData) => {
      if (!sortKey || !sortDirection) return 0;

      let aValue: number;
      let bValue: number;

      switch (sortKey) {
        case 'smartMoneyAccountNumber':
          aValue = a.smartMoneyAccountNumber;
          bValue = b.smartMoneyAccountNumber;
          break;
        case 'avgBuyMarketCap':
          aValue = a.avgBuyMarketCap;
          bValue = b.avgBuyMarketCap;
          break;
        case 'buyTokenAmount':
          aValue = a.buyTokenAmount;
          bValue = b.buyTokenAmount;
          break;
        case 'sellTokenAmount':
          aValue = a.sellTokenAmount;
          bValue = b.sellTokenAmount;
          break;
        case 'holder':
          aValue = a.holder;
          bValue = b.holder;
          break;
        default:
          return 0;
      }

      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    };

    // Sort each list separately
    const sortedPinned = [...pinnedList].sort(sortFn);
    const sortedUnpinned = [...unpinnedList].sort(sortFn);

    // Return pinned tokens first, followed by unpinned
    return [...sortedPinned, ...sortedUnpinned];
  }, [sortKey, sortDirection, pinnedTokens]);

  return {
    sortKey,
    sortDirection,
    handleSort,
    getSortedTokens
  };
}