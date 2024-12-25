import { useEffect } from 'react';
import { TokenApi } from '../services/token/tokenApi';
import { useTokenStore } from '../store/token/tokenStore';
import { formatTokenData } from '../services/token/tokenFormatter';
import type { TimeFilter } from '../types/token';

export function useTokenList(timeFilter: TimeFilter) {
  const { setTokens, setLoading } = useTokenStore();

  // Load initial tokens via HTTP
  useEffect(() => {
    async function loadInitialTokens() {
      setLoading(true);
      try {
        const tokens = await TokenApi.getInitialTokens(timeFilter);
        const formattedTokens = await Promise.all(
          tokens.map(formatTokenData)
        );
        setTokens(formattedTokens);
      } catch (error) {
        console.error('Failed to load initial tokens:', error);
      } finally {
        setLoading(false);
      }
    }

    loadInitialTokens();
  }, [timeFilter, setTokens, setLoading]);
}