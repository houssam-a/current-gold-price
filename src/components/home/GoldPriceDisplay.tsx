
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";
import { SearchSelector } from "@/components/ui/search-selector";
import { countries, goldUnits } from "@/lib/currency-data";
import { getGoldPrice, GoldPrice } from "@/lib/api";

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

export function GoldPriceDisplay({
  selectedCountry,
  setSelectedCountry,
  selectedUnit,
  setSelectedUnit,
  selectedPurity,
  goldPrice,
  isLoading,
  fetchGoldPrice
}: GoldPriceDisplayProps) {
  const { t } = useLanguage();
  const country = countries.find((c) => c.code === selectedCountry);

  const renderPriceChangeIndicator = () => {
    if (!goldPrice) return null;

    const isPositive = goldPrice.change > 0;
    const changePercentage = Math.abs(goldPrice.changePercentage);

    return (
      <div className={cn(
        "flex items-center space-x-2 text-sm font-medium",
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
      case "18k": return 0.75;
      case "14k": return 0.583;
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

  const handleRefresh = () => {
    fetchGoldPrice();
    toast.success("Gold prices refreshed");
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
          variant="ghost"
          size="icon"
          onClick={handleRefresh}
          disabled={isLoading}
        >
          <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
          <span className="sr-only">Refresh</span>
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
                onValueChange={setSelectedCountry}
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
                onValueChange={setSelectedUnit}
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
              <div className="animate-pulse bg-gold-100 dark:bg-gray-700 h-12 w-full rounded-lg"></div>
            </div>
          )}
          
          <div className="text-xs text-muted-foreground flex items-center">
            <span className="h-3 w-3 mr-1" />
            {t("lastUpdated")}: {goldPrice ? new Date(goldPrice.timestamp).toLocaleString() : "Loading..."}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
