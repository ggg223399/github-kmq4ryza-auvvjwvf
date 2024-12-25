import axios from 'axios';
import type { TokenMetadata } from '../../types/token';

const IPFS_GATEWAY = 'https://ipfs.io/ipfs/';

export async function getTokenMetadata(uri: string): Promise<TokenMetadata | null> {
  try {
    if (!uri) return null;

    if (uri.includes(IPFS_GATEWAY)) {
      const hash = uri.replace(IPFS_GATEWAY, '');
      return await getIpfsMetadata(hash);
    }
    
    const { data } = await axios.get(uri);
    return {
      image: data.image || '',
      twitter: data.twitter || '',
      website: data.website || '',
      telegram: data.telegram || ''
    };
  } catch (error) {
    console.error('Failed to fetch token metadata:', error);
    return null;
  }
}

async function getIpfsMetadata(hash: string): Promise<TokenMetadata> {
  try {
    const { data } = await axios.get(`${IPFS_GATEWAY}${hash}`);
    return {
      image: data.image || '',
      twitter: data.twitter || '',
      website: data.website || '',
      telegram: data.telegram || ''
    };
  } catch (error) {
    console.error('Failed to fetch IPFS metadata:', error);
    return {
      image: '',
      twitter: '',
      website: '',
      telegram: ''
    };
  }
}