import { generateMockTokenData } from './websocket/mockTokenData';

// Generate initial mock tokens
const initialTokens = Array.from({ length: 10 }, generateMockTokenData);

export const mockTokenResponse = {
  type: 'token30mins',
  data: initialTokens
};