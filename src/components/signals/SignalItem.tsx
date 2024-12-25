import React, { useState } from 'react';
import { formatNumber, formatPrice, formatTimeAgo } from '../../utils/format';
import { TokenDetailsDialog } from './token/TokenDetailsDialog';
import type { Signal } from '../../types/signal';

interface SignalItemProps {
  signal: Signal;
}

export function SignalItem({ signal }: SignalItemProps) {
  const [showDetails, setShowDetails] = useState(false);
  const tokenAmount = parseFloat(signal.tokenAmount);
  const price = parseFloat(signal.price);
  const marketCap = parseFloat(signal.marketCap);
  const solAmountUsd = parseFloat(signal.priceUsd);

  return (
    <>
      <div className="group relative p-3 rounded-lg bg-surface/30 hover:bg-surface/50
                   border border-transparent hover:border-cyan-500/20
                   transition-all duration-200">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-1 text-sm">
            <span className="text-gray-200">{signal.smartMoneyName}</span>
            <span className="text-gray-500">{formatTimeAgo(signal.timestamp)}</span>
          </div>
        </div>
        <div className="text-xs">
          <span className="text-gray-400">
            {signal.type === 'buy' ? 'Bought' : 'Sold'} {formatNumber(tokenAmount)}   
          </span>
          {' '}
          <span 
            className={`${signal.type === 'buy' ? 'text-green-400' : 'text-red-400'} 
                     cursor-pointer hover:underline`} 
            onClick={() => setShowDetails(true)}
          >
            {signal.token}
          </span>
          {' '}
          <span className="text-gray-400">
            (${formatPrice(price)} M:${formatNumber(marketCap)})
          </span>
          {' '}
          <span className="text-gray-400">with</span>
          {' '}
          <span className="text-gray-300">{formatNumber(solAmountUsd)} SOL</span>
        </div>

        {/* Hover Effect Border */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100
                     pointer-events-none transition-opacity duration-200">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r
                       from-transparent via-cyan-500/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r
                       from-transparent via-cyan-500/50 to-transparent" />
        </div>
      </div>

      {showDetails && (
        <TokenDetailsDialog
          signal={signal}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
}