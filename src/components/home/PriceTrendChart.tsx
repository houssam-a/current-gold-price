
import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { useLanguage } from "@/context/LanguageContext";
import { countries } from "@/lib/currency-data";
import { GoldPrice } from "@/lib/api";

interface PriceTrendChartProps {
  selectedCountry: string;
  goldPrice: GoldPrice | null;
}

export function PriceTrendChart({ selectedCountry, goldPrice }: PriceTrendChartProps) {
  const { t } = useLanguage();
  const country = countries.find((c) => c.code === selectedCountry);
  
  // Generate fixed chart data that doesn't change on re-renders
  const chartData = useMemo(() => {
    if (!goldPrice) return [];
    
    // Use a consistent seed for deterministic "random" data
    const basePrice = goldPrice.price;
    const seed = selectedCountry.charCodeAt(0) + basePrice;
    
    // Pre-calculate all data at once to avoid repeated calculations
    return Array(30)
      .fill(0)
      .map((_, i) => {
        // Simplified calculation with less operations
        const day = i + 1;
        const sinValue = Math.sin(i / 5);
        const offset = (sinValue * basePrice * 0.05);
        
        return {
          day,
          price: Number((basePrice + offset).toFixed(2)),
        };
      });
  }, [goldPrice?.price, selectedCountry]); // More specific dependencies
  
  // Fixed Y axis domain to prevent layout shifts
  const yDomain = useMemo(() => {
    if (!chartData.length || !goldPrice) return [0, 100];
    
    // Use a percentage-based domain around the base price for stability
    const basePrice = goldPrice.price;
    return [
      Math.floor(basePrice * 0.95), 
      Math.ceil(basePrice * 1.05)
    ];
  }, [chartData, goldPrice]);

  // Skip rendering if no data is available to avoid unnecessary work
  if (!goldPrice) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{t("priceTrend")} (30 {t("days")})</CardTitle>
          <CardDescription>
            {t("historicalGoldPrice")} {country?.currency}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[250px]">
          <div className="h-full flex items-center justify-center">
            <div className="bg-gray-200 dark:bg-gray-700 h-[200px] w-full rounded-lg"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{t("priceTrend")} (30 {t("days")})</CardTitle>
        <CardDescription>
          {t("historicalGoldPrice")} {country?.currency}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis
              dataKey="day"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value}d`}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              domain={yDomain}
              tickFormatter={(value) =>
                `${goldPrice.symbol}${value.toFixed(0)}`
              }
            />
            <Tooltip
              formatter={(value) => [`${goldPrice.symbol}${value}`, "Price"]}
              labelFormatter={(label) => `Day ${label}`}
              isAnimationActive={false}
            />
            <ReferenceLine
              y={goldPrice.price}
              stroke="#FFCD00"
              strokeDasharray="3 3"
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#FFCD00"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
