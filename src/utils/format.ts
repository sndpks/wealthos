export function formatCurrency(value: number, compact = false): string {
  const n = Number(value) || 0;

  if (compact && Math.abs(n) >= 100000) {
    return `₹${(n / 100000).toFixed(1)}L`;
  }

  return `₹${n.toLocaleString('en-IN')}`;
}

export function formatPercent(value: number, digits = 1): string {
  return `${Number(value).toFixed(digits)}%`;
}
