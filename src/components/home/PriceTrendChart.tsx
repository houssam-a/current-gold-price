
import React from 'react';
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
  
  const generateChartData = () => {
    if (!goldPrice) return [];
    
    const basePrice = goldPrice.price;
    return Array(30)
      .fill(0)
      .map((_, i) => {
        const offset = Math.sin(i / 5) * (basePrice * 0.05) + (Math.random() - 0.5) * (basePrice * 0.02);
        return {
          day: i + 1,
          price: Number((basePrice + offset).toFixed(2)),
        };
      });
  };
  
  const chartData = generateChartData();

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
                domain={["auto", "auto"]}
                tickFormatter={(value) =>
                  `${goldPrice.symbol}${value.toFixed(0)}`
                }
              />
              <Tooltip
                formatter={(value) => [`${goldPrice.symbol}${value}`, "Price"]}
                labelFormatter={(label) => `Day ${label}`}
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
