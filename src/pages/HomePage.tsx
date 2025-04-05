
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
import { Loader2, RefreshCw, Clock, Check } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

// استخدام التحميل المكسل لتحسين الأداء المبدئي
const LazyGoldPriceTable = React.lazy(() => import('@/components/home/GoldPriceTable').then(module => ({ default: module.GoldPriceTable })));

export default function HomePage() {
  const { t } = useLanguage();
  const [isPageLoading, setIsPageLoading] = useState(true);
  
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
    toggleAutoRefresh,
    refreshInterval,
    updateRefreshInterval
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
      setIsPageLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // فترات التحديث المتاحة
  const refreshIntervals = [
    { label: "كل دقيقة", value: 1 },
    { label: "كل 3 دقائق", value: 3 },
    { label: "كل 5 دقائق", value: 5 },
    { label: "كل 10 دقائق", value: 10 },
    { label: "كل 15 دقيقة", value: 15 },
    { label: "كل 30 دقيقة", value: 30 },
    { label: "كل ساعة", value: 60 }
  ];

  // تحديد اللابل الحالي لفترة التحديث
  const currentIntervalLabel = useMemo(() => {
    const minutes = refreshInterval / (60 * 1000);
    const interval = refreshIntervals.find(i => i.value === minutes);
    return interval?.label || "كل 3 دقائق";
  }, [refreshInterval]);
  
  // عرض مؤشر تحميل بسيط أثناء تهيئة المحتوى
  if (isPageLoading) {
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
      
      <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
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
          
          {autoRefreshEnabled && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <span>{currentIntervalLabel}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {refreshIntervals.map(interval => (
                  <DropdownMenuItem 
                    key={interval.value}
                    onClick={() => updateRefreshInterval(interval.value)}
                    className="flex items-center justify-between"
                  >
                    {interval.label}
                    {interval.value === refreshInterval / (60 * 1000) && (
                      <Check className="h-4 w-4 ml-2" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
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
        {priceLoading && !goldPrice ? (
          <>
            <Skeleton className="h-[300px] w-full" />
            <Skeleton className="h-[300px] w-full" />
          </>
        ) : (
          <>
            <div className="w-full">
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
            </div>
            
            <div className="w-full">
              <PriceTrendChart 
                selectedCountry={selectedCountry}
                goldPrice={goldPrice}
              />
            </div>
          </>
        )}
      </div>
      
      {goldPrice && (
        <div className="mb-6 text-center">
          <Card className="bg-gradient-to-r from-white to-gold-50 dark:from-gray-800 dark:to-gray-700 p-4 inline-flex items-center justify-center shadow-md border border-gold-100 dark:border-gray-600">
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
      
      {priceLoading && !goldPrice ? (
        <Skeleton className="h-[400px] w-full" />
      ) : (
        <React.Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
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
      )}
    </div>
  );
}
