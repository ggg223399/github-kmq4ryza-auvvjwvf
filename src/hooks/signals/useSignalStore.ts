import { create } from 'zustand';
import type { Signal } from '../../types/signal';

interface SignalStore {
  signals: Signal[];
  addSignal: (signal: Signal) => void;
  clearSignals: () => void;
  isPaused: boolean;
  setPaused: (paused: boolean) => void;
}

export const useSignalStore = create<SignalStore>((set) => ({
  signals: [],
  isPaused: false,

  addSignal: (signal) => {
    set((state) => {
      if (state.isPaused) return state;
      return {
        signals: [signal, ...state.signals]
      };
    });
  },

  clearSignals: () => {
    set({ signals: [] });
  },

  setPaused: (isPaused) => {
    set({ isPaused });
  }
}));