
import { Link } from "react-router-dom";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";
import { Diamond, Menu, X, Home, BarChart2, Calculator, Euro, RefreshCw, TrendingUp, TrendingDown } from "lucide-react";
import { useState, useEffect, useCallback, memo } from "react";
import { getGoldPrice } from "@/lib/api";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { LucideIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  to: string;
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

const NavLink = memo(({ to, icon, label, onClick }: NavLinkProps) => {
  const Icon = icon;
  return (
    <SheetClose asChild>
      <Link
        to={to}
        className="flex items-center gap-3 py-3 px-4 text-lg font-medium rounded-lg hover:bg-gold-50 dark:hover:bg-gray-800 transition-colors rtl:flex-row-reverse"
        onClick={onClick}
      >
        <Icon className="h-5 w-5 text-gold-600 dark:text-gold-400" />
        <span>{label}</span>
      </Link>
    </SheetClose>
  );
});
NavLink.displayName = 'NavLink';

export function Navbar() {
  const { t } = useLanguage();
  const [goldPriceChange, setGoldPriceChange] = useState({ change: 0, changePercentage: 0 });
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const fetchGoldPriceChange = useCallback(async () => {
    try {
      setIsUpdating(true);
      const data = await getGoldPrice("USD");
      setGoldPriceChange({
        change: data.change,
        changePercentage: data.changePercentage
      });
      setIsUpdating(false);
    } catch (error) {
      console.error("Error fetching gold price change:", error);
      setIsUpdating(false);
    }
  }, []);
  
  useEffect(() => {
    fetchGoldPriceChange();
    
    const interval = setInterval(fetchGoldPriceChange, 30 * 1000);
    
    return () => clearInterval(interval);
  }, [fetchGoldPriceChange]);

  const handleNavigation = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="container flex flex-col items-center justify-between px-4 sm:px-6 h-auto">
        <div className="flex w-full items-center justify-between mb-2">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
              <Diamond className="h-5 w-5 text-gold-500" />
              <span className="font-bold text-xl bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
                {t("currentGoldPrice")}
              </span>
            </Link>
            
            {!isMobile && (
              <Badge 
                variant="outline" 
                className={cn(
                  "ml-4 flex items-center gap-1 px-2 py-1 font-medium rtl:mr-4 rtl:ml-0",
                  goldPriceChange.change > 0 ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : 
                  goldPriceChange.change < 0 ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100" :
                  "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                )}
              >
                {isUpdating ? (
                  <RefreshCw className="h-3 w-3 animate-spin" />
                ) : goldPriceChange.change > 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : goldPriceChange.change < 0 ? (
                  <TrendingDown className="h-3 w-3" />
                ) : null}
                <span>
                  {goldPriceChange.change > 0 ? '+' : ''}{goldPriceChange.changePercentage.toFixed(2)}%
                </span>
              </Badge>
            )}
            
            <div className="hidden md:flex items-center ml-4 space-x-1 rtl:mr-4 rtl:space-x-reverse">
              <ThemeToggle />
              <LanguageSelector />
            </div>
          </div>
          
          {isMobile ? (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label={t("menu")}>
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0 w-[240px] sm:w-[300px] bg-white dark:bg-gray-900 border-l border-gold-100 dark:border-gold-800">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b border-gold-100 dark:border-gold-800 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Diamond className="h-5 w-5 text-gold-500" />
                      <span className="font-semibold text-gold-700 dark:text-gold-300">{t("menu")}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="py-4 px-2 space-y-1 flex-1">
                    <NavLink to="/" icon={Home} label={t("home")} onClick={handleNavigation} />
                    <NavLink to="/charts" icon={BarChart2} label={t("charts")} onClick={handleNavigation} />
                    <NavLink to="/calculator" icon={Calculator} label={t("calculator")} onClick={handleNavigation} />
                    <NavLink to="/currency-converter" icon={Euro} label={t("currency")} onClick={handleNavigation} />
                    
                    {isMobile && (
                      <div className="mt-4 px-4">
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "w-full flex items-center justify-center gap-1 px-2 py-1.5 font-medium",
                            goldPriceChange.change > 0 ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : 
                            goldPriceChange.change < 0 ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100" :
                            "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                          )}
                        >
                          {isUpdating ? (
                            <RefreshCw className="h-3 w-3 animate-spin" />
                          ) : goldPriceChange.change > 0 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : goldPriceChange.change < 0 ? (
                            <TrendingDown className="h-3 w-3" />
                          ) : null}
                          <span>
                            {t("goldPrice")}: {goldPriceChange.change > 0 ? '+' : ''}{goldPriceChange.changePercentage.toFixed(2)}%
                          </span>
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-auto border-t border-gold-100 dark:border-gold-800 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{t("appearance")}</span>
                      <ThemeToggle />
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm text-muted-foreground">{t("language")}</span>
                      <LanguageSelector />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <nav className="hidden md:flex items-center justify-center gap-1 text-sm">
              <Link
                to="/"
                className={navigationMenuTriggerStyle() + " py-1.5 px-3 flex items-center gap-1.5"}
              >
                <Home className="h-4 w-4" />
                {t("home")}
              </Link>
              <Link
                to="/charts"
                className={navigationMenuTriggerStyle() + " py-1.5 px-3 flex items-center gap-1.5"}
              >
                <BarChart2 className="h-4 w-4" />
                {t("charts")}
              </Link>
              <Link
                to="/calculator"
                className={navigationMenuTriggerStyle() + " py-1.5 px-3 flex items-center gap-1.5"}
              >
                <Calculator className="h-4 w-4" />
                {t("calculator")}
              </Link>
              <Link
                to="/currency-converter"
                className={navigationMenuTriggerStyle() + " py-1.5 px-3 flex items-center gap-1.5"}
              >
                <Euro className="h-4 w-4" />
                {t("currency")}
              </Link>
            </nav>
          )}
          
          <div className="md:hidden flex items-center space-x-1 rtl:space-x-reverse">
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
}
