import React from 'react';

interface TradingPlatformLinksProps {
  tokenAddress: string;
}

const tradingPlatforms = [
  { 
    id: 'gmgn',
    name: 'GMGN',
    icon: '/img-gmgn.png',
    getUrl: (address: string) => `https://t.me/GMGN_sol_bot?start=i_${address}`
  },
  {
    id: 'photon',
    name: 'Photon',
    icon: '/img-phanton.png',
    getUrl: (address: string) => `https://photon-sol.tinyastro.io/en/r/@phanes/${address}`
  },
  {
    id: 'bullx',
    name: 'Bullx',
    icon: '/img-bullx.png',
    getUrl: (address: string) => `https://bullx.io/terminal?chainId=1399811149&r=QKXBJ87T7E9&address=${address}`
  },
  {
    id: 'banana-gun',
    name: 'Banana Gun',
    icon: '/img-banana.png',
    getUrl: (address: string) => `https://t.me/BananaGun_bot?start=snp_phanes_${address}`
  },
  {
    id: 'maestro',
    name: 'Maestro',
    icon: '/img-meastro.png',
    getUrl: (address: string) => `https://t.me/MaestroBuyBot?start=${address}`
  },
  {
    id: 'sol-trading-bot',
    name: 'SOL Trading Bot',
    icon: '/img-sol-trading-bot.png',
    getUrl: (address: string) => `https://t.me/SolTradingBot?start=${address}`
  }
];

export function TradingPlatformLinks({ tokenAddress }: TradingPlatformLinksProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {tradingPlatforms.map((platform) => (
        <a
          key={platform.id}
          href={platform.getUrl(tokenAddress)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justifi-center space-x-2 p-2 rounded-lg
                   bg-surface/50 hover:bg-surface/80 
                  
                   transition-all duration-200 group"
        >
          <img 
            src={platform.icon} 
            alt={platform.name}
            className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity"
          />
          <span className="text-sm text-gray-400 group-hover:text-cyan-400">
            {platform.name}
          </span>
        </a>
      ))}
    </div>
  );
}