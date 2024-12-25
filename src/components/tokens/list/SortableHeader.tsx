import React, { useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Filter } from 'lucide-react';
import { FilterDropdown } from '../filters/FilterDropdown';
import { useFilterStore } from '../../../store/filter/filterStore';
import type { SortDirection } from '../../../types/sort';
import type { FilterType } from '../../../types/filter';

interface SortableHeaderProps {
  label: string;
  sortKey: string;
  currentSort: string | null;
  direction: SortDirection;
  onSort: (key: string) => void;
  filterType?: FilterType;
}

export function SortableHeader({
  label,
  sortKey,
  currentSort,
  direction,
  onSort,
  filterType
}: SortableHeaderProps) {
  const [showFilter, setShowFilter] = useState(false);
  const { filters, setFilter } = useFilterStore();
  const isActive = currentSort === sortKey;
  const hasActiveFilter = filterType && filters[filterType];

  const getSortIcon = () => {
    if (!isActive) {
      return <ArrowUpDown size={14} className="text-gray-400 group-hover:text-cyan-400" />;
    }
    return direction === 'desc' 
      ? <ArrowDown size={14} className="text-cyan-400" />
      : <ArrowUp size={14} className="text-cyan-400" />;
  };

  return (
    <div className="flex items-center justify-end space-x-2">
      <button
        onClick={() => onSort(sortKey)}
        className="flex items-center space-x-2 group"
      >
        <span className={`text-sm transition-colors duration-200
          ${isActive ? 'text-cyan-400' : 'text-gray-400 group-hover:text-gray-300'}`}
        >
          {label}
        </span>
        <span className="transition-transform duration-200">
          {getSortIcon()}
        </span>
      </button>

      {filterType && (
        <div className="relative">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`p-1 rounded-md transition-colors duration-200
                     ${hasActiveFilter 
                       ? 'bg-cyan-500/20 text-cyan-400' 
                       : 'text-gray-400 hover:text-cyan-400 hover:bg-surface/80'}`}
          >
            <Filter size={14} />
          </button>

          <FilterDropdown
            type={filterType}
            isOpen={showFilter}
            onClose={() => setShowFilter(false)}
            currentFilter={filters[filterType]}
            onApply={(filter) => {
              setFilter(filterType, filter);
              setShowFilter(false);
            }}
          />
        </div>
      )}
    </div>
  );
}