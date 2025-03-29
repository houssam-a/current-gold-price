
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingDown, TrendingUp, RefreshCw, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { getGoldPrice, GoldPrice } from "@/lib/api";
import { countries, goldUnits, conversionFactors, goldImages } from "@/lib/currency-data";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";
import { SearchSelector } from "@/components/ui/search-selector";
import { LanguageSelector } from "@/components/LanguageSelector";

export default function Index() {
  const { t } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [selectedUnit, setSelectedUnit] = useState("ounce");
  const [goldPrice, setGoldPrice] = useState<GoldPrice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGoldImage, setSelectedGoldImage] = useState(goldImages[0]);
  
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
    // Select a random gold image when changing country
    setSelectedGoldImage(goldImages[Math.floor(Math.random() * goldImages.length)]);
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

  // Country options for the selector
  const countryOptions = countries.map(country => ({
    value: country.code,
    label: country.name,
    flag: country.flag
  }));

  // Unit options for the selector
  const unitOptions = goldUnits.map(unit => ({
    value: unit.value,
    label: t(unit.value)
  }));
  
  return (
    <div className="container py-8 max-w-screen-lg">
      <div className="mb-8 text-center">
        <div className="flex justify-center items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold tracking-tight">{t("goldPriceTracker")}</h1>
          <LanguageSelector />
        </div>
        <p className="text-muted-foreground mt-2">
          {t("trackRealTime")}
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-1/2">
          <Card className="gold-card h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{t("currentGoldPrice")}</CardTitle>
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
                      {t("country")}
                    </label>
                    <SearchSelector
                      options={countryOptions}
                      value={selectedCountry}
                      onValueChange={setSelectedCountry}
                      placeholder={t("selectCountry")}
                      searchPlaceholder={`${t("search")}...`}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      {t("unit")}
                    </label>
                    <SearchSelector
                      options={unitOptions}
                      value={selectedUnit}
                      onValueChange={setSelectedUnit}
                      placeholder={t("selectUnit")}
                      searchPlaceholder={`${t("search")}...`}
                    />
                  </div>
                </div>
                
                {goldPrice ? (
                  <div className="flex items-start justify-between bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div>
                      <div className="text-2xl font-bold">
                        {goldPrice.symbol}{" "}
                        {goldPrice &&
                          convertPrice(goldPrice.price, selectedUnit)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t("priceOf")} 1 {t(selectedUnit)}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
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
                      <div className="mt-2">
                        <img 
                          src={`${selectedGoldImage.src}?auto=format&fit=crop&w=100&h=60`}
                          alt={selectedGoldImage.alt}
                          className="h-12 rounded"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-20 flex items-center justify-center">
                    <div className="animate-pulse bg-gold-100 dark:bg-gray-700 h-12 w-full rounded-lg"></div>
                  </div>
                )}
                
                <div className="text-xs text-muted-foreground flex items-center">
                  <Info className="h-3 w-3 mr-1" />
                  {t("lastUpdated")}: {goldPrice ? new Date(goldPrice.timestamp).toLocaleString() : "Loading..."}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full md:w-1/2">
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
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{t("goldPriceByUnit")}</CardTitle>
          <CardDescription>
            {t("compareGoldPrices")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="gram">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="gram">{t("gram")}</TabsTrigger>
              <TabsTrigger value="ounce">{t("ounce")}</TabsTrigger>
              <TabsTrigger value="kilo">{t("kilogram")}</TabsTrigger>
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
                            ? `${goldPrice.symbol}${convertPrice(goldPrice.price, "gram")}`
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
                            ? `${goldPrice.symbol}${convertPrice(goldPrice.price, "ounce")}`
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
                            ? `${goldPrice.symbol}${convertPrice(goldPrice.price, "kilo")}`
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
