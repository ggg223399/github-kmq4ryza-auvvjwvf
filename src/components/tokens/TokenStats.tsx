import React from 'react';
import { formatNumber } from '../../utils/format/number';
import { formatPrice } from '../../utils/format/price';
import type { TokenData } from '../../types/token';

interface TokenStatsProps {
  token: TokenData;
}

export function TokenStats({ token }: TokenStatsProps) {
  return (
    <>
      <div className="flex flex-col items-end">
        <div className="flex items-center space-x-2">
          <span className="text-white">{token.smartMoneyAccountNumber}</span>
          {token.buyingDirection !== 0 && (
            <div className={`transition-all duration-200 ${
              token.buyingDirection > 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {token.buyingDirection > 0 ? '↑' : '↓'}
            </div>
          )}
        </div>
       
      </div>

      <div className="text-right">
        <div className="text-white">${formatNumber(token.avgBuyMarketCap)}</div>
        <div className="text-xs text-gray-400">Price: ${formatPrice(token.price)}</div>
      </div>

      <div className="text-right">
        <div className="text-cyan-400">{formatNumber(token.buyTotalCost)} SOL</div>
        <div className="text-xs text-gray-400">{token.buyTxCount} txns</div>
      </div>

      <div className="text-right">
        <div className="text-red-400">{formatNumber(token.sellTotalCost)} SOL</div>
        <div className="text-xs text-gray-400">{token.sellTxCount} txns</div>
      </div>

      <div className="text-right">
        <div className="text-white">{token.holder}</div>
        <div className="text-xs text-gray-400">Holders</div>
      </div>
    </>
  );
}