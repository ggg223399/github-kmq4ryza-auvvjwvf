import React from 'react';
import { DirectionIndicator } from '../indicators/DirectionIndicator';
import { TokenDetailsButton } from '../details/TokenDetailsButton';
import type { TokenData } from '../../../types/token';

interface TokenStatsSectionProps {
  token: TokenData;
}

export function TokenStatsSection({ token }: TokenStatsSectionProps) {
  return (
    <>
      {/* Smart Money Amount */}
      <div className="text-right">
        <div className="flex items-center justify-end space-x-2">
          <span className="text-white">{token.smartMoneyAccountNumber}</span>
          <DirectionIndicator direction={token.buyingDirection} />
          <TokenDetailsButton 
            tokenSymbol={token.symbol}
            details={token.details}
          />
        </div>
     
      </div>

      {/* Market Cap & Price */}
      <div className="text-right">
        <div className="text-white">{token.formattedValues.avgBuyMarketCap}</div>
        <div className="text-xs text-gray-400">
          Price: {token.formattedValues.avgPrice}
        </div>
      </div>

      {/* Buy Info */}
      <div className="text-right">
        <div className="text-cyan-400">{token.formattedValues.buyTotalCost}</div>
        <div className="text-xs text-gray-400">
          {`${token.buyTokenAmountFormatted}/${token.buyTxCount} txns`}
        </div>
      </div>

      {/* Sell Info */}
      <div className="text-right">
        <div className="text-red-400">{token.formattedValues.sellTotalCost}</div>
        <div className="text-xs text-gray-400">
          {`${token.sellTokenAmountFormatted}/${token.sellTxCount} txns`}
        </div>
      </div>

      {/* Holders */}
      <div className="text-right">
        <div className="text-white">{token.formattedValues.holders}</div>
        <div className="text-xs text-gray-400">Holders</div>
      </div>
    </>
  );
}