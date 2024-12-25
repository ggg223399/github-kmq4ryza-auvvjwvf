import { formatNumber } from '../../utils/format/number';
import { formatPrice } from '../../utils/format/price';
import { getTokenMetadata } from './metadata';
import type { TokenData, TokenDataItem } from '../../types/token';

export async function formatTokenData(token: TokenDataItem): Promise<TokenData> {
  // Calculate market cap
  const marketCap = token.supply * parseFloat(token.price);

  // Format all numeric values
  const formattedValues = {
    avgBuyMarketCap: `$${formatNumber(token.avgBuyMarketCap)}`,
    avgPrice: formatPrice(token.avgPrice),
    buyTotalCost: formatNumber(token.buyTotalCost),
    buyTokenAmount: formatNumber(token.buyTokenAmount),
    sellTotalCost: formatNumber(token.sellTotalCost),
    sellTokenAmount: formatNumber(token.sellTokenAmount),
    marketCap: `$${formatNumber(marketCap)}`,
    holders: token.holder < 1000 ? token.holder.toString() : formatNumber(token.holder)
  };

  // Get metadata if URI exists
  let metadata = {
    image: token.icon || '',
    twitter: token.twitter || '',
    website: token.website || '',
    telegram: token.telegram || ''
  };

  // If URI exists and metadata is missing, try to fetch from URI
  if (token.uri && (!metadata.image || !metadata.twitter || !metadata.website || !metadata.telegram)) {
    const uriMetadata = await getTokenMetadata(token.uri);
    if (uriMetadata) {
      metadata = {
        image: metadata.image || uriMetadata.image || '',
        twitter: metadata.twitter || uriMetadata.twitter || '',
        website: metadata.website || uriMetadata.website || '',
        telegram: metadata.telegram || uriMetadata.telegram || ''
      };
    }
  }

  return {
    ...token,
    marketCap,
    formattedValues,
    metadata
  };
}