
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GoldPriceHistory } from "@/lib/api";
import { useMemo } from "react";

interface GoldChartsProps {
  chartData: GoldPriceHistory[];
  isLoading: boolean;
  currencyCode: string;
}

export function GoldCharts({ chartData, isLoading, currencyCode }: GoldChartsProps) {
  const dateTickFormatter = (value: string) => {
    const date = new Date(value);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const tooltipLabelFormatter = (label: string) => new Date(label).toLocaleDateString();

  // Calculate chart domains only once to prevent changes
  const chartDomains = useMemo(() => {
    if (!chartData.length) return { min: 0, max: 100 };
    
    const prices = chartData.map(item => item.price);
    const min = Math.min(...prices) * 0.98;
    const max = Math.max(...prices) * 1.02;
    
    return {
      min: Math.floor(min),
      max: Math.ceil(max)
    };
  }, [chartData]);

  if (isLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-full w-full rounded-lg"></div>
      </div>
    );
  }

  return (
    <Tabs defaultValue="line">
      <TabsList className="grid grid-cols-3 mb-6">
        <TabsTrigger value="line">Line Chart</TabsTrigger>
        <TabsTrigger value="area">Area Chart</TabsTrigger>
        <TabsTrigger value="bar">Bar Chart</TabsTrigger>
      </TabsList>

      <TabsContent value="line" className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis 
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickFormatter={dateTickFormatter}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              domain={[chartDomains.min, chartDomains.max]}
            />
            <Tooltip 
              formatter={(value) => [`${value}`, "Price"]}
              labelFormatter={tooltipLabelFormatter}
              isAnimationActive={false}
            />
            <Legend />
            <Line
              name={`Gold Price (${currencyCode})`}
              type="monotone"
              dataKey="price"
              stroke="#FFCD00"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </TabsContent>

      <TabsContent value="area" className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis 
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickFormatter={dateTickFormatter}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              domain={[chartDomains.min, chartDomains.max]}
            />
            <Tooltip 
              formatter={(value) => [`${value}`, "Price"]}
              labelFormatter={tooltipLabelFormatter}
              isAnimationActive={false}
            />
            <Legend />
            <Area
              name={`Gold Price (${currencyCode})`}
              type="monotone"
              dataKey="price"
              stroke="#FFCD00"
              fill="#FFCD00"
              fillOpacity={0.3}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </TabsContent>

      <TabsContent value="bar" className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis 
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickFormatter={dateTickFormatter}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              domain={[chartDomains.min, chartDomains.max]}
            />
            <Tooltip 
              formatter={(value) => [`${value}`, "Price"]}
              labelFormatter={tooltipLabelFormatter}
              isAnimationActive={false}
            />
            <Legend />
            <Bar
              name={`Gold Price (${currencyCode})`}
              dataKey="price"
              fill="#FFCD00"
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </TabsContent>
    </Tabs>
  );
}
