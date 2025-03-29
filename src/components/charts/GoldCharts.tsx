
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GoldPriceHistory } from "@/lib/api";

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
              domain={["auto", "auto"]}
            />
            <Tooltip 
              formatter={(value) => [`${value}`, "Price"]}
              labelFormatter={tooltipLabelFormatter}
            />
            <Legend />
            <Line
              name={`Gold Price (${currencyCode})`}
              type="monotone"
              dataKey="price"
              stroke="#FFCD00"
              strokeWidth={2}
              activeDot={{ r: 8 }}
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
              domain={["auto", "auto"]}
            />
            <Tooltip 
              formatter={(value) => [`${value}`, "Price"]}
              labelFormatter={tooltipLabelFormatter}
            />
            <Legend />
            <Area
              name={`Gold Price (${currencyCode})`}
              type="monotone"
              dataKey="price"
              stroke="#FFCD00"
              fill="#FFCD00"
              fillOpacity={0.3}
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
              domain={["auto", "auto"]}
            />
            <Tooltip 
              formatter={(value) => [`${value}`, "Price"]}
              labelFormatter={tooltipLabelFormatter}
            />
            <Legend />
            <Bar
              name={`Gold Price (${currencyCode})`}
              dataKey="price"
              fill="#FFCD00"
            />
          </BarChart>
        </ResponsiveContainer>
      </TabsContent>
    </Tabs>
  );
}
