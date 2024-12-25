export function formatNumber(input: string | number, decimalPlaces: number = 2): string {
  const num = typeof input === 'string' ? parseFloat(input) : input;
  
  if (num < 0.0001) {
    return formatSmallDecimals(num);
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(decimalPlaces) + "M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(decimalPlaces) + "K";
  } else {
    return num.toFixed(decimalPlaces);
  }
}

export function formatDecimal(value: string | number, decimals: number = 2): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return num.toFixed(decimals);
}