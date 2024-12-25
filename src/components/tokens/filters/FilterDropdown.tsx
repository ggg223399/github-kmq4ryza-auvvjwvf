import React, { useState, useEffect } from 'react';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { filterConfigs } from '../../../config/filters';
import type { FilterState, FilterType } from '../../../types/filter';

interface FilterDropdownProps {
  type: FilterType;
  isOpen: boolean;
  onClose: () => void;
  currentFilter: FilterState | null;
  onApply: (filter: FilterState | null) => void;
}

export function FilterDropdown({
  type,
  isOpen,
  onClose,
  currentFilter,
  onApply
}: FilterDropdownProps) {
  const ref = useClickOutside<HTMLDivElement>(onClose);
  const config = filterConfigs[type];
  const [tempFilter, setTempFilter] = useState<FilterState | null>(currentFilter);
  const [minValue, setMinValue] = useState(currentFilter?.min?.toString() || '');
  const [maxValue, setMaxValue] = useState(
    currentFilter?.max === Infinity ? '' : currentFilter?.max?.toString() || ''
  );

  // Reset local state when currentFilter changes
  useEffect(() => {
    setTempFilter(currentFilter);
    setMinValue(currentFilter?.min?.toString() || '');
    setMaxValue(currentFilter?.max === Infinity ? '' : currentFilter?.max?.toString() || '');
  }, [currentFilter]);

  if (!isOpen || !config) return null;

  const handlePresetClick = (value: number) => {
    setTempFilter({
      type: 'preset',
      value
    });
  };

  const handleRangeChange = (min: string, max: string) => {
    setMinValue(min);
    setMaxValue(max);
    if (min || max) {
      setTempFilter({
        type: 'range',
        min: min ? parseFloat(min) : 0,
        max: max ? parseFloat(max) : Infinity
      });
    } else {
      setTempFilter(null);
    }
  };

  const handleReset = () => {
    setMinValue('');
    setMaxValue('');
    setTempFilter(null);
    onApply(null); // Immediately apply reset
    onClose();
  };

  const handleApply = () => {
    onApply(tempFilter);
    onClose();
  };

  return (
    <div 
      ref={ref}
      className="absolute right-0 top-full mt-2 w-48 z-50 bg-surface
                 border border-gray-700 rounded-lg shadow-lg animate-in fade-in"
    >
      {/* Preset Filters */}
      <div className="p-2 space-y-1">
        {config.presets.map((preset) => (
          <button
            key={preset.value}
            onClick={() => handlePresetClick(preset.value)}
            className={`w-full px-3 py-1.5 text-sm text-left rounded-md
                     transition-colors duration-200
                     ${tempFilter?.type === 'preset' && tempFilter.value === preset.value
                       ? 'bg-cyan-500/20 text-cyan-400' 
                       : 'text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400'}`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Custom Range */}
      <div className="p-2 border-t border-gray-700">
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={minValue}
            onChange={(e) => handleRangeChange(e.target.value, maxValue)}
            placeholder="0"
            className="w-16 px-2 py-1 text-sm bg-background text-white
                     border border-gray-700 rounded-md focus:border-cyan-500/50
                     focus:outline-none"
          />
          <span className="text-gray-400">to</span>
          <input
            type="number"
            value={maxValue}
            onChange={(e) => handleRangeChange(minValue, e.target.value)}
            placeholder="∞"
            className="w-16 px-2 py-1 text-sm bg-background text-white
                     border border-gray-700 rounded-md focus:border-cyan-500/50
                     focus:outline-none"
          />
          {config.suffix && (
            <span className="text-xs text-gray-400">{config.suffix}</span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between p-2 border-t border-gray-700">
        <button
          onClick={handleReset}
          className="px-3 py-1 text-sm text-gray-400 hover:text-white
                   transition-colors duration-200"
        >
          Reset
        </button>
        <button
          onClick={handleApply}
          disabled={!tempFilter && !currentFilter}
          className={`px-3 py-1 text-sm rounded-md transition-colors duration-200
                   ${(!tempFilter && !currentFilter)
                     ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                     : 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'}`}
        >
          Apply
        </button>
      </div>
    </div>
  );
}