
import React, { useState, useEffect } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { useGoldPrice } from "@/hooks/useGoldPrice";
import { GoldPuritySelector } from "@/components/GoldPuritySelector";
import { GoldPriceDisplay } from "@/components/home/GoldPriceDisplay";
import { PriceTrendChart } from "@/components/home/PriceTrendChart";
import { GoldPriceTable } from "@/components/home/GoldPriceTable";
import { PriceChangeIndicator } from "@/components/PriceChangeIndicator";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  
  const { 
    selectedCountry,
    setSelectedCountry,
    selectedUnit,
    setSelectedUnit,
    selectedPurity,
    setSelectedPurity,
    goldPrice,
    isLoading: priceLoading,
    sortDirection,
    sortedCountries,
    fetchGoldPrice,
    toggleSortDirection,
    convertPrice
  } = useGoldPrice("MA"); // Default to Morocco
  
  // Add delayed loading to improve perceived performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 text-gold-500 animate-spin" />
          <p className="text-muted-foreground">{t("loading")}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-6 max-w-screen-lg fade-in">
      <div className="mb-6 text-center">
        <div className="flex justify-center items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gold-600 to-gold-400 bg-clip-text text-transparent">
            {t("goldPriceTracker")}
          </h1>
        </div>
        <p className="text-muted-foreground mt-2">
          {t("trackRealTime")}
        </p>
      </div>
      
      {/* Gold Purity Selector */}
      <div className="mb-6">
        <GoldPuritySelector 
          value={selectedPurity}
          onValueChange={setSelectedPurity}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="w-full">
          <GoldPriceDisplay
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            selectedUnit={selectedUnit}
            setSelectedUnit={setSelectedUnit}
            selectedPurity={selectedPurity}
            goldPrice={goldPrice}
            isLoading={priceLoading}
            fetchGoldPrice={fetchGoldPrice}
          />
        </div>
        
        <div className="w-full">
          <PriceTrendChart 
            selectedCountry={selectedCountry}
            goldPrice={goldPrice}
          />
        </div>
      </div>
      
      {goldPrice && (
        <div className="mb-6 text-center">
          <PriceChangeIndicator
            change={goldPrice.change}
            changePercentage={goldPrice.changePercentage}
            size="md"
            showDaily={true}
            className="justify-center"
          />
        </div>
      )}
      
      <GoldPriceTable 
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        goldPrice={goldPrice}
        sortedCountries={sortedCountries}
        sortDirection={sortDirection}
        toggleSortDirection={toggleSortDirection}
        selectedPurity={selectedPurity}
        convertPrice={convertPrice}
      />
    </div>
  );
}
