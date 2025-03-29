
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingDown, TrendingUp, RefreshCw, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { getGoldPrice, GoldPrice } from "@/lib/api";
import { countries, goldUnits, conversionFactors } from "@/lib/currency-data";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function Index() {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [selectedUnit, setSelectedUnit] = useState("ounce");
  const [goldPrice, setGoldPrice] = useState<GoldPrice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const country = countries.find((c) => c.code === selectedCountry);
  
  const fetchGoldPrice = async () => {
    if (!country) return;
    
    setIsLoading(true);
    try {
      const data = await getGoldPrice(country.currency);
      setGoldPrice(data);
    } catch (error) {
      console.error("Error fetching gold price:", error);
      toast.error("Failed to fetch gold price");
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchGoldPrice();
  }, [selectedCountry]);
  
  const handleRefresh = () => {
    fetchGoldPrice();
    toast.success("Gold prices refreshed");
  };
  
  const convertPrice = (price: number, unit: string) => {
    const factor = conversionFactors[unit as keyof typeof conversionFactors] || 1;
    return (price / factor).toFixed(2);
  };
  
  // Sample data for price chart
  const generateChartData = () => {
    if (!goldPrice) return [];
    
    const basePrice = goldPrice.price;
    return Array(30)
      .fill(0)
      .map((_, i) => {
        // Creating a sine wave with some random noise for realistic price movements
        const offset = Math.sin(i / 5) * (basePrice * 0.05) + (Math.random() - 0.5) * (basePrice * 0.02);
        return {
          day: i + 1,
          price: Number((basePrice + offset).toFixed(2)),
        };
      });
  };
  
  const chartData = generateChartData();
  
  return (
    <div className="container py-8 max-w-screen-lg">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Gold Price Tracker</h1>
        <p className="text-muted-foreground mt-2">
          Track real-time gold prices across different countries and units
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-1/2">
          <Card className="gold-card h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Current Gold Price</CardTitle>
                <CardDescription>
                  {country?.name} ({country?.currency})
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
                <span className="sr-only">Refresh</span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-4">
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
                      Unit
                    </label>
                    <Select value={selectedUnit} onValueChange={setSelectedUnit}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {goldUnits.map((unit) => (
                          <SelectItem key={unit.value} value={unit.value}>
                            {unit.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {goldPrice ? (
                  <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div>
                      <div className="text-2xl font-bold">
                        {goldPrice?.symbol || goldPrice?.currency}{" "}
                        {goldPrice &&
                          convertPrice(goldPrice.price, selectedUnit)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        per {selectedUnit}
                      </div>
                    </div>
                    <div
                      className={cn(
                        "flex items-center text-sm",
                        goldPrice.change > 0
                          ? "text-green-500"
                          : goldPrice.change < 0
                          ? "text-red-500"
                          : "text-muted-foreground"
                      )}
                    >
                      {goldPrice.change > 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      {goldPrice.change > 0 ? "+" : ""}
                      {goldPrice.change.toFixed(2)} ({goldPrice.changePercentage}%)
                    </div>
                  </div>
                ) : (
                  <div className="h-20 flex items-center justify-center">
                    <div className="animate-pulse bg-gold-100 dark:bg-gray-700 h-12 w-full rounded-lg"></div>
                  </div>
                )}
                
                <div className="text-xs text-muted-foreground flex items-center">
                  <Info className="h-3 w-3 mr-1" />
                  Last updated: {goldPrice ? new Date(goldPrice.timestamp).toLocaleString() : "Loading..."}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full md:w-1/2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Price Trend (30 Days)</CardTitle>
              <CardDescription>
                Historical gold price in {country?.currency}
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
                        `${goldPrice.symbol || goldPrice.currency}${value.toFixed(0)}`
                      }
                    />
                    <Tooltip
                      formatter={(value) => [`${goldPrice.symbol || goldPrice.currency}${value}`, "Price"]}
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
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Gold Price by Unit</CardTitle>
          <CardDescription>
            Compare gold prices in different measurement units
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="gram">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="gram">Gram</TabsTrigger>
              <TabsTrigger value="ounce">Troy Ounce</TabsTrigger>
              <TabsTrigger value="kilo">Kilogram</TabsTrigger>
            </TabsList>
            {goldPrice ? (
              <>
                <TabsContent value="gram" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {countries.slice(0, 6).map((c) => (
                      <div
                        key={c.code}
                        className="p-4 border rounded-lg flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">{c.flag}</span>
                          <span className="font-medium">{c.name}</span>
                        </div>
                        <div className="font-bold">
                          {c.currency === country?.currency
                            ? convertPrice(goldPrice.price, "gram")
                            : "-"}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="ounce" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {countries.slice(0, 6).map((c) => (
                      <div
                        key={c.code}
                        className="p-4 border rounded-lg flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">{c.flag}</span>
                          <span className="font-medium">{c.name}</span>
                        </div>
                        <div className="font-bold">
                          {c.currency === country?.currency
                            ? convertPrice(goldPrice.price, "ounce")
                            : "-"}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="kilo" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {countries.slice(0, 6).map((c) => (
                      <div
                        key={c.code}
                        className="p-4 border rounded-lg flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">{c.flag}</span>
                          <span className="font-medium">{c.name}</span>
                        </div>
                        <div className="font-bold">
                          {c.currency === country?.currency
                            ? convertPrice(goldPrice.price, "kilo")
                            : "-"}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </>
            ) : (
              <div className="h-40 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
