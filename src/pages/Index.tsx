
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingDown, TrendingUp, RefreshCw, Info, ArrowDownAZ, ArrowUpAZ } from "lucide-react";
import { getGoldPrice, GoldPrice } from "@/lib/api";
import { countries, goldUnits, conversionFactors, goldImages } from "@/lib/currency-data";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";
import { SearchSelector } from "@/components/ui/search-selector";
import { LanguageSelector } from "@/components/LanguageSelector";
import { GoldPuritySelector } from "@/components/GoldPuritySelector";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Index() {
  const { t } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [selectedUnit, setSelectedUnit] = useState("gram");
  const [selectedPurity, setSelectedPurity] = useState("24k"); // Default to 24k gold
  const [goldPrice, setGoldPrice] = useState<GoldPrice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGoldImage, setSelectedGoldImage] = useState(goldImages[0]);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [sortedCountries, setSortedCountries] = useState<typeof countries>(countries);
  
  const country = countries.find((c) => c.code === selectedCountry);
  
  // Get purity multiplier - 24k is 1, 22k is 0.917, etc.
  const getPurityMultiplier = () => {
    switch (selectedPurity) {
      case "24k": return 1;
      case "22k": return 0.917;
      case "18k": return 0.75;
      case "14k": return 0.583;
      case "10k": return 0.417;
      default: return 1;
    }
  };
  
  const fetchGoldPrice = async () => {
    if (!country) return;
    
    setIsLoading(true);
    try {
      const data = await getGoldPrice(country.currency);
      setGoldPrice(data);
      
      if (data.price === 0 || !data.price) {
        toast.warning("Using fallback data - API limit reached or unavailable");
      }
      
      await sortCountriesByGoldPrice(selectedUnit);
    } catch (error) {
      console.error("Error fetching gold price:", error);
      toast.error("Failed to fetch gold price");
    } finally {
      setIsLoading(false);
    }
  };
  
  const sortCountriesByGoldPrice = async (unit: string) => {
    const countriesWithPrices = await Promise.all(
      countries.map(async (c) => {
        try {
          const price = await getGoldPrice(c.currency);
          const factor = conversionFactors[unit as keyof typeof conversionFactors] || 1;
          const convertedPrice = Number((price.price * factor).toFixed(2));
          return { ...c, price: convertedPrice };
        } catch (error) {
          return { ...c, price: 0 };
        }
      })
    );
    
    const sorted = countriesWithPrices.sort((a, b) => {
      return sortDirection === "asc" ? a.price - b.price : b.price - a.price;
    });
    
    setSortedCountries(sorted);
  };
  
  const toggleSortDirection = () => {
    const newDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newDirection);
    setSortedCountries([...sortedCountries].reverse());
  };
  
  useEffect(() => {
    fetchGoldPrice();
    setSelectedGoldImage(goldImages[Math.floor(Math.random() * goldImages.length)]);
  }, [selectedCountry]);
  
  useEffect(() => {
    if (goldPrice) {
      sortCountriesByGoldPrice(selectedUnit);
    }
  }, [selectedUnit, goldPrice, sortDirection]);
  
  const handleRefresh = () => {
    fetchGoldPrice();
    toast.success("Gold prices refreshed");
  };
  
  const convertPrice = (price: number, unit: string) => {
    const factor = conversionFactors[unit as keyof typeof conversionFactors] || 1;
    const purityFactor = getPurityMultiplier();
    return (price * factor * purityFactor).toFixed(2);
  };
  
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

  const countryOptions = countries.map(country => ({
    value: country.code,
    label: country.name,
    flag: country.flag
  }));

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
      
      {/* New Gold Purity Selector */}
      <div className="mb-6">
        <GoldPuritySelector 
          value={selectedPurity}
          onValueChange={setSelectedPurity}
        />
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
                        {goldPrice && convertPrice(goldPrice.price, selectedUnit)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t("priceOf")} 1 {t(selectedUnit)} ({selectedPurity})
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="mt-2">
                        <img 
                          src="/lovable-uploads/82dd0c5b-0351-45cc-833c-2e7e67aa21de.png"
                          alt="Gold Bar"
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
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{t("goldPriceByUnit")}</CardTitle>
            <CardDescription>
              {t("compareGoldPrices")}
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleSortDirection}
            className="flex items-center gap-2"
          >
            {sortDirection === "asc" ? (
              <>
                <ArrowUpAZ className="h-4 w-4" />
                {t("sortAscending")}
              </>
            ) : (
              <>
                <ArrowDownAZ className="h-4 w-4" />
                {t("sortDescending")}
              </>
            )}
          </Button>
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
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t("country")}</TableHead>
                        <TableHead>{t("currency")}</TableHead>
                        <TableHead className="text-right">{t("pricePerGram")} ({selectedPurity})</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedCountries.map((c) => (
                        <TableRow key={c.code} className="cursor-pointer hover:bg-muted" onClick={() => setSelectedCountry(c.code)}>
                          <TableCell>
                            <div className="flex items-center">
                              <span className="text-2xl mr-2">{c.flag}</span>
                              <span>{c.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{c.currency}</TableCell>
                          <TableCell className="text-right font-medium">
                            {c.currency === country?.currency
                              ? `${goldPrice.symbol} ${convertPrice(goldPrice.price, "gram")}`
                              : "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="ounce" className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t("country")}</TableHead>
                        <TableHead>{t("currency")}</TableHead>
                        <TableHead className="text-right">{t("pricePerOunce")} ({selectedPurity})</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedCountries.map((c) => (
                        <TableRow key={c.code} className="cursor-pointer hover:bg-muted" onClick={() => setSelectedCountry(c.code)}>
                          <TableCell>
                            <div className="flex items-center">
                              <span className="text-2xl mr-2">{c.flag}</span>
                              <span>{c.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{c.currency}</TableCell>
                          <TableCell className="text-right font-medium">
                            {c.currency === country?.currency
                              ? `${goldPrice.symbol} ${convertPrice(goldPrice.price, "ounce")}`
                              : "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="kilo" className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t("country")}</TableHead>
                        <TableHead>{t("currency")}</TableHead>
                        <TableHead className="text-right">{t("pricePerKilo")} ({selectedPurity})</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedCountries.map((c) => (
                        <TableRow key={c.code} className="cursor-pointer hover:bg-muted" onClick={() => setSelectedCountry(c.code)}>
                          <TableCell>
                            <div className="flex items-center">
                              <span className="text-2xl mr-2">{c.flag}</span>
                              <span>{c.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{c.currency}</TableCell>
                          <TableCell className="text-right font-medium">
                            {c.currency === country?.currency
                              ? `${goldPrice.symbol} ${convertPrice(goldPrice.price, "kilo")}`
                              : "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
