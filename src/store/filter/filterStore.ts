import { create } from 'zustand';
import type { FilterStore, FilterType, FilterState } from '../../types/filter';

export const useFilterStore = create<FilterStore>((set, get) => ({
  filters: {
    smartMoney: null,
    avgBuyMc: null,
    holders: null
  },

  setFilter: (type, filter) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [type]: filter
      }
    }));
  },

  resetFilter: (type) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [type]: null
      }
    }));
  },

  resetAllFilters: () => {
    set({
      filters: {
        smartMoney: null,
        avgBuyMc: null,
        holders: null
      }
    });
  },

  hasActiveFilters: () => {
    const { filters } = get();
    return Object.values(filters).some(filter => filter !== null);
  }
}));