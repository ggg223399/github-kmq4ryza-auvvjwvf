import type { TokenDataItem, TimeFilter } from '../../types/token';

const API_HOST = import.meta.env.VITE_API_URL;

export enum WSDataType {
  Trade = "trade",
  Token30mins = "token30mins",
  Token1hour = "token1hour",
  Token6hours = "token6hours",
  Token1day = "token1day",
}

export class TokenApi {
  static async getInitialTokens(timeFilter: TimeFilter): Promise<TokenDataItem[]> {
    const range = timeFilter === '30m' ? WSDataType.Token30mins : WSDataType.Token1hour;
    
    try {
      const response = await fetch(`${API_HOST}/tokens?range=${range}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tokens');
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('TokenApi: Failed to fetch tokens', error);
      return [];
    }
  }
}