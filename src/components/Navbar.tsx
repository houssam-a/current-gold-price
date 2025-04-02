
import { Link } from "react-router-dom";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";
import { Diamond, Signal } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useState, useEffect, useCallback } from "react";
import { PriceChangeIndicator } from "@/components/PriceChangeIndicator";
import { getGoldPrice } from "@/lib/api";

export function Navbar() {
  const { t } = useLanguage();
  const [apiStatus, setApiStatus] = useState<"online" | "limited" | "offline">("limited");
  const [goldPriceChange, setGoldPriceChange] = useState({ change: 0, changePercentage: 0 });
  
  const fetchGoldPriceChange = useCallback(async () => {
    try {
      const data = await getGoldPrice("USD");
      setGoldPriceChange({
        change: data.change,
        changePercentage: data.changePercentage
      });
      console.log("Updated gold price change:", data.change, data.changePercentage);
    } catch (error) {
      console.error("Error fetching gold price change:", error);
    }
  }, []);
  
  // Check API status on component mount
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        // Make a test request to Gold API (we use a mock endpoint since we don't want to waste API quota)
        const response = await fetch("https://www.goldapi.io/status", { 
          method: "HEAD",
          headers: { "x-access-token": "goldapi-demo-key" }
        });
        
        if (response.ok) {
          setApiStatus("online");
        } else if (response.status === 429) { // Too many requests
          setApiStatus("limited");
        } else {
          setApiStatus("offline");
        }
      } catch (error) {
        setApiStatus("offline");
      }
    };
    
    checkApiStatus();
    fetchGoldPriceChange();
    
    // Refresh gold price change more frequently - every 30 seconds instead of 5 minutes
    const interval = setInterval(fetchGoldPriceChange, 30 * 1000);
    
    return () => clearInterval(interval);
  }, [fetchGoldPriceChange]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col md:flex-row h-auto py-2 md:h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center justify-center md:justify-start w-full md:w-auto mb-2 md:mb-0">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <Diamond className="h-6 w-6 text-primary/80" />
            <span className="font-bold sm:inline-block text-2xl bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              Current Gold Price
            </span>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-center md:justify-start gap-2 mb-2 md:mb-0 order-first md:order-none">
          <PriceChangeIndicator 
            change={goldPriceChange.change}
            changePercentage={goldPriceChange.changePercentage}
            size="md"
            className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-full px-3 py-1"
          />
        </div>
        
        <nav className="flex items-center justify-center md:justify-start gap-4 text-sm overflow-x-auto w-full md:w-auto mb-2 md:mb-0">
          <Link
            to="/"
            className={navigationMenuTriggerStyle()}
          >
            {t("home")}
          </Link>
          <Link
            to="/charts"
            className={navigationMenuTriggerStyle()}
          >
            {t("charts")}
          </Link>
          <Link
            to="/calculator"
            className={navigationMenuTriggerStyle()}
          >
            {t("calculator")}
          </Link>
          <Link
            to="/currency-converter"
            className={navigationMenuTriggerStyle()}
          >
            {t("currency")}
          </Link>
        </nav>
        
        <div className="flex items-center justify-end space-x-2">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
