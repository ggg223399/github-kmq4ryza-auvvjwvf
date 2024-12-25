import numeral from 'numeral';

export function formatNumber(input: string | number): string {
  const num = typeof input === 'string' ? parseFloat(input) : input;
  
  if (num >= 1_000_000) {
    return numeral(num).format('0.0a').toUpperCase();
  }
  if (num >= 1_000) {
    return numeral(num).format('0.0a').toUpperCase();
  }
  if (num < 0.0001) {
    return '<0.0001';
  }
  return numeral(num).format('0,0.00');
}

export function formatDecimal(value: string | number, decimals: number = 2): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return numeral(num).format(`0,0.${'0'.repeat(decimals)}`);
}