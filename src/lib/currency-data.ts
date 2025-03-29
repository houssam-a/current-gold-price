
export const currencySymbols: Record<string, string> = {
  USD: "US Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  JPY: "Japanese Yen",
  AUD: "Australian Dollar",
  CAD: "Canadian Dollar",
  CHF: "Swiss Franc",
  CNY: "Chinese Yuan",
  INR: "Indian Rupee",
  BTC: "Bitcoin",
  ETH: "Ethereum"
};

export const goldUnits = [
  { value: "gram", label: "Gram" },
  { value: "ounce", label: "Troy Ounce" },
  { value: "kilo", label: "Kilogram" }
];

export const timeframes = [
  { value: "1d", label: "1 Day" },
  { value: "1w", label: "1 Week" },
  { value: "1m", label: "1 Month" },
  { value: "6m", label: "6 Months" },
  { value: "1y", label: "1 Year" }
];

export const conversionFactors = {
  gram: 1,
  ounce: 31.1035,
  kilo: 1000
};

export const countries = [
  { code: "US", name: "United States", currency: "USD", flag: "🇺🇸" },
  { code: "EU", name: "European Union", currency: "EUR", flag: "🇪🇺" },
  { code: "GB", name: "United Kingdom", currency: "GBP", flag: "🇬🇧" },
  { code: "JP", name: "Japan", currency: "JPY", flag: "🇯🇵" },
  { code: "IN", name: "India", currency: "INR", flag: "🇮🇳" },
  { code: "AU", name: "Australia", currency: "AUD", flag: "🇦🇺" },
  { code: "CA", name: "Canada", currency: "CAD", flag: "🇨🇦" },
  { code: "CH", name: "Switzerland", currency: "CHF", flag: "🇨🇭" },
  { code: "CN", name: "China", currency: "CNY", flag: "🇨🇳" }
];
