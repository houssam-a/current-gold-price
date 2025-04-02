
import { Link } from "react-router-dom";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";
import { Diamond } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { PriceChangeIndicator } from "@/components/PriceChangeIndicator";
import { getGoldPrice } from "@/lib/api";

export function Navbar() {
  const { t } = useLanguage();
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
  
  // Check API status and fetch gold price change on component mount
  useEffect(() => {
    fetchGoldPriceChange();
    
    // Update gold price every 15 seconds for more frequent updates
    const interval = setInterval(fetchGoldPriceChange, 15 * 1000);
    
    return () => clearInterval(interval);
  }, [fetchGoldPriceChange]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="container flex flex-col items-center justify-between px-4 sm:px-6 h-auto">
        <div className="flex flex-col w-full items-center justify-center">
          {/* Price change indicator removed */}
          
          <div className="flex items-center justify-center mb-2">
            <Link to="/" className="flex items-center space-x-2">
              <Diamond className="h-5 w-5 text-primary/80" />
              <span className="font-bold text-xl bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
                Current Gold Price
              </span>
            </Link>
          </div>
        </div>
        
        <div className="flex w-full justify-center space-x-1">
          <nav className="flex items-center justify-center gap-1 text-sm overflow-x-auto">
            <Link
              to="/"
              className={navigationMenuTriggerStyle() + " py-1.5 px-2.5"}
            >
              {t("home")}
            </Link>
            <Link
              to="/charts"
              className={navigationMenuTriggerStyle() + " py-1.5 px-2.5"}
            >
              {t("charts")}
            </Link>
            <Link
              to="/calculator"
              className={navigationMenuTriggerStyle() + " py-1.5 px-2.5"}
            >
              {t("calculator")}
            </Link>
            <Link
              to="/currency-converter"
              className={navigationMenuTriggerStyle() + " py-1.5 px-2.5"}
            >
              {t("currency")}
            </Link>
          </nav>
          
          <div className="flex items-center space-x-1">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
