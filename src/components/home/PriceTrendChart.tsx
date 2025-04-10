
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
  
  // توليد بيانات المخطط الثابتة بشكل متوافق - تحسين الأداء
  const chartData = useMemo(() => {
    if (!goldPrice) return [];
    
    // تحسين: استخدام قيمة ثابتة للبذرة لضمان الاستقرار بين عمليات التصيير
    const basePrice = goldPrice.price;
    const seed = selectedCountry.charCodeAt(0) + 42; // إضافة قيمة ثابتة لتجنب التغيرات العشوائية
    
    // استخدام مصفوفة معدة مسبقًا لتحسين الأداء
    const data = new Array(30);
    
    // تحسين: استخدام خوارزمية أكثر استقرارًا لتوليد البيانات
    for (let i = 0; i < 30; i++) {
      const day = i + 1;
      // استخدام دالة تناسبية أكثر استقرارًا لتوليد القيم
      const factor = Math.cos((seed + i) / 5) * 0.5 + Math.sin(i / 7) * 0.5;
      const offset = factor * (basePrice * 0.025); // تقليل نطاق التباين
      
      data[i] = {
        day,
        price: Number((basePrice + offset).toFixed(2)),
      };
    }
    
    return data;
  }, [goldPrice?.price, selectedCountry]);
  
  // تحديد نطاق محور Y الثابت لمنع تغيرات التخطيط
  const yDomain = useMemo(() => {
    if (!chartData.length || !goldPrice) return [0, 100];
    
    // تحسين: استخدام نطاق أضيق لتحسين العرض
    const basePrice = goldPrice.price;
    const min = Math.floor(basePrice * 0.97);
    const max = Math.ceil(basePrice * 1.03);
    
    return [min, max];
  }, [chartData, goldPrice]);

  // تخطي التصيير إذا لم تكن البيانات متاحة لتجنب العمل غير الضروري
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
