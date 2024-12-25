import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTokenStore } from '../../store/token/tokenStore';
import { useTokenFilters } from '../../hooks/useTokenFilters';
import { useSort } from '../../hooks/useSort';
import { TokenListHeader } from './list/TokenListHeader';
import { TokenListItem } from './TokenListItem';
import { TokenListEmpty } from './list/TokenListEmpty';
import { TokenListLoading } from './list/TokenListLoading';

export function TokenList() {
  const { tokens, isLoading, newTokenAddress, setPaused } = useTokenStore();
  const { filterTokens } = useTokenFilters();
  const { sortKey, sortDirection, handleSort, getSortedTokens } = useSort();

  // Always show header
  const header = (
    <TokenListHeader 
      sortKey={sortKey}
      sortDirection={sortDirection}
      onSort={handleSort}
    />
  );

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col">
        {header}
        <TokenListLoading />
      </div>
    );
  }

  // Apply filters first
  const filteredTokens = filterTokens(tokens);

  // Then sort the filtered tokens
  const sortedTokens = getSortedTokens(filteredTokens, new Set());

  return (
    <div 
      className="flex-1 flex flex-col"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {header}
      
      <div className="flex-1 overflow-y-auto">
        {sortedTokens.length === 0 ? (
          <TokenListEmpty />
        ) : (
          <AnimatePresence>
            {sortedTokens.map((token) => (
              <motion.div
                key={token.tokenAddress}
                initial={newTokenAddress === token.tokenAddress ? { 
                  height: 0,
                  opacity: 0,
                  x: -20
                } : false}
                animate={{ 
                  height: 'auto',
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                  mass: 1
                }}
              >
                <TokenListItem 
                  token={token}
                  isNew={token.tokenAddress === newTokenAddress}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}