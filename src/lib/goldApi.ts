
// Gold API Service
// Using the Gold API (https://www.goldapi.io/)

// API configuration
const GOLD_API_BASE_URL = "https://www.goldapi.io/api";
const GOLD_API_KEY = "goldapi-demo-key"; // Using demo key for development - replace with your actual key in production

// Gold symbols mapping
const goldSymbols = {
  XAU: "gold", // Gold
  XAG: "silver", // Silver (if needed later)
};

// Unit conversion factors
export const conversionFactors = {
  gram: 1,
  ounce: 31.1035, // Troy ounce conversion
  kilo: 1000,
};

// Currencies mapping for API requests
const currencyCodes: Record<string, string> = {
  USD: "USD",
  EUR: "EUR",
  GBP: "GBP",
  JPY: "JPY",
  INR: "INR",
  AUD: "AUD",
  CAD: "CAD",
  CHF: "CHF",
  CNY: "CNY",
  // Add other currencies as needed
  // Some currencies may not be directly supported by the API
  // and may require conversion from a supported base currency
};

// Get current gold price
export const fetchGoldPrice = async (currency: string = "USD") => {
  try {
    // For demo purposes, we'll use a combination of real API call with fallback to maintain app functionality
    const currencyCode = currencyCodes[currency] || "USD";
    
    // Format the request URL
    const url = `${GOLD_API_BASE_URL}/XAU/${currencyCode}`;
    
    // Make the API request
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-access-token": GOLD_API_KEY,
        "Content-Type": "application/json",
      },
    });
    
    // If we get a successful response
    if (response.ok) {
      const data = await response.json();
      
      return {
        price: data.price,
        currency: currency,
        symbol: data.currency_symbol || getSymbolForCurrency(currency),
        timestamp: Date.now(),
        change: data.ch || 0,
        changePercentage: data.chp || 0,
      };
    } else {
      // If API call fails, fall back to mock data with notification
      console.warn("Using fallback mock data due to API limitation");
      return getFallbackGoldPrice(currency);
    }
  } catch (error) {
    console.error("Error fetching gold price:", error);
    // Fall back to mock data if API call fails
    return getFallbackGoldPrice(currency);
  }
};

// Get historical gold price data
export const fetchGoldPriceHistory = async (
  currency: string = "USD",
  period: "1d" | "1w" | "1m" | "6m" | "1y" = "1m"
) => {
  try {
    // Note: The free tier of Gold API doesn't support historical data
    // For a production app, upgrade to a paid plan or use another API that supports historical data
    // For now, we'll use the fallback mock data
    return getFallbackGoldPriceHistory(currency, period);
  } catch (error) {
    console.error("Error fetching gold price history:", error);
    return getFallbackGoldPriceHistory(currency, period);
  }
};

// Fallback functions in case the API is unavailable or limited
function getFallbackGoldPrice(currency: string) {
  // Base price in USD (updated to be closer to current market rates)
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
  
  const price = basePrice * (rates[currency] || 1);
  const change = ((Math.random() * 20) - 10);
  
  return {
    price: Number(price.toFixed(2)),
    currency,
    symbol: getSymbolForCurrency(currency),
    timestamp: Date.now(),
    change: Number(change.toFixed(2)),
    changePercentage: Number((change / price * 100).toFixed(2))
  };
}

function getFallbackGoldPriceHistory(
  currency: string = "USD", 
  period: "1d" | "1w" | "1m" | "6m" | "1y" = "1m"
) {
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
  const data = [];
  
  for (let i = dataPoints; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Create realistic price variations based on a sine wave + random noise
    const variation = ((Math.sin(i / 10) * 100) + (Math.random() * 50 - 25));
    const price = (basePrice + variation) * conversionRate;
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: Number(price.toFixed(2))
    });
  }
  
  return data;
}

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
