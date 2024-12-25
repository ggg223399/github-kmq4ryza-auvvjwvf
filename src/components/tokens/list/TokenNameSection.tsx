import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';
import { PinButton } from '../PinButton';
import { formatAddress } from '../../../utils/format';
import type { TokenMetadata } from '../../../types/token';

interface TokenNameSectionProps {
  symbol: string;
  address: string;
  metadata: TokenMetadata;
  isPinned: boolean;
  onPinToggle: () => void;
}

export function TokenNameSection({ 
  symbol, 
  address, 
  metadata,
  isPinned,
  onPinToggle 
}: TokenNameSectionProps) {
  const [isCopied, setIsCopied] = useState(false);
  const { showToast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setIsCopied(true);
      showToast('Address copied to clipboard', { type: 'success' });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      showToast('Failed to copy address', { type: 'error' });
    }
  };

  return (
    <div className="flex items-center space-x-3">
      {metadata.image ? (
        <img 
          src={metadata.image} 
          alt={symbol}
          className="w-8 h-8 rounded-full bg-gray-800 object-cover"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
          <span className="text-xs text-gray-400">{symbol.slice(0, 2)}</span>
        </div>
      )}
      
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-white">{symbol}</span>
          <PinButton isPinned={isPinned} onClick={onPinToggle} />
          {/* <SocialLinks metadata={metadata} /> */}
        </div>
        
        <div className="flex items-center space-x-1">
          <span className="text-sm text-gray-400">{formatAddress(address)}</span>
          <button
            onClick={handleCopy}
            className="p-1 rounded-md transition-colors duration-200 hover:bg-surface/80"
          >
            {isCopied ? (
              <Check size={12} className="text-green-400" />
            ) : (
              <Copy size={12} className="text-gray-400 hover:text-cyan-400" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function SocialLinks({ metadata }: { metadata: TokenMetadata }) {
  return (
    <div className="flex items-center space-x-1">
      {metadata.twitter && (
        <a href={metadata.twitter} target="_blank" rel="noopener noreferrer" 
           className="text-gray-400 hover:text-cyan-400 transition-colors">
          𝕏
        </a>
      )}
      {metadata.telegram && (
        <a href={metadata.telegram} target="_blank" rel="noopener noreferrer"
           className="text-gray-400 hover:text-cyan-400 transition-colors">
          ✈️
        </a>
      )}
      {metadata.website && (
        <a href={metadata.website} target="_blank" rel="noopener noreferrer"
           className="text-gray-400 hover:text-cyan-400 transition-colors">
          🌐
        </a>
      )}
    </div>
  );
}