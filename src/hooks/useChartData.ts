
import { useState, useEffect } from "react";
import { getGoldPriceHistory, GoldPriceHistory } from "@/lib/api";
import { toast } from "sonner";
import { countries } from "@/lib/currency-data";

export interface ChartStats {
  avg: number;
  min: number;
  max: number;
  change: number;
}

export function useChartData(selectedCountry: string, selectedTimeframe: string) {
  const [chartData, setChartData] = useState<GoldPriceHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUsingFallbackData, setIsUsingFallbackData] = useState(false);
  
  const country = countries.find((c) => c.code === selectedCountry);

  useEffect(() => {
    const fetchChartData = async () => {
      if (!country) return;
      
      setIsLoading(true);
      try {
        const data = await getGoldPriceHistory(
          country.currency,
          selectedTimeframe as "1d" | "1w" | "1m" | "6m" | "1y"
        );
        
        // Check if we received actual API data or fallback data
        // This is a heuristic check - in a real app, the API would indicate this explicitly
        if (data.length > 0 && data.length < 5) {
          setIsUsingFallbackData(true);
          toast.warning(`Using fallback data for ${country.name} gold prices`);
        }
        
        setChartData(data);
      } catch (error) {
        console.error("Error fetching gold price history:", error);
        toast.error("Failed to fetch chart data");
        setIsUsingFallbackData(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChartData();
  }, [selectedCountry, selectedTimeframe, country]);

  const calculateStats = (): ChartStats => {
    if (chartData.length === 0) return { avg: 0, min: 0, max: 0, change: 0 };
    
    const prices = chartData.map(item => item.price);
    const avg = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const first = chartData[0].price;
    const last = chartData[chartData.length - 1].price;
    const change = ((last - first) / first) * 100;
    
    return { avg, min, max, change };
  };
  
  const handleDownloadData = () => {
    if (!country) return;
    
    // Create CSV content
    const csvContent = 
      "date,price\n" + 
      chartData.map(item => `${item.date},${item.price}`).join("\n");
    
    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `gold-prices-${country?.currency}-${selectedTimeframe}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Data downloaded successfully");
  };

  return {
    chartData,
    isLoading,
    country,
    isUsingFallbackData,
    stats: calculateStats(),
    handleDownloadData
  };
}
