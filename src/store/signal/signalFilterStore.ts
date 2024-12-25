import { create } from 'zustand';

interface SignalFilterStore {
  tradeType: 'all' | 'buy' | 'sell';
  setTradeType: (type: 'all' | 'buy' | 'sell') => void;
}

export const useSignalFilterStore = create<SignalFilterStore>((set) => ({
  tradeType: 'all',
  setTradeType: (tradeType) => set({ tradeType })
}));