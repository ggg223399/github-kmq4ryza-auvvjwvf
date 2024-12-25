import React, { useState } from 'react';
import { TokenList } from './TokenList';
import { TokenListControls } from './TokenListControls';
import { TokenListHeader } from './TokenListHeader';
import { TokenListContent } from './TokenListContent';
import { useTokenList } from '../../hooks/useTokenList';
import { useSearch } from '../../hooks/useSearch';
import { useSort } from '../../hooks/useSort';
import { usePinnedTokens } from '../../hooks/usePinnedTokens';
import type { TimeFilter } from '../../types/token';

export function TokenListContainer() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('30m');
  const { tokens, isLoading, newTokenAddress } = useTokenList(timeFilter);
  const { searchTerm, setSearchTerm, filteredTokens } = useSearch(tokens);
  const { sortKey, sortDirection, handleSort, getSortedTokens } = useSort();
  const { pinnedTokens, togglePin } = usePinnedTokens();
  
  const sortedTokens = getSortedTokens(filteredTokens, pinnedTokens);

  return (
    <TokenList>
      <TokenListControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        activeTimeFilter={timeFilter}
        onTimeFilterChange={setTimeFilter}
      />
      <TokenListHeader
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-400">Loading tokens...</div>
        </div>
      ) : (
        <TokenListContent 
          tokens={sortedTokens}
          pinnedTokens={pinnedTokens}
          onPinToggle={togglePin}
          newTokenAddress={newTokenAddress}
        />
      )}
    </TokenList>
  );
}