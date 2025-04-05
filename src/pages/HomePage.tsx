
import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
  
  // Optimize handlers with useCallback to prevent recreation on each render
  const handleCountryChange = useCallback((country: string) => {
    setSelectedCountry(country);
  }, [setSelectedCountry]);
  
  const handleUnitChange = useCallback((unit: string) => {
    setSelectedUnit(unit);
  }, [setSelectedUnit]);
  
  const handlePurityChange = useCallback((purity: string) => {
    setSelectedPurity(purity);
  }, [setSelectedPurity]);
  
  // Simpler loading logic to improve performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Memoize components to prevent unnecessary re-renders
  const memoizedGoldPriceDisplay = useMemo(() => (
    <GoldPriceDisplay
      selectedCountry={selectedCountry}
      setSelectedCountry={handleCountryChange}
      selectedUnit={selectedUnit}
      setSelectedUnit={handleUnitChange}
      selectedPurity={selectedPurity}
      goldPrice={goldPrice}
      isLoading={priceLoading}
      fetchGoldPrice={fetchGoldPrice}
    />
  ), [selectedCountry, selectedUnit, selectedPurity, goldPrice, priceLoading, handleCountryChange, handleUnitChange, fetchGoldPrice]);
  
  const memoizedPriceTrendChart = useMemo(() => (
    <PriceTrendChart 
      selectedCountry={selectedCountry}
      goldPrice={goldPrice}
    />
  ), [selectedCountry, goldPrice]);
  
  const memoizedGoldPriceTable = useMemo(() => (
    <GoldPriceTable 
      selectedCountry={selectedCountry}
      setSelectedCountry={handleCountryChange}
      goldPrice={goldPrice}
      sortedCountries={sortedCountries}
      sortDirection={sortDirection}
      toggleSortDirection={toggleSortDirection}
      selectedPurity={selectedPurity}
      convertPrice={convertPrice}
    />
  ), [selectedCountry, goldPrice, sortedCountries, sortDirection, selectedPurity, handleCountryChange, toggleSortDirection, convertPrice]);
  
  // Display a simple loading indicator while content is initializing
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
    <div className="container py-6 max-w-screen-lg">
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
      
      <div className="mb-6">
        <GoldPuritySelector 
          value={selectedPurity}
          onValueChange={handlePurityChange}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="w-full">
          {memoizedGoldPriceDisplay}
        </div>
        
        <div className="w-full">
          {memoizedPriceTrendChart}
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
      
      {memoizedGoldPriceTable}
    </div>
  );
}
