import { nanoid } from 'nanoid';
import type { TokenDataItem } from '../../types/token';

// Helper functions
const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;
const randomInt = (min: number, max: number) => Math.floor(randomRange(min, max));

export function generateMockTokenData(): TokenDataItem {
  // Generate realistic token data
  const price = randomRange(0.00001, 0.001);
  const supply = 1_000_000_000;
  const marketCap = price * supply;
  const smartMoneyCount = randomInt(1, 5);
  const buyTxCount = randomInt(1, 20);
  const sellTxCount = randomInt(0, 10);

  return {
    chain: "solana",
    tokenAddress: `${nanoid()}`, // Simulated token address
    symbol: `TOKEN${randomInt(1000, 9999)}`,
    twitter: `https://twitter.com/token${randomInt(1000, 9999)}`,
    telegram: `https://t.me/token${randomInt(1000, 9999)}`,
    website: `https://token${randomInt(1000, 9999)}.com`,
    icon: '',
    uri: `https://ipfs.io/ipfs/Qm${nanoid(44)}`,
    smartMoneyAccountNumber: smartMoneyCount,
    buyingDirection: Math.random() > 0.5 ? 1 : -1,
    avgBuyMarketCap: marketCap,
    avgPrice: price,
    buyTotalCost: randomRange(1, 10),
    buyTokenAmount: randomRange(100000, 1000000),
    buyTxCount,
    sellTotalCost: randomRange(0.5, 5),
    sellTokenAmount: randomRange(50000, 500000),
    sellTxCount,
    supply,
    price,
    holder: randomInt(100, 2000),
    details: [{
      user: nanoid(),
      buyCost: randomRange(0.1, 1),
      holding: randomRange(10000, 100000),
      firstTimestamp: Date.now() - randomInt(0, 86400000),
      lastTimestamp: Date.now()
    }]
  };
}