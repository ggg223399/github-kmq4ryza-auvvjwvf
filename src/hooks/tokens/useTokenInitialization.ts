import { useEffect } from 'react';
import { useTokenStore } from '../../store/token/tokenStore';
import { fetchTokens } from '../../services/token/api';
import { formatTokenData } from '../../services/token/tokenFormatter';
import type { TimeFilter } from '../../types/token';

export function useTokenInitialization(timeFilter: TimeFilter) {
  const { setTokens, setLoading } = useTokenStore();

  useEffect(() => {
    async function initializeTokens() {
      setLoading(true);
      try {
        const tokens = await fetchTokens(timeFilter);
        const formattedTokens = await Promise.all(
          tokens.map(formatTokenData)
        );
        setTokens(formattedTokens);
      } catch (error) {
        console.error('Failed to initialize tokens:', error);
      } finally {
        setLoading(false);
      }
    }

    initializeTokens();
  }, [timeFilter, setTokens, setLoading]);
}