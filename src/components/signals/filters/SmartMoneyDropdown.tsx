import React, { useState } from 'react';
import { Check, Search } from 'lucide-react';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useSmartMoney } from '../../../hooks/useSmartMoney';
import { formatAddress } from '../../../utils/format';

interface SmartMoneyDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

export function SmartMoneyDropdown({ 
  isOpen, 
  onClose, 
  selectedIds, 
  onChange 
}: SmartMoneyDropdownProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const ref = useClickOutside<HTMLDivElement>(onClose);
  const { wallets, isLoading } = useSmartMoney();

  const filteredWallets = wallets.filter(wallet =>
    (wallet.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    wallet.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (address: string) => {
    const newSelected = selectedIds.includes(address)
      ? selectedIds.filter(selectedId => selectedId !== address)
      : [...selectedIds, address];
    onChange(newSelected);
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={ref}
      className="absolute left-0 top-full mt-2 w-64 z-50 bg-surface
                 border border-gray-700 rounded-lg shadow-lg animate-in fade-in"
    >
      {/* Search Box */}
      <div className="p-3 border-b border-gray-700">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search wallets..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg
                     bg-background text-white placeholder-gray-400
                     border border-gray-700 focus:border-cyan-500/30
                     focus:outline-none focus:ring-1 focus:ring-cyan-500/30
                     text-sm transition-all duration-200"
          />
        </div>
      </div>

      {/* Wallet List */}
      <div className="max-h-[280px] overflow-y-auto">
        {isLoading ? (
          <div className="p-4 text-center text-gray-400">
            Loading wallets...
          </div>
        ) : filteredWallets.length === 0 ? (
          <div className="p-4 text-center text-gray-400">
            No wallets found
          </div>
        ) : (
          filteredWallets.map((wallet) => (
            <button
              key={wallet.address}
              onClick={() => handleToggle(wallet.address)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5
                       transition-all duration-200 group
                       ${selectedIds.includes(wallet.address)
                         ? 'bg-cyan-500/10 text-cyan-400' 
                         : 'hover:bg-surface/80 text-gray-300'}`}
            >
              <span className="flex-1 text-left">
                {wallet.name || formatAddress(wallet.address)}
              </span>
              <span className={`text-sm ${
                selectedIds.includes(wallet.address) ? 'text-cyan-400' : 'text-gray-400'
              }`}>
                {wallet.score.toFixed(1)}
              </span>
              {selectedIds.includes(wallet.address) && (
                <Check size={16} className="text-cyan-400 flex-shrink-0" />
              )}
            </button>
          ))
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between p-2 border-t border-gray-700">
        <button
          onClick={() => onChange([])}
          className="px-3 py-1 text-sm text-gray-400 hover:text-white
                   transition-colors duration-200"
        >
          Reset
        </button>
        <button
          onClick={onClose}
          className="px-3 py-1 text-sm bg-cyan-500/20 text-cyan-400
                   rounded-md hover:bg-cyan-500/30
                   transition-colors duration-200"
        >
          Apply
        </button>
      </div>
    </div>
  );
}