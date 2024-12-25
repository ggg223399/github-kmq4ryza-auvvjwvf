import { useState, useEffect, useMemo } from 'react';
import { getSmartMoneyList } from '../../services/api/smartMoney';
import type { SmartMoneyWallet } from '../../types/smartMoney';

export function useSmartMoneyData() {
  const [wallets, setWallets] = useState<SmartMoneyWallet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSmartMoney() {
      try {
        setIsLoading(true);
        const data = await getSmartMoneyList();
        
        const formattedWallets: SmartMoneyWallet[] = data.map(item => ({
          address: item.user,
          name: item.userName || null,
          score: item.score
        }));
        
        // Sort by score in descending order
        const sortedWallets = formattedWallets.sort((a, b) => b.score - a.score);
        
        setWallets(sortedWallets);
        setError(null);
      } catch (err) {
        setError('Failed to load smart money data');
        console.error('Smart money fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSmartMoney();
  }, []);

  // Keep wallets sorted even after filtering
  const sortedWallets = useMemo(() => {
    return [...wallets].sort((a, b) => b.score - a.score);
  }, [wallets]);

  return { wallets: sortedWallets, isLoading, error };
}