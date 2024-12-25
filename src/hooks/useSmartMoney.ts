import { useSmartMoneyData } from './smartMoney/useSmartMoneyData';

export function useSmartMoney() {
  const { wallets, isLoading, error } = useSmartMoneyData();
  
  return {
    wallets,
    isLoading,
    error
  };
}