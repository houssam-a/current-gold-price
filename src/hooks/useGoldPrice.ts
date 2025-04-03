
import { useState, useEffect, useCallback } from 'react';
import { getGoldPrice, GoldPrice } from "@/lib/api";
import { countries, conversionFactors } from "@/lib/currency-data";
import { toast } from "sonner";

export function useGoldPrice(initialCountry: string = "MA") {
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [selectedUnit, setSelectedUnit] = useState("gram");
  const [selectedPurity, setSelectedPurity] = useState("24k"); // Default to 24k gold
  const [goldPrice, setGoldPrice] = useState<GoldPrice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGoldImage, setSelectedGoldImage] = useState("/lovable-uploads/82dd0c5b-0351-45cc-833c-2e7e67aa21de.png");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [sortedCountries, setSortedCountries] = useState<typeof countries>(countries);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  
  const country = countries.find((c) => c.code === selectedCountry);
  
  // Get purity multiplier - 24k is 1, 22k is 0.917, etc.
  const getPurityMultiplier = () => {
    switch (selectedPurity) {
      case "24k": return 1;
      case "22k": return 0.917;
      case "18k": return 0.75;
      case "14k": return 0.583;
      case "10k": return 0.417;
      default: return 1;
    }
  };
  
  const fetchGoldPrice = useCallback(async () => {
    if (!country) return;
    
    setIsLoading(true);
    try {
      const data = await getGoldPrice(country.currency);
      setGoldPrice(data);
      setLastUpdated(new Date());
      
      if (data.price === 0 || !data.price) {
        toast.warning("Using fallback data - API limit reached or unavailable");
      }
    } catch (error) {
      console.error("Error fetching gold price:", error);
      toast.error("Failed to fetch gold price");
    } finally {
      setIsLoading(false);
    }
  }, [country]);
  
  // Function to determine if we need to refresh prices based on day change
  const shouldRefreshPrices = useCallback(() => {
    if (!lastUpdated) return true;
    
    const now = new Date();
    const lastDate = lastUpdated.getDate();
    const currentDate = now.getDate();
    
    // Refresh if the day has changed
    return lastDate !== currentDate;
  }, [lastUpdated]);
  
  const sortCountriesByGoldPrice = useCallback(async () => {
    const countriesWithPrices = await Promise.all(
      countries.map(async (c) => {
        try {
          const price = await getGoldPrice(c.currency);
          return { ...c, price: price.price };
        } catch (error) {
          return { ...c, price: 0 };
        }
      })
    );
    
    const sorted = countriesWithPrices.sort((a, b) => {
      return sortDirection === "asc" ? a.price - b.price : b.price - a.price;
    });
    
    setSortedCountries(sorted);
  }, [sortDirection]);
  
  const toggleSortDirection = () => {
    const newDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newDirection);
  };
  
  // Effect to fetch prices when country changes or on day change
  useEffect(() => {
    fetchGoldPrice();
    
    // Set up a timer to check if we need to refresh prices (every hour)
    const interval = setInterval(() => {
      if (shouldRefreshPrices()) {
        fetchGoldPrice();
      }
    }, 60 * 60 * 1000); // Check every hour
    
    return () => clearInterval(interval);
  }, [fetchGoldPrice, shouldRefreshPrices, selectedCountry]);
  
  // Effect to update gold image
  useEffect(() => {
    const goldImages = ["/lovable-uploads/82dd0c5b-0351-45cc-833c-2e7e67aa21de.png"];
    setSelectedGoldImage(goldImages[Math.floor(Math.random() * goldImages.length)]);
  }, [selectedCountry]);
  
  // Effect to sort countries by price
  useEffect(() => {
    if (goldPrice) {
      sortCountriesByGoldPrice();
    }
  }, [goldPrice, sortCountriesByGoldPrice, sortDirection]);
  
  const convertPrice = (price: number, unit: string) => {
    const factor = conversionFactors[unit as keyof typeof conversionFactors] || 1;
    const purityFactor = getPurityMultiplier();
    return (price * factor * purityFactor).toFixed(2);
  };

  return {
    selectedCountry,
    setSelectedCountry,
    selectedUnit,
    setSelectedUnit,
    selectedPurity,
    setSelectedPurity,
    goldPrice,
    isLoading,
    selectedGoldImage,
    sortDirection,
    sortedCountries, 
    fetchGoldPrice,
    toggleSortDirection,
    convertPrice,
    getPurityMultiplier,
    lastUpdated
  };
}
