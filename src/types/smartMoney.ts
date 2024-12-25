export interface SmartMoneyItem {
  user: string;
  userName: string;
  score: number;
}

export interface SmartMoneyWallet {
  address: string;
  name: string | null;
  score: number;
}