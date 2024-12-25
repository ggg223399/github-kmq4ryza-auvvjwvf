import React from 'react';
import { usePinnedTokens } from '../../hooks/usePinnedTokens';
import { TokenNameSection } from './list/TokenNameSection';
import { TokenStatsSection } from './list/TokenStatsSection';
import { TokenActions } from './TokenActions';
import type { TokenData } from '../../types/token';

interface TokenListItemProps {
  token: TokenData;
  isNew?: boolean;
}

export function TokenListItem({ token, isNew }: TokenListItemProps) {
  const { isPinned, togglePin } = usePinnedTokens();

  return (
    <div className={`px-4 py-3 grid grid-cols-[1.5fr,0.8fr,1fr,1fr,1fr,0.8fr,0.8fr] gap-4 
                   border-b border-gray-800 hover:bg-surface/50 transition-all duration-200
                   ${isNew ? 'bg-cyan-500/5' : ''}`}>
      {/* Token Info */}
      <TokenNameSection
        symbol={token.symbol}
        address={token.tokenAddress}
        metadata={token.metadata}
        isPinned={isPinned(token.tokenAddress)}
        onPinToggle={() => togglePin(token.tokenAddress)}
      />

      {/* Stats */}
      <TokenStatsSection token={token} />

      {/* Trade Button */}
      <TokenActions token={token} />
    </div>
  );
}