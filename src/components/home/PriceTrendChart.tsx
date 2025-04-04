
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
    
    return Array(30)
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
  }, [goldPrice, selectedCountry]);

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
            <LineChart 
              data={chartData}
              // Disable animations to prevent movement
              isAnimationActive={false}
            >
              <XAxis
                dataKey="day"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${value}d`}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                domain={[
                  // Set fixed domain to prevent chart from jumping
                  dataMin => Math.floor(dataMin * 0.98),
                  dataMax => Math.ceil(dataMax * 1.02)
                ]}
                tickFormatter={(value) =>
                  `${goldPrice.symbol}${value.toFixed(0)}`
                }
              />
              <Tooltip
                formatter={(value) => [`${goldPrice.symbol}${value}`, "Price"]}
                labelFormatter={(label) => `Day ${label}`}
                // Disable animation for tooltip
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
                // Disable animations to prevent movement
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-[200px] w-full rounded-lg"></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
