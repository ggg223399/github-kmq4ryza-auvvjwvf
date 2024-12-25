import React from 'react';
import { X, Copy, ExternalLink } from 'lucide-react';
import { formatAddress, formatNumber, formatTimeAgo } from '../../../utils/format';
import { useToast } from '../../../hooks/useToast';
import type { TokenDetail } from '../../../types/token';

interface TokenDetailsDialogProps {
  tokenSymbol: string;
  details: TokenDetail[];
  onClose: () => void;
}

export function TokenDetailsDialog({ tokenSymbol, details, onClose }: TokenDetailsDialogProps) {
  const { showToast } = useToast();

  const handleCopy = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      showToast('Address copied to clipboard', { type: 'success' });
    } catch (err) {
      showToast('Failed to copy address', { type: 'error' });
    }
  };

  const calculatePercentage = (holding: number) => {
    const totalHolding = details.reduce((sum, d) => sum + d.holding, 0);
    return ((holding / totalHolding) * 100).toFixed(2);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-background rounded-lg shadow-xl 
                    border border-gray-800/50 animate-in fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-medium text-white">${tokenSymbol}</h2>
            <span className="px-2 py-1 text-sm rounded-md bg-cyan-500/10 text-cyan-400">
              {details.length} Smart Money
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-gray-400 hover:text-white
                     hover:bg-gray-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Column Headers */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm
                     grid grid-cols-[2fr,1fr,1fr,1fr] gap-4 px-4 py-3 
                     text-sm text-gray-400 border-b border-gray-800">
          <div className="text-left">Name/Address</div>
          <div className="text-right">Buy Cost</div>
          <div className="text-right">Holding</div>
          <div className="text-right">First Buy</div>
        </div>

        {/* Details List */}
        <div className="max-h-[60vh] overflow-y-auto">
          {details.map((detail) => (
            <div 
              key={detail.user}
              className="grid grid-cols-[2fr,1fr,1fr,1fr] gap-4 px-4 py-3 
                       border-b border-gray-800/50 hover:bg-surface/50
                       transition-colors duration-200"
            >
              {/* Name/Address */}
              <div className="flex items-center space-x-2">
                <div className="flex flex-col min-w-0">
                  <div className="text-white font-medium truncate text-left">
                    {detail.userName || formatAddress(detail.user)}
                  </div>
                  <div className="flex items-center space-x-1 text-sm">
                    <span className="text-gray-400 font-mono">
                      {formatAddress(detail.user)}
                    </span>
                    <div className="flex items-center space-x-0.5">
                      <button
                        onClick={() => handleCopy(detail.user)}
                        className="p-1 rounded-md text-gray-400 hover:text-cyan-400
                                 hover:bg-surface/80 transition-colors"
                      >
                        <Copy size={12} />
                      </button>
                      <a
                        href={`https://solscan.io/account/${detail.user}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded-md text-gray-400 hover:text-cyan-400
                                 hover:bg-surface/80 transition-colors"
                      >
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buy Cost */}
              <div className="text-right">
                <div className="text-cyan-400 font-medium">
                  ${formatNumber(detail.buyCost)} 
                </div>
              
              </div>

              {/* Holding */}
              <div className="text-right">
                <div className="text-white font-medium">
                  {formatNumber(detail.holding)}
                </div>
                <div className="text-xs text-gray-400">
                  ({calculatePercentage(detail.holding)}%)
                </div>
              </div>

              {/* First Buy */}
              <div className="text-right">
                <div className="text-gray-300">
                  {formatTimeAgo(detail.firstTimestamp)}
                </div>
                <div className="text-xs text-gray-400">
                  {new Date(detail.firstTimestamp).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}