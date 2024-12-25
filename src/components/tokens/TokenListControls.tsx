import React from 'react';
import { Search, X, Pause, Play } from 'lucide-react';
import { useI18n } from '../../i18n/i18n';
import { useTokenStore } from '../../store/token/tokenStore';
import type { TimeFilter } from '../../types/token';

interface TokenListControlsProps {
  timeFilter: TimeFilter;
  onTimeFilterChange: (filter: TimeFilter) => void;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  showPause?: boolean;
}

export function TokenListControls({
  timeFilter,
  onTimeFilterChange,
  searchTerm = '',
  onSearchChange,
  showPause = false
}: TokenListControlsProps) {
  const { t } = useI18n();
  const { isPaused } = useTokenStore();
  const timeFilters: TimeFilter[] = ['30m', '1h'];

  return (
    <div className="bg-background border-b border-gray-800">
      <div className="p-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-cyan-400">💎</span>
            <span className="text-white font-medium">Chad Bags Only</span>
            {isPaused && (
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-md
                             bg-cyan-500/20 text-cyan-400`}
              >
               <Pause size={14} />
                <span className="text-sm font-medium">PAUSE</span>
              </div>
            )}
          </div>

          {onSearchChange && (
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by address..."
                className="w-96 pl-9 pr-8 py-1.5 rounded-lg bg-surface/50
                         text-white placeholder-gray-400 text-sm
                         border border-gray-700/50 focus:border-cyan-500/30
                         focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
              />
              {searchTerm && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                           text-gray-400 hover:text-cyan-400
                           transition-colors duration-200"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Time Filters */}
        <div className="flex space-x-2">
          {timeFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => onTimeFilterChange(filter)}
              className={`px-4 py-1.5 rounded-lg transition-all duration-200
                       ${timeFilter === filter 
                         ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30' 
                         : 'bg-surface/50 text-gray-300 hover:bg-surface/80 hover:text-white'}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}