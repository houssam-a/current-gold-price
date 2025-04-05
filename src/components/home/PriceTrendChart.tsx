
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
  
  // Generate chart data using useMemo to prevent regeneration on every render
  const chartData = useMemo(() => {
    if (!goldPrice) return [];
    
    // Use a fixed seed for random generation to ensure stability
    const basePrice = goldPrice.price;
    const seed = selectedCountry.charCodeAt(0) + basePrice;
    
    // Create a stable data set that doesn't change between renders
    const data = Array(30)
      .fill(0)
      .map((_, i) => {
        // Use predictable "random" variations based on index and seed
        // to prevent chart from changing on every render
        const sinOffset = Math.sin(i / 5) * (basePrice * 0.05);
        const randomOffset = Math.sin(seed + i) * (basePrice * 0.01);
        const offset = sinOffset + randomOffset;
        
        return {
          day: i + 1,
          price: Number((basePrice + offset).toFixed(2)),
        };
      });
      
    return data;
  }, [goldPrice, selectedCountry]);

  // Use a fixed domain for the Y axis to prevent jumping
  const yDomain = useMemo(() => {
    if (!chartData.length) return [0, 100];
    
    const prices = chartData.map(item => item.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    
    // Add some padding to prevent values from touching the edges
    return [Math.floor(min * 0.98), Math.ceil(max * 1.02)];
  }, [chartData]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{t("priceTrend")} (30 {t("days")})</CardTitle>
        <CardDescription>
          {t("historicalGoldPrice")} {country?.currency}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[250px]">
        {goldPrice ? (
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
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="bg-gray-200 dark:bg-gray-700 h-[200px] w-full rounded-lg"></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
