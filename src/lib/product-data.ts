
// Product data for gold products from different platforms/stores

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  platform: string;
  platformLogo?: string; // URL to platform logo
  image: string;
  link: string; // External store URL for purchase
  weight?: string;
  purity?: string;
  category: 'coin' | 'bar' | 'jewelry' | 'other';
}

// Sample product data - in a real-world scenario, this would come from an API
export const products: Product[] = [
  {
    id: "1",
    name: "1g Gold Bar",
    description: "1 gram 999.9 Fine Gold Bullion Bar",
    price: 85.99,
    currency: "USD",
    platform: "GoldSilver",
    platformLogo: "https://placehold.co/50x20?text=GS",
    image: "https://placehold.co/300x200?text=1g+Gold+Bar",
    link: "https://example.com/gold-bar-1g",
    weight: "1g",
    purity: "999.9",
    category: "bar"
  },
  {
    id: "2",
    name: "American Gold Eagle",
    description: "1/10 oz Gold American Eagle Coin",
    price: 251.70,
    currency: "USD",
    platform: "JM Bullion",
    platformLogo: "https://placehold.co/50x20?text=JM",
    image: "https://placehold.co/300x200?text=Gold+Eagle+Coin",
    link: "https://example.com/gold-eagle-coin",
    weight: "1/10 oz",
    purity: "91.67%",
    category: "coin"
  },
  {
    id: "3",
    name: "Gold Chain Necklace",
    description: "18K Gold Cuban Link Chain",
    price: 549.99,
    currency: "USD",
    platform: "GoldHub",
    platformLogo: "https://placehold.co/50x20?text=GH",
    image: "https://placehold.co/300x200?text=Gold+Chain",
    link: "https://example.com/gold-chain",
    weight: "15g",
    purity: "18K",
    category: "jewelry"
  },
  {
    id: "4",
    name: "1oz Gold Bar",
    description: "1 troy oz 999.9 Fine Gold Bullion Bar",
    price: 2145.00,
    currency: "USD",
    platform: "APMEX",
    platformLogo: "https://placehold.co/50x20?text=APMEX",
    image: "https://placehold.co/300x200?text=1oz+Gold+Bar",
    link: "https://example.com/gold-bar-1oz",
    weight: "1 oz",
    purity: "999.9",
    category: "bar"
  },
  {
    id: "5",
    name: "Gold Krugerrand",
    description: "1 oz South African Gold Krugerrand",
    price: 2165.82,
    currency: "USD",
    platform: "SD Bullion",
    platformLogo: "https://placehold.co/50x20?text=SD",
    image: "https://placehold.co/300x200?text=Krugerrand",
    link: "https://example.com/krugerrand",
    weight: "1 oz",
    purity: "91.67%",
    category: "coin"
  },
  {
    id: "6",
    name: "Gold Diamond Ring",
    description: "14K Gold Ring with 1ct Diamond",
    price: 2999.99,
    currency: "USD",
    platform: "Jewelers Exchange",
    platformLogo: "https://placehold.co/50x20?text=JE",
    image: "https://placehold.co/300x200?text=Gold+Ring",
    link: "https://example.com/gold-diamond-ring",
    weight: "8g",
    purity: "14K",
    category: "jewelry"
  },
  {
    id: "7",
    name: "100g Gold Bar",
    description: "100 gram 999.9 Fine Gold Bullion Bar",
    price: 7245.00,
    currency: "USD",
    platform: "Kitco",
    platformLogo: "https://placehold.co/50x20?text=Kitco",
    image: "https://placehold.co/300x200?text=100g+Gold+Bar",
    link: "https://example.com/gold-bar-100g",
    weight: "100g",
    purity: "999.9",
    category: "bar"
  },
  {
    id: "8",
    name: "Gold Maple Leaf",
    description: "Canadian Gold Maple Leaf 1 oz Coin",
    price: 2160.55,
    currency: "USD",
    platform: "Money Metals",
    platformLogo: "https://placehold.co/50x20?text=MM",
    image: "https://placehold.co/300x200?text=Maple+Leaf",
    link: "https://example.com/maple-leaf",
    weight: "1 oz",
    purity: "999.9",
    category: "coin"
  }
];

export const getSymbolForCurrency = (currency: string): string => {
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
  };
  
  return symbols[currency] || currency;
};
