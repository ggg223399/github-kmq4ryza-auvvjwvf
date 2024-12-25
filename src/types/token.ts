// Add enum for token ranges
export enum TokenRange {
  Token30mins = "token30mins",
  Token1hour = "token1hour"
}

// Update TimeFilter type to match ranges
export type TimeFilter = '30m' | '1h';

// Map TimeFilter to TokenRange
export const timeFilterToRange: Record<TimeFilter, TokenRange> = {
  '30m': TokenRange.Token30mins,
  '1h': TokenRange.Token1hour
};