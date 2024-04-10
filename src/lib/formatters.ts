const CurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "INR",
});

export function formatCurrency(value: number): string {
  return CurrencyFormatter.format(value);
}

const NumberFormatter = new Intl.NumberFormat("en-US");

export function formatNumber(value: number): string {
  return NumberFormatter.format(value);
}

export function formatPercent(value: number): string {
  return `${value}%`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US").format(date);
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}
