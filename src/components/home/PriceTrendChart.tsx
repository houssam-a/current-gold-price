
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { countries } from "@/lib/currency-data";
import { GoldPrice } from "@/lib/api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useChartData } from '@/hooks/useChartData';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PriceChangeIndicator } from "@/components/PriceChangeIndicator";

interface PriceTrendChartProps {
  selectedCountry: string;
  goldPrice: GoldPrice | null;
}

export function PriceTrendChart({ selectedCountry, goldPrice }: PriceTrendChartProps) {
  const { t } = useLanguage();
  const country = countries.find(c => c.code === selectedCountry);
  const [period, setPeriod] = useState("1m");
  
  // Extract yesterday's price from goldPrice data
  const yesterdayPrice = goldPrice?.yesterdayPrice || 0;
  const currentPrice = goldPrice?.price || 0;
  
  // Fetch historical data
  const { chartData, isLoading } = useChartData(country?.currency || "USD", period as "1d" | "1w" | "1m" | "6m" | "1y");
  
  // Calculate min and max for chart Y-axis
  const minMax = useMemo(() => {
    if (!chartData?.length) return { min: 0, max: 0 };
    
    const prices = chartData.map(item => item.price);
    const min = Math.min(...prices) * 0.95; // Add 5% padding below
    const max = Math.max(...prices) * 1.05; // Add 5% padding above
    
    return { min, max };
  }, [chartData]);
  
  const handlePeriodChange = (value: string) => {
    setPeriod(value);
  };
  
  // Format date for X-axis based on period
  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    if (period === "1d") {
      return dateObj.getHours() + "h";
    } else if (period === "1w" || period === "1m") {
      return `${dateObj.getDate()}/${dateObj.getMonth() + 1}`;
    } else {
      return `${dateObj.getMonth() + 1}/${dateObj.getFullYear().toString().substr(2, 2)}`;
    }
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>{t("priceTrend")}</CardTitle>
      </CardHeader>
      
      <CardContent className="pb-2">
        <Tabs defaultValue="1m" value={period} onValueChange={handlePeriodChange}>
          <TabsList className="mb-4 w-full grid grid-cols-5">
            <TabsTrigger value="1d">1 {t("day")}</TabsTrigger>
            <TabsTrigger value="1w">1 {t("week")}</TabsTrigger>
            <TabsTrigger value="1m">1 {t("month")}</TabsTrigger>
            <TabsTrigger value="6m">6 {t("months")}</TabsTrigger>
            <TabsTrigger value="1y">1 {t("year")}</TabsTrigger>
          </TabsList>
          
          <div className="mb-4">
            {goldPrice && (
              <PriceChangeIndicator
                change={goldPrice.change}
                changePercentage={goldPrice.changePercentage}
                showDaily={true}
                yesterdayPrice={yesterdayPrice}
                currentPrice={currentPrice}
              />
            )}
          </div>

          <div className="h-[230px]">
            {isLoading ? (
              <div className="h-full w-full bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse" />
            ) : chartData && chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }} 
                    tickFormatter={formatDate}
                  />
                  <YAxis 
                    domain={[minMax.min || 0, minMax.max || 100]} 
                    tick={{ fontSize: 12 }} 
                    width={50}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`${value.toFixed(2)} ${goldPrice?.symbol || ''}`, t("price")]}
                    labelFormatter={(label) => new Date(label).toLocaleDateString()}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#e5b45b" 
                    strokeWidth={2} 
                    dot={false} 
                    activeDot={{ r: 4 }} 
                  />
                  {yesterdayPrice > 0 && (
                    <ReferenceLine 
                      y={yesterdayPrice} 
                      stroke="#888" 
                      strokeDasharray="3 3"
                      label={{ 
                        value: t("yesterday"),
                        position: 'insideBottomRight',
                        fill: '#888',
                        fontSize: 12
                      }} 
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                {t("noData")}
              </div>
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
