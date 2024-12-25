import React from 'react';
import { useFilterStore } from '../../../store/filter/filterStore';

export function TokenListEmpty() {
  const { hasActiveFilters, resetAllFilters } = useFilterStore();

  return (
    <div className="flex flex-col items-center justify-center h-40 text-gray-400">
      <p className="mb-4">
        {hasActiveFilters() 
          ? 'No tokens match the current filters'
          : 'No tokens found'}
      </p>
      {hasActiveFilters() && (
        <button
          onClick={resetAllFilters}
          className="px-4 py-2 text-sm bg-cyan-500/20 text-cyan-400
                   rounded-lg hover:bg-cyan-500/30 transition-colors"
        >
          Reset All Filters
        </button>
      )}
    </div>
  );
}