import { create } from 'zustand';
import type { TokenData } from '../../types/token';

const MAX_TOKENS = 50; // Limit list size for performance

interface TokenStore {
  tokens: TokenData[];
  isLoading: boolean;
  isPaused: boolean;
  newTokenAddress: string | null;
  setTokens: (tokens: TokenData[]) => void;
  addTokens: (newTokens: TokenData[]) => void;
  setLoading: (loading: boolean) => void;
  setPaused: (paused: boolean) => void;
}

export const useTokenStore = create<TokenStore>((set) => ({
  tokens: [],
  isLoading: true,
  isPaused: false,
  newTokenAddress: null,

  setTokens: (tokens) => set({ 
    tokens: tokens.slice(0, MAX_TOKENS) 
  }),

  addTokens: (newTokens) => set((state) => {
    if (state.isPaused) return state;

    // Create a map of existing tokens
    const tokenMap = new Map(state.tokens.map(t => [t.tokenAddress, t]));
    let newAddress: string | null = null;

    // Process new tokens
    newTokens.forEach(newToken => {
      if (!tokenMap.has(newToken.tokenAddress)) {
        newAddress = newToken.tokenAddress;
      }
      tokenMap.set(newToken.tokenAddress, newToken);
    });

    // Convert map back to array, with new tokens at the start
    const updatedTokens = [
      ...newTokens,
      ...state.tokens.filter(t => !newTokens.some(n => n.tokenAddress === t.tokenAddress))
    ].slice(0, MAX_TOKENS); // Limit total tokens

    // Clear animation after delay
    if (newAddress) {
      setTimeout(() => set({ newTokenAddress: null }), 600);
    }

    return {
      tokens: updatedTokens,
      newTokenAddress: newAddress
    };
  }),

  setLoading: (isLoading) => set({ isLoading }),
  setPaused: (paused) => set({ isPaused: paused })
}));