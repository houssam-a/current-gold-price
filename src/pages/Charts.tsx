
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getGoldPriceHistory, GoldPriceHistory } from "@/lib/api";
import { countries } from "@/lib/currency-data";
import { timeframes } from "@/lib/currency-data";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Download } from "lucide-react";

export default function Charts() {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [selectedTimeframe, setSelectedTimeframe] = useState("1m");
  const [chartData, setChartData] = useState<GoldPriceHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const country = countries.find((c) => c.code === selectedCountry);

  useEffect(() => {
    const fetchChartData = async () => {
      if (!country) return;
      
      setIsLoading(true);
      try {
        const data = await getGoldPriceHistory(
          country.currency,
          selectedTimeframe as "1d" | "1w" | "1m" | "6m" | "1y"
        );
        setChartData(data);
      } catch (error) {
        console.error("Error fetching gold price history:", error);
        toast.error("Failed to fetch chart data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchChartData();
  }, [selectedCountry, selectedTimeframe]);

  const handleDownloadData = () => {
    // Create CSV content
    const csvContent = 
      "date,price\n" + 
      chartData.map(item => `${item.date},${item.price}`).join("\n");
    
    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `gold-prices-${country?.currency}-${selectedTimeframe}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Data downloaded successfully");
  };

  // Calculate price statistics
  const calculateStats = () => {
    if (chartData.length === 0) return { avg: 0, min: 0, max: 0, change: 0 };
    
    const prices = chartData.map(item => item.price);
    const avg = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const first = chartData[0].price;
    const last = chartData[chartData.length - 1].price;
    const change = ((last - first) / first) * 100;
    
    return { avg, min, max, change };
  };
  
  const stats = calculateStats();

  return (
    <div className="container py-8 max-w-screen-lg">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Gold Price Charts</h1>
        <p className="text-muted-foreground mt-2">
          Visualize gold price trends over time
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Chart Settings</CardTitle>
              <CardDescription>Customize chart view</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Country
                </label>
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        <span className="mr-2">{country.flag}</span>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Timeframe
                </label>
                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeframes.map((timeframe) => (
                      <SelectItem key={timeframe.value} value={timeframe.value}>
                        {timeframe.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleDownloadData} className="mt-2" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Data
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Card className="gold-card">
            <CardHeader>
              <CardTitle>Price Statistics</CardTitle>
              <CardDescription>
                Key metrics for gold price in {country?.currency}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground mb-1">Average</div>
                  <div className="text-xl font-bold">{stats.avg.toFixed(2)}</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground mb-1">Minimum</div>
                  <div className="text-xl font-bold">{stats.min.toFixed(2)}</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground mb-1">Maximum</div>
                  <div className="text-xl font-bold">{stats.max.toFixed(2)}</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground mb-1">Change</div>
                  <div className={`text-xl font-bold ${stats.change > 0 ? "text-green-500" : stats.change < 0 ? "text-red-500" : ""}`}>
                    {stats.change > 0 ? "+" : ""}
                    {stats.change.toFixed(2)}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gold Price Chart</CardTitle>
          <CardDescription>
            {country?.name} ({country?.currency}) - {timeframes.find(t => t.value === selectedTimeframe)?.label}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="line">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="line">Line Chart</TabsTrigger>
              <TabsTrigger value="area">Area Chart</TabsTrigger>
              <TabsTrigger value="bar">Bar Chart</TabsTrigger>
            </TabsList>

            {isLoading ? (
              <div className="h-[400px] flex items-center justify-center">
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-full w-full rounded-lg"></div>
              </div>
            ) : (
              <>
                <TabsContent value="line" className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis 
                        dataKey="date"
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => {
                          const date = new Date(value);
                          return `${date.getMonth() + 1}/${date.getDate()}`;
                        }}
                      />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        domain={["auto", "auto"]}
                      />
                      <Tooltip 
                        formatter={(value) => [`${value}`, "Price"]}
                        labelFormatter={(label) => new Date(label).toLocaleDateString()}
                      />
                      <Legend />
                      <Line
                        name={`Gold Price (${country?.currency})`}
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
                        tickFormatter={(value) => {
                          const date = new Date(value);
                          return `${date.getMonth() + 1}/${date.getDate()}`;
                        }}
                      />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        domain={["auto", "auto"]}
                      />
                      <Tooltip 
                        formatter={(value) => [`${value}`, "Price"]}
                        labelFormatter={(label) => new Date(label).toLocaleDateString()}
                      />
                      <Legend />
                      <Area
                        name={`Gold Price (${country?.currency})`}
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
                        tickFormatter={(value) => {
                          const date = new Date(value);
                          return `${date.getMonth() + 1}/${date.getDate()}`;
                        }}
                      />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        domain={["auto", "auto"]}
                      />
                      <Tooltip 
                        formatter={(value) => [`${value}`, "Price"]}
                        labelFormatter={(label) => new Date(label).toLocaleDateString()}
                      />
                      <Legend />
                      <Bar
                        name={`Gold Price (${country?.currency})`}
                        dataKey="price"
                        fill="#FFCD00"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </TabsContent>
              </>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
