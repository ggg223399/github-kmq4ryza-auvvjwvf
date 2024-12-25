import { useCallback } from 'react';
import { useFilterStore } from '../store/filter/filterStore';
import type { TokenData } from '../types/token';
import type { FilterState } from '../types/filter';

export function useTokenFilters() {
  const { filters } = useFilterStore();

  const filterTokens = useCallback((tokens: TokenData[]) => {
    // If no filters are active, return all tokens
    if (Object.values(filters).every(f => f === null)) {
      return tokens;
    }

    return tokens.filter(token => {
      // Check each active filter
      return Object.entries(filters).every(([type, filter]) => {
        if (!filter) return true; // Skip inactive filters

        let value: number;
        switch (type) {
          case 'smartMoney':
            value = token.smartMoneyAccountNumber;
            break;
          case 'avgBuyMc':
            value = token.avgBuyMarketCap;
            break;
          case 'holders':
            value = token.holder;
            break;
          default:
            return true;
        }

        return checkFilterValue(value, filter);
      });
    });
  }, [filters]);

  return { filterTokens };
}

function checkFilterValue(value: number, filter: FilterState): boolean {
  if (filter.type === 'preset') {
    return value >= (filter.value || 0);
  }

  const min = filter.min ?? 0;
  const max = filter.max ?? Infinity;
  return value >= min && value <= max;
}