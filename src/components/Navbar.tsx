
import { Link } from "react-router-dom";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";
import { Diamond, Signal } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";

export function Navbar() {
  const { t } = useLanguage();
  const [apiStatus, setApiStatus] = useState<"online" | "limited" | "offline">("limited");
  
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
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <Diamond className="h-6 w-6 text-primary/80" />
            <span className="hidden font-bold sm:inline-block text-2xl bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              Current Gold Price
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
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
        </div>
        <div className="flex-1" />
        <div className="flex items-center justify-end space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className={`flex items-center mr-2 p-1 rounded-md ${
                apiStatus === "online" ? "text-green-500" : 
                apiStatus === "limited" ? "text-amber-500" : "text-red-500"
              }`}>
                <Signal className="h-4 w-4" />
                <span className="text-xs ml-1">API</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Gold API Status: {apiStatus}</p>
              {apiStatus !== "online" && (
                <p className="text-xs text-muted-foreground">Using fallback data when needed</p>
              )}
            </TooltipContent>
          </Tooltip>
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
