import React from 'react';
import { X, Copy, ExternalLink } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';
import { formatAddress } from '../../../utils/format';
import { TradingPlatformGrid } from './platforms/TradingPlatformGrid';
import type { Signal } from '../../../types/signal';

interface TokenDetailsDialogProps {
  signal: Signal;
  onClose: () => void;
}

export function TokenDetailsDialog({ signal, onClose }: TokenDetailsDialogProps) {
  const { showToast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(signal.tokenAddress);
      showToast('Address copied to clipboard', { type: 'success' });
    } catch (err) {
      showToast('Failed to copy address', { type: 'error' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-background rounded-lg shadow-xl 
                    border border-gray-800/50 animate-in fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center">
              <span className="text-base text-cyan-400">
                {signal.token.slice(0, 2)}
              </span>
            </div>
            <h2 className="text-lg font-medium text-white">${signal.token}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-gray-400 hover:text-white
                     hover:bg-gray-800 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Address */}
          <div className="flex items-center space-x-2 p-2 rounded-lg bg-surface/50 border border-gray-700/50">
            <span className="text-sm text-white font-mono flex-1">
              {formatAddress(signal.tokenAddress, 12)}
            </span>
            <div className="flex items-center space-x-1">
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-md text-gray-400 hover:text-cyan-400
                         hover:bg-surface transition-colors"
                title="Copy address"
              >
                <Copy size={14} />
              </button>
              <a
                href={`https://solscan.io/token/${signal.tokenAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-md text-gray-400 hover:text-cyan-400
                         hover:bg-surface transition-colors"
                title="View on Solscan"
              >
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Trading Platforms */}
          <TradingPlatformGrid tokenAddress={signal.tokenAddress} />
        </div>
      </div>
    </div>
  );
}