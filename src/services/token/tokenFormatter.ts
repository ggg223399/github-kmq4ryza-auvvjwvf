import numeral from 'numeral';
import { formatPrice } from '../../utils/format/price';
import { getTokenMetadata } from './metadata';
import type { TokenData, TokenDataItem } from '../../types/token';

export async function formatTokenData(token: TokenDataItem): Promise<TokenData> {
  // Calculate market cap
  const marketCap = token.supply * token.price;

  // Format all numeric values
  const formattedValues = {
    avgBuyMarketCap: numeral(token.avgBuyMarketCap).format("$0,0.0a").toUpperCase(),
    avgPrice: formatPrice(token.avgPrice),
    buyTotalCost: numeral(token.buyTotalCost).format("0,0.0a").toUpperCase(),
    buyTokenAmount: numeral(token.buyTokenAmount).format("0,0a").toUpperCase(),
    sellTotalCost: numeral(token.sellTotalCost).format("0,0.0a").toUpperCase(),
    sellTokenAmount: numeral(token.sellTokenAmount).format("0,0a").toUpperCase(),
    marketCap: numeral(marketCap).format("$0,0.0a").toUpperCase(),
    holders: token.holder < 1000 
      ? numeral(token.holder).format("0")
      : numeral(token.holder).format("0,0.0a").toUpperCase()
  };

  // Initialize metadata with token data
  let metadata = {
    image: token.icon || '',
    twitter: token.twitter || '',
    website: token.website || '',
    telegram: token.telegram || ''
  };

  // Fetch metadata from URI if needed
  if (token.uri && (!metadata.image || !metadata.twitter || !metadata.website || !metadata.telegram)) {
    try {
      const uriMetadata = await getTokenMetadata(token.uri);
      if (uriMetadata) {
        metadata = {
          image: metadata.image || uriMetadata.image || '',
          twitter: metadata.twitter || uriMetadata.twitter || '',
          website: metadata.website || uriMetadata.website || '',
          telegram: metadata.telegram || uriMetadata.telegram || ''
        };
      }
    } catch (error) {
      console.error('Failed to fetch token metadata:', error);
    }
  }

  return {
    ...token,
    marketCap,
    formattedValues,
    metadata,
    // Add formatted amounts for direct access
    buyTokenAmountFormatted: formattedValues.buyTokenAmount,
    sellTokenAmountFormatted: formattedValues.sellTokenAmount
  };
}