
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { useGoldPrice } from "@/hooks/useGoldPrice";
import { GoldPuritySelector } from "@/components/GoldPuritySelector";
import { GoldPriceDisplay } from "@/components/home/GoldPriceDisplay";
import { PriceTrendChart } from "@/components/home/PriceTrendChart";
import { GoldPriceTable } from "@/components/home/GoldPriceTable";
import { PriceChangeIndicator } from "@/components/PriceChangeIndicator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Loader2, RefreshCw, Clock } from "lucide-react";

// استخدام التحميل المكسل لتحسين الأداء المبدئي
const LazyGoldPriceTable = React.lazy(() => import('@/components/home/GoldPriceTable').then(module => ({ default: module.GoldPriceTable })));

export default function HomePage() {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  
  // استخدام Hook useGoldPrice
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
    convertPrice,
    lastUpdated,
    autoRefreshEnabled,
    toggleAutoRefresh
  } = useGoldPrice("MA");
  
  // استخدام useCallback لمنع إنشاء دوال جديدة عند كل تصيير
  const handleCountryChange = useCallback((country: string) => {
    setSelectedCountry(country);
  }, [setSelectedCountry]);
  
  const handleUnitChange = useCallback((unit: string) => {
    setSelectedUnit(unit);
  }, [setSelectedUnit]);
  
  const handlePurityChange = useCallback((purity: string) => {
    setSelectedPurity(purity);
  }, [setSelectedPurity]);
  
  const handleManualRefresh = useCallback(() => {
    fetchGoldPrice(true);
  }, [fetchGoldPrice]);
  
  // تحسين منطق التحميل مع وقت انتظار أقصر
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // تخزين مؤقت للمكونات لمنع إعادة التصيير غير الضرورية
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
  ), [selectedCountry, goldPrice?.price]); // تعديل الاعتمادات لتكون أكثر تحديدًا
  
  const memoizedGoldPriceTable = useMemo(() => (
    <React.Suspense fallback={<div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>}>
      <LazyGoldPriceTable
        selectedCountry={selectedCountry}
        setSelectedCountry={handleCountryChange}
        goldPrice={goldPrice}
        sortedCountries={sortedCountries}
        sortDirection={sortDirection}
        toggleSortDirection={toggleSortDirection}
        selectedPurity={selectedPurity}
        convertPrice={convertPrice}
      />
    </React.Suspense>
  ), [selectedCountry, goldPrice?.price, sortDirection, selectedPurity, handleCountryChange, toggleSortDirection, sortedCountries, convertPrice]);
  
  // عرض مؤشر تحميل بسيط أثناء تهيئة المحتوى
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
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            آخر تحديث: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : "جاري التحميل..."}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge 
            variant={autoRefreshEnabled ? "default" : "outline"}
            className="cursor-pointer"
            onClick={toggleAutoRefresh}
          >
            {autoRefreshEnabled ? "تحديث تلقائي" : "تحديث يدوي"}
          </Badge>
          
          <Button
            variant="outline" 
            size="sm" 
            onClick={handleManualRefresh}
            disabled={priceLoading}
            className="flex items-center gap-1"
          >
            <RefreshCw className={`h-3 w-3 ${priceLoading ? "animate-spin" : ""}`} />
            <span>تحديث</span>
          </Button>
        </div>
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
          <Card className="bg-white dark:bg-gray-800 p-4 inline-flex items-center justify-center">
            <PriceChangeIndicator
              change={goldPrice.change}
              changePercentage={goldPrice.changePercentage}
              size="lg"
              showDaily={true}
              className="justify-center"
            />
          </Card>
        </div>
      )}
      
      {memoizedGoldPriceTable}
    </div>
  );
}
