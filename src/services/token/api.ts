import axios from 'axios';
import type { TokenDataItem, TimeFilter, TokenRange } from '../../types/token';
import { timeFilterToRange } from '../../types/token';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.dev.pump.space';

export async function fetchTokens(timeFilter: TimeFilter): Promise<TokenDataItem[]> {
  try {
    if (!API_URL) {
      throw new Error('API URL is not configured');
    }

    const range = timeFilterToRange[timeFilter];
    const response = await axios.get(`${API_URL}/tokens?range=${range}`);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch tokens:', error);
    // Return empty array instead of throwing to prevent UI errors
    return [];
  }
}