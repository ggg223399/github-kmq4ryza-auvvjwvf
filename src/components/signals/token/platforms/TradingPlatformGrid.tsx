import React from 'react';
import { tradingPlatforms } from './TradingPlatform';

interface TradingPlatformGridProps {
  tokenAddress: string;
}

export function TradingPlatformGrid({ tokenAddress }: TradingPlatformGridProps) {
  return (
    <div className="grid grid-cols-6 gap-2">
      {tradingPlatforms.map((platform) => (
        <a
          key={platform.id}
          href={platform.getUrl(tokenAddress)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex p-2 items-center justify-center rounded-lg bg-surface/50 hover:bg-surface/80 
                   border border-gray-700/50 hover:border-cyan-500/30
                   transition-all duration-200 group"
          title={platform.name}
        >
          <img 
            src={platform.icon} 
            alt={platform.name}
            className="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity"
          />
        </a>
      ))}
    </div>
  );
}