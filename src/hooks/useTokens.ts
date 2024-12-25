import { useState, useEffect, useCallback } from 'react';
import { TokenAPI, WSDataType } from '../services/TokenAPI';
import { mockWebSocketMessage } from '../mock/mockWebSocketData';
import type { TokenData, TimeFilter } from '../types/token';

export function useTokens() {
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('30m');
  const [isLoading, setIsLoading] = useState(true);
  const [newTokenAddress, setNewTokenAddress] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Initial data load from API
  useEffect(() => {
    const loadTokens = async () => {
      setIsLoading(true);
      try {
        const range = timeFilter === '30m' ? WSDataType.Token30mins : WSDataType.Token1hour;
        const data = await TokenAPI.getTokens(range);
        setTokens(data);
      } catch (error) {
        console.error('Failed to load tokens:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTokens();
  }, [timeFilter]);

  // Mock WebSocket updates
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const message = mockWebSocketMessage;
      if (message.type === 'trade' && Array.isArray(message.data)) {
        const trade = message.data[0];
        
        const newToken: TokenData = {
          chain: "solana",
          tokenAddress: trade.tokenIn,
          symbol: trade.symbol,
          uri: trade.uri,
          smartMoneyAccountNumber: Math.floor(Math.random() * 5) + 1,
          buyingDirection: Math.random() > 0.5 ? 1 : -1,
          avgBuyMarketCap: parseFloat(trade.nativeTokenPrice) * trade.baseTokenSupplied,
          avgPrice: parseFloat(trade.nativeTokenPrice),
          buyTotalCost: trade.isBuy ? trade.tokenOutAmount / 1e9 : 0,
          buyTokenAmount: trade.tokenInAmount,
          buyTxCount: trade.isBuy ? 1 : 0,
          sellTotalCost: !trade.isBuy ? trade.tokenOutAmount / 1e9 : 0,
          sellTokenAmount: trade.tokenInAmount,
          sellTxCount: !trade.isBuy ? 1 : 0,
          supply: trade.baseTokenSupplied,
          price: trade.nativeTokenPrice,
          holder: Math.floor(Math.random() * 1000) + 100,
          details: [{
            user: trade.user,
            buyCost: trade.isBuy ? trade.tokenOutAmount / 1e9 : 0,
            holding: trade.tokenInAmount,
            firstTimestamp: trade.timestamp,
            lastTimestamp: trade.timestamp
          }]
        };

        setTokens(currentTokens => {
          // Create a map of current tokens for quick lookup
          const tokenMap = new Map(currentTokens.map(t => [t.tokenAddress, t]));
          
          // If token is new or has updates
          if (!tokenMap.has(newToken.tokenAddress)) {
            setNewTokenAddress(newToken.tokenAddress);
            setTimeout(() => setNewTokenAddress(null), 600);
            
            // Add new token to the beginning
            return [newToken, ...currentTokens];
          }
          
          // Update existing token
          tokenMap.set(newToken.tokenAddress, newToken);
          return Array.from(tokenMap.values());
        });
      }
    }, 5000); // Simulate message every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleTimeFilterChange = useCallback((newFilter: TimeFilter) => {
    setTimeFilter(newFilter);
  }, []);

  return {
    tokens,
    timeFilter,
    setTimeFilter: handleTimeFilterChange,
    isLoading,
    newTokenAddress,
    isPaused,
    setIsPaused
  };
}