
// Mock data for development - in a production app, this would be replaced with real API calls
import { currencySymbols } from "./currency-data";

export type GoldPrice = {
  price: number;
  currency: string;
  symbol: string;
  timestamp: number;
  change: number;
  changePercentage: number;
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
  currency: string = "USD"
): Promise<GoldPrice> => {
  // In a real implementation, this would fetch from an API
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
  
  const basePrice = 2150.50; // Base price in USD
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
  
  const price = basePrice * (rates[currency] || 1);
  const change = ((Math.random() * 20) - 10); // Random change between -10 and 10
  
  return {
    price: Number(price.toFixed(2)),
    currency,
    symbol: getSymbolForCurrency(currency),
    timestamp: Date.now(),
    change: Number(change.toFixed(2)),
    changePercentage: Number((change / price * 100).toFixed(2))
  };
};

// Get gold price history for a specific currency
export const getGoldPriceHistory = async (
  currency: string = "USD", 
  period: "1d" | "1w" | "1m" | "6m" | "1y" = "1m"
): Promise<GoldPriceHistory[]> => {
  // In a real implementation, this would fetch from an API
  await new Promise((resolve) => setTimeout(resolve, 700)); // Simulate API delay

  const basePrice = 2150.50;
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
  
  const conversionRate = rates[currency] || 1;
  const dataPoints = period === "1d" ? 24 : period === "1w" ? 7 : period === "1m" ? 30 : period === "6m" ? 180 : 365;
  const data: GoldPriceHistory[] = [];
  
  // Generate mock historical data
  for (let i = dataPoints; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Create some realistic price variations
    const variation = ((Math.sin(i / 10) * 100) + (Math.random() * 50 - 25));
    const price = (basePrice + variation) * conversionRate;
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: Number(price.toFixed(2))
    });
  }
  
  return data;
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
