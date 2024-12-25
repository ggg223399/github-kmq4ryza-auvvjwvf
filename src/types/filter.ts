export type FilterType = 'smartMoney' | 'avgBuyMc' | 'holders';

export interface FilterPreset {
  label: string;
  value: number;
}

export interface FilterConfig {
  type: FilterType;
  presets: FilterPreset[];
  suffix?: string;
}

export interface FilterState {
  type: 'preset' | 'range';
  value?: number;
  min?: number;
  max?: number;
}

export interface FilterStore {
  filters: Record<FilterType, FilterState | null>;
  setFilter: (type: FilterType, filter: FilterState | null) => void;
  resetFilter: (type: FilterType) => void;
  resetAllFilters: () => void;
}