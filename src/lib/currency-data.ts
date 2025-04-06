
// Updated currency and country data with accurate information
// Countries are sorted by region for better organization

export const currencySymbols: { [key: string]: string } = {
  USD: "US Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  JPY: "Japanese Yen",
  AUD: "Australian Dollar",
  CAD: "Canadian Dollar",
  CHF: "Swiss Franc",
  CNY: "Chinese Yuan",
  MAD: "Moroccan Dirham",
  AED: "UAE Dirham",
  SAR: "Saudi Riyal",
  EGP: "Egyptian Pound",
  TRY: "Turkish Lira",
  DZD: "Algerian Dinar",
  TND: "Tunisian Dinar",
  QAR: "Qatari Riyal",
  KWD: "Kuwaiti Dinar",
  OMR: "Omani Rial",
  BHD: "Bahraini Dinar",
  JOD: "Jordanian Dinar",
  LBP: "Lebanese Pound",
  IQD: "Iraqi Dinar",
  LYD: "Libyan Dinar",
  INR: "Indian Rupee",
  RUB: "Russian Ruble",
  BRL: "Brazilian Real",
  MXN: "Mexican Peso",
  ZAR: "South African Rand",
  SGD: "Singapore Dollar",
  HKD: "Hong Kong Dollar",
  KRW: "South Korean Won",
  IDR: "Indonesian Rupiah",
  MYR: "Malaysian Ringgit",
  THB: "Thai Baht",
  PHP: "Philippine Peso",
  VND: "Vietnamese Dong",
  NGN: "Nigerian Naira",
  BTC: "Bitcoin",
  ETH: "Ethereum"
};

// Updated countries list with flags
export const countries = [
  // Middle East and North Africa
  { code: "MA", name: "Morocco", currency: "MAD", flag: "🇲🇦" },
  { code: "EG", name: "Egypt", currency: "EGP", flag: "🇪🇬" },
  { code: "SA", name: "Saudi Arabia", currency: "SAR", flag: "🇸🇦" },
  { code: "AE", name: "United Arab Emirates", currency: "AED", flag: "🇦🇪" },
  { code: "QA", name: "Qatar", currency: "QAR", flag: "🇶🇦" },
  { code: "KW", name: "Kuwait", currency: "KWD", flag: "🇰🇼" },
  { code: "BH", name: "Bahrain", currency: "BHD", flag: "🇧🇭" },
  { code: "OM", name: "Oman", currency: "OMR", flag: "🇴🇲" },
  { code: "DZ", name: "Algeria", currency: "DZD", flag: "🇩🇿" },
  { code: "TN", name: "Tunisia", currency: "TND", flag: "🇹🇳" },
  { code: "JO", name: "Jordan", currency: "JOD", flag: "🇯🇴" },
  { code: "LB", name: "Lebanon", currency: "LBP", flag: "🇱🇧" },
  { code: "IQ", name: "Iraq", currency: "IQD", flag: "🇮🇶" },
  { code: "LY", name: "Libya", currency: "LYD", flag: "🇱🇾" },
  
  // Europe
  { code: "EU", name: "European Union", currency: "EUR", flag: "🇪🇺" },
  { code: "GB", name: "United Kingdom", currency: "GBP", flag: "🇬🇧" },
  { code: "CH", name: "Switzerland", currency: "CHF", flag: "🇨🇭" },
  { code: "TR", name: "Turkey", currency: "TRY", flag: "🇹🇷" },
  { code: "RU", name: "Russia", currency: "RUB", flag: "🇷🇺" },
  
  // Americas
  { code: "US", name: "United States", currency: "USD", flag: "🇺🇸" },
  { code: "CA", name: "Canada", currency: "CAD", flag: "🇨🇦" },
  { code: "BR", name: "Brazil", currency: "BRL", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", currency: "MXN", flag: "🇲🇽" },
  
  // Asia Pacific
  { code: "JP", name: "Japan", currency: "JPY", flag: "🇯🇵" },
  { code: "CN", name: "China", currency: "CNY", flag: "🇨🇳" },
  { code: "IN", name: "India", currency: "INR", flag: "🇮🇳" },
  { code: "AU", name: "Australia", currency: "AUD", flag: "🇦🇺" },
  { code: "SG", name: "Singapore", currency: "SGD", flag: "🇸🇬" },
  { code: "HK", name: "Hong Kong", currency: "HKD", flag: "🇭🇰" },
  { code: "KR", name: "South Korea", currency: "KRW", flag: "🇰🇷" },
  { code: "ID", name: "Indonesia", currency: "IDR", flag: "🇮🇩" },
  { code: "MY", name: "Malaysia", currency: "MYR", flag: "🇲🇾" },
  { code: "TH", name: "Thailand", currency: "THB", flag: "🇹🇭" },
  { code: "PH", name: "Philippines", currency: "PHP", flag: "🇵🇭" },
  { code: "VN", name: "Vietnam", currency: "VND", flag: "🇻🇳" },
  
  // Africa
  { code: "ZA", name: "South Africa", currency: "ZAR", flag: "🇿🇦" },
  { code: "NG", name: "Nigeria", currency: "NGN", flag: "🇳🇬" },
  
  // Crypto
  { code: "BTC", name: "Bitcoin", currency: "BTC", flag: "₿" },
  { code: "ETH", name: "Ethereum", currency: "ETH", flag: "Ξ" }
];

// Gold units with display options
export const goldUnits = [
  { value: "gram", label: "Gram" },
  { value: "ounce", label: "Troy Ounce" },
  { value: "kilo", label: "Kilogram" }
];

// Common conversions
export const commonConversions = [
  { from: "USD", to: "EUR" },
  { from: "EUR", to: "USD" },
  { from: "GBP", to: "EUR" },
  { from: "USD", to: "JPY" },
  { from: "EUR", to: "GBP" }
];

// Updated conversion factors for gold weights
export const conversionFactors = {
  gram: 1,
  ounce: 31.1035, // Troy ounce
  kilo: 1000,
};
