export function formatAddress(address: string, length: number = 8): string {
  if (!address) return '';
  if (address.length <= length) return address;
  
  const start = address.slice(0, 6);
  const end = address.slice(-4);
  return `${start}...${end}`;
}

export function formatSmartMoneyName(address: string): string {
  return formatAddress(address, 10);
}