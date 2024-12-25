export function formatSmallDecimals(
  input: string | number,
  decimalPlaces: number = 4
): string {
  const suffixes = ["₀", "0₁", "0₂", "0₃", "0₄", "0₅", "0₆"];
  const decimalPart = String(input).split(".")[1];
  
  if (Number(input) < 0.0001 && Number(input) > 0 && decimalPart) {
    const zeroCount = decimalPart.match(/0+/);
    if (zeroCount) {
      const suffixIndex = Math.min(zeroCount[0].length, 6);
      return `0.${suffixes[suffixIndex]}${decimalPart
        .replace(/^0+/, "")
        .slice(0, decimalPlaces)}`;
    }
    return Number(input).toFixed(decimalPlaces);
  }
  return Number(input).toFixed(decimalPlaces);
}

export function formatPrice(price: string | number): string {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  return formatSmallDecimals(num, 4);
}