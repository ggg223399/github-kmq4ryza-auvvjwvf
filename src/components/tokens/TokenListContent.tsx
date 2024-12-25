import React from 'react';
import { TokenListItem } from './TokenListItem';
import type { TokenData } from '../../types/token';

interface TokenListContentProps {
  tokens: TokenData[];
  pinnedTokens: Set<string>;
  onPinToggle: (id: string) => void;
  newTokenAddress: string | null;
}

export function TokenListContent({ 
  tokens, 
  pinnedTokens,
  onPinToggle,
  newTokenAddress
}: TokenListContentProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      {tokens.map((token) => (
        <TokenListItem
          key={token.tokenAddress}
          token={token}
          isPinned={pinnedTokens.has(token.tokenAddress)}
          onPinToggle={() => onPinToggle(token.tokenAddress)}
          isNew={token.tokenAddress === newTokenAddress}
        />
      ))}
    </div>
  );
}