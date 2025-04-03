
import React from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { useGoldPrice } from "@/hooks/useGoldPrice";
import { GoldPuritySelector } from "@/components/GoldPuritySelector";
import { GoldPriceDisplay } from "@/components/home/GoldPriceDisplay";
import { PriceTrendChart } from "@/components/home/PriceTrendChart";
import { GoldPriceTable } from "@/components/home/GoldPriceTable";
import { PriceChangeIndicator } from "@/components/PriceChangeIndicator";

export default function HomePage() {
  const { t } = useLanguage();
  
  const { 
    selectedCountry,
    setSelectedCountry,
    selectedUnit,
    setSelectedUnit,
    selectedPurity,
    setSelectedPurity,
    goldPrice,
    isLoading,
    sortDirection,
    sortedCountries,
    fetchGoldPrice,
    toggleSortDirection,
    convertPrice
  } = useGoldPrice("MA", "gram"); // Default to Morocco, gram unit
  
  return (
    <div className="container py-8 max-w-screen-lg">
      <div className="mb-8 text-center">
        <div className="flex justify-center items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold tracking-tight">
            {t("goldPriceTracker")} - {t("morocco")}
          </h1>
        </div>
        <p className="text-muted-foreground mt-2">
          {t("trackRealTime")} {t("inCountry", { country: "Morocco" })}
        </p>
      </div>
      
      {/* Gold Purity Selector */}
      <div className="mb-6">
        <GoldPuritySelector 
          value={selectedPurity}
          onValueChange={setSelectedPurity}
        />
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-1/2">
          <GoldPriceDisplay
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            selectedUnit={selectedUnit}
            setSelectedUnit={setSelectedUnit}
            selectedPurity={selectedPurity}
            goldPrice={goldPrice}
            isLoading={isLoading}
            fetchGoldPrice={fetchGoldPrice}
          />
        </div>
        
        <div className="w-full md:w-1/2">
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
