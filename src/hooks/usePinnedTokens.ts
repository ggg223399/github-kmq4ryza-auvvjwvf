import { create } from 'zustand';

interface PinnedTokensStore {
  pinnedTokens: Set<string>;
  togglePin: (tokenAddress: string) => void;
  isPinned: (tokenAddress: string) => boolean;
}

export const usePinnedTokens = create<PinnedTokensStore>((set, get) => ({
  pinnedTokens: new Set<string>(),
  togglePin: (tokenAddress: string) => {
    set((state) => {
      const newPinnedTokens = new Set(state.pinnedTokens);
      if (newPinnedTokens.has(tokenAddress)) {
        newPinnedTokens.delete(tokenAddress);
      } else {
        newPinnedTokens.add(tokenAddress);
      }
      return { pinnedTokens: newPinnedTokens };
    });
  },
  isPinned: (tokenAddress: string) => {
    return get().pinnedTokens.has(tokenAddress);
  }
}));