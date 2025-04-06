// Gold Currency API integration
import { fetchGoldPrice, fetchGoldPriceHistory, getGoldPriceByPurity } from './goldApi';
import { currencySymbols } from "./currency-data";

export type GoldPrice = {
  price: number;
  currency: string;
  symbol: string;
  timestamp: number;
  change: number;
  changePercentage: number;
  purity?: string;
  yesterdayPrice?: number;
};

export type GoldPriceHistory = {
  date: string;
  price: number;
};

export type Currency = {
  code: string;
  name: string;
  symbol: string;
  flag?: string;
};

export type ExchangeRate = {
  from: string;
  to: string;
  rate: number;
  timestamp: number;
};

// Get current gold price for a specific currency
export const getGoldPrice = async (
  currency: string = "USD",
  purity: string = "24k"
): Promise<GoldPrice> => {
  return await getGoldPriceByPurity(currency, purity);
};

// Get gold price history for a specific currency
export const getGoldPriceHistory = async (
  currency: string = "USD", 
  period: "1d" | "1w" | "1m" | "6m" | "1y" = "1m"
): Promise<GoldPriceHistory[]> => {
  return await fetchGoldPriceHistory(currency, period);
};

// Get available currencies
export const getCurrencies = async (): Promise<Currency[]> => {
  // In a real implementation, this would fetch from an API
  await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate API delay
  
  return Object.entries(currencySymbols).map(([code, name]) => ({
    code,
    name,
    symbol: getSymbolForCurrency(code)
  }));
};

// Get exchange rate between two currencies
export const getExchangeRate = async (
  from: string,
  to: string
): Promise<ExchangeRate> => {
  // In a real implementation, this would fetch from an API
  await new Promise((resolve) => setTimeout(resolve, 400)); // Simulate API delay

  const rates: Record<string, number> = {
    USD: 1,
    EUR: 0.93,
    GBP: 0.79,
    JPY: 151.67,
    INR: 83.12,
    AUD: 1.52,
    CAD: 1.36,
    CHF: 0.90,
    CNY: 7.24,
    MAD: 10.08,
    AED: 3.67,
    SAR: 3.75,
    EGP: 30.92,
    TRY: 32.19,
    RUB: 91.75,
    BRL: 5.05,
    MXN: 16.75,
    ZAR: 18.30,
    SGD: 1.35,
    HKD: 7.82,
    BTC: 0.000033,
    ETH: 0.00045
  };
  
  const fromRate = rates[from] || 1;
  const toRate = rates[to] || 1;
  const rate = toRate / fromRate;
  
  return {
    from,
    to,
    rate: Number(rate.toFixed(6)),
    timestamp: Date.now()
  };
};

// Convert currency
export const convertCurrency = async (
  amount: number,
  from: string,
  to: string
): Promise<number> => {
  const exchangeRate = await getExchangeRate(from, to);
  return Number((amount * exchangeRate.rate).toFixed(2));
};

// Helper function to get currency symbol
function getSymbolForCurrency(code: string): string {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    INR: '₹',
    AUD: 'A$',
    CAD: 'C$',
    CHF: 'CHF',
    CNY: '¥',
    MAD: 'د.م.',
    AED: 'د.إ',
    SAR: '﷼',
    EGP: 'E£',
    TRY: '₺',
    RUB: '₽',
    BRL: 'R$',
    MXN: '$',
    ZAR: 'R',
    SGD: 'S$',
    HKD: 'HK$',
    BTC: '₿',
    ETH: 'Ξ'
  };
  
  return symbols[code] || code;
}
