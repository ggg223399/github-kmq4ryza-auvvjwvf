import axios from 'axios';
import type { SmartMoneyItem } from '../../types/smartMoney';

const API_HOST = import.meta.env.VITE_API_URL || 'https://api.dev.pump.space';

export async function getSmartMoneyList(): Promise<SmartMoneyItem[]> {
  try {
    if (!API_HOST) {
      throw new Error('API URL is not configured');
    }

    const response = await axios.get(`${API_HOST}/smart-money/list`);
    // Limit to 500 items
    return response.data.data.slice(0, 500);
  } catch (error) {
    console.error('Failed to fetch smart money list:', error);
    // Return empty array instead of throwing to prevent UI errors
    return [];
  }
}