
import React, { useState, memo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, TrendingUp, TrendingDown, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";
import { SearchSelector } from "@/components/ui/search-selector";
import { countries, goldUnits } from "@/lib/currency-data";
import { GoldPrice } from "@/lib/api";

interface GoldPriceDisplayProps {
  selectedCountry: string;
  setSelectedCountry: (value: string) => void;
  selectedUnit: string;
  setSelectedUnit: (value: string) => void;
  selectedPurity: string;
  goldPrice: GoldPrice | null;
  isLoading: boolean;
  fetchGoldPrice: () => void;
}

// Using memo to prevent unnecessary re-rendering
export const GoldPriceDisplay = memo(function GoldPriceDisplay({
  selectedCountry,
  setSelectedCountry,
  selectedUnit,
  setSelectedUnit,
  selectedPurity,
  goldPrice,
  isLoading,
  fetchGoldPrice
}: GoldPriceDisplayProps) {
  const { t, language } = useLanguage();
  const country = countries.find((c) => c.code === selectedCountry);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdatedTime, setLastUpdatedTime] = useState<Date | null>(null);

  useEffect(() => {
    if (goldPrice && goldPrice.timestamp) {
      setLastUpdatedTime(new Date(goldPrice.timestamp));
    }
  }, [goldPrice]);

  const renderPriceChangeIndicator = () => {
    if (!goldPrice) return null;

    const isPositive = goldPrice.change > 0;
    const changePercentage = Math.abs(goldPrice.changePercentage);

    return (
      <div className={cn(
        "flex items-center space-x-2 text-sm font-medium rtl:space-x-reverse",
        isPositive ? "text-green-600" : "text-red-600"
      )}>
        {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
        <span>
          {isPositive ? '+' : '-'}{changePercentage.toFixed(2)}% {t("dailyChange")}
        </span>
      </div>
    );
  };

  const getPurityMultiplier = () => {
    switch (selectedPurity) {
      case "24k": return 1;
      case "22k": return 0.917;
      case "21k": return 0.875;
      case "18k": return 0.75;
      case "14k": return 0.583;
      case "12k": return 0.5;
      case "10k": return 0.417;
      default: return 1;
    }
  };

  const convertPrice = (price: number, unit: string) => {
    const factor = {
      gram: 1,
      ounce: 31.1035,
      kilo: 1000,
    }[unit] || 1;
    const purityFactor = getPurityMultiplier();
    return (price * factor * purityFactor).toFixed(2);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchGoldPrice();
    setRefreshing(false);
    toast.success(t("goldPricesRefreshed"));
  };

  const countryOptions = countries.map(country => ({
    value: country.code,
    label: country.name,
    flag: country.flag
  }));

  const unitOptions = goldUnits.map(unit => ({
    value: unit.value,
    label: t(unit.value)
  }));

  // Set up event handlers to delay updates
  const handleCountryChange = (value: string) => {
    // Use setTimeout to delay processing the change
    setTimeout(() => {
      setSelectedCountry(value);
    }, 0);
  };

  const handleUnitChange = (value: string) => {
    // Use setTimeout to delay processing the change
    setTimeout(() => {
      setSelectedUnit(value);
    }, 0);
  };

  return (
    <Card className="gold-card h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{t("currentGoldPrice")}</CardTitle>
          <CardDescription>
            {country?.name} ({country?.currency})
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          disabled={isLoading || refreshing}
          title={t("refreshPrices")}
        >
          <RefreshCw className={cn("h-4 w-4", (isLoading || refreshing) && "animate-spin")} />
          <span className="sr-only">{t("refresh")}</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                {t("country")}
              </label>
              <SearchSelector
                options={countryOptions}
                value={selectedCountry}
                onValueChange={handleCountryChange}
                placeholder={t("selectCountry")}
                searchPlaceholder={`${t("search")}...`}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                {t("unit")}
              </label>
              <SearchSelector
                options={unitOptions}
                value={selectedUnit}
                onValueChange={handleUnitChange}
                placeholder={t("selectUnit")}
                searchPlaceholder={`${t("search")}...`}
              />
            </div>
          </div>
          
          {goldPrice ? (
            <div className="flex flex-col space-y-4">
              <div className="flex items-start justify-between bg-white dark:bg-gray-800 p-4 rounded-lg">
                <div>
                  <div className="text-2xl font-bold">
                    {goldPrice.symbol}{" "}
                    {goldPrice && convertPrice(goldPrice.price, selectedUnit)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t("priceOf")} 1 {t(selectedUnit)} ({selectedPurity})
                  </div>
                  {renderPriceChangeIndicator()}
                </div>
                <div className="flex flex-col items-end">
                  <div className="mt-2">
                    <img 
                      src="/lovable-uploads/ed8a2eb4-1bc0-45e6-b78c-5e2e303c06ef.png"
                      alt="Gold Bar"
                      className="h-12 rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-20 flex items-center justify-center">
              <div className="bg-gold-100 dark:bg-gray-700 h-12 w-full rounded-lg animate-pulse"></div>
            </div>
          )}
          
          <div className="text-xs text-muted-foreground flex items-center">
            <Clock className="h-3 w-3 mr-1 rtl:ml-1 rtl:mr-0" />
            {t("lastUpdated")}: {lastUpdatedTime ? lastUpdatedTime.toLocaleString(language === 'ar' ? 'ar-SA' : undefined) : t("loading")}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
