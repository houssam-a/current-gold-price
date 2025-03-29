
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { convertCurrency, getCurrencies, Currency } from "@/lib/api";
import { toast } from "sonner";
import { RefreshCw, ArrowRight, Plus } from "lucide-react";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [result, setResult] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConverting, setIsConverting] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(["EUR", "GBP", "JPY"]);

  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        const data = await getCurrencies();
        setCurrencies(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading currencies:", error);
        toast.error("Failed to load currencies");
        setIsLoading(false);
      }
    };

    loadCurrencies();
  }, []);

  useEffect(() => {
    if (!isLoading && fromCurrency && toCurrency && amount) {
      handleConvert();
    }
  }, [fromCurrency, toCurrency, isLoading]);

  const handleConvert = async () => {
    if (!amount || isNaN(Number(amount))) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsConverting(true);
    try {
      const convertedAmount = await convertCurrency(
        Number(amount),
        fromCurrency,
        toCurrency
      );
      setResult(convertedAmount);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error converting currency:", error);
      toast.error("Failed to convert currency");
    } finally {
      setIsConverting(false);
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const toggleFavorite = (code: string) => {
    if (favorites.includes(code)) {
      setFavorites(favorites.filter((fav) => fav !== code));
    } else {
      setFavorites([...favorites, code]);
    }
  };

  const fromCurrencyObj = currencies.find((c) => c.code === fromCurrency);
  const toCurrencyObj = currencies.find((c) => c.code === toCurrency);

  return (
    <div className="container py-8 max-w-screen-lg">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Currency Converter</h1>
        <p className="text-muted-foreground mt-2">
          Convert between different currencies in real-time
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 gold-card">
          <CardHeader>
            <CardTitle>Convert Currency</CardTitle>
            <CardDescription>
              Enter amount and select currencies to convert
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Amount
                  </label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="text-lg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center">
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium mb-1 block">
                      From
                    </label>
                    <Select
                      value={fromCurrency}
                      onValueChange={setFromCurrency}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.symbol} {currency.code} - {currency.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleSwap}
                      className="rounded-full"
                    >
                      <ArrowRight className="h-4 w-4" />
                      <span className="sr-only">Swap currencies</span>
                    </Button>
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-medium mb-1 block">To</label>
                    <Select
                      value={toCurrency}
                      onValueChange={setToCurrency}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.symbol} {currency.code} - {currency.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={handleConvert}
                  className="w-full gold-gradient"
                  disabled={isConverting}
                >
                  {isConverting ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    "Convert"
                  )}
                </Button>

                {result !== null && (
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
                    <div className="text-lg text-muted-foreground mb-1">
                      {amount} {fromCurrencyObj?.symbol} {fromCurrency} =
                    </div>
                    <div className="text-3xl font-bold">
                      {toCurrencyObj?.symbol} {result.toFixed(2)} {toCurrency}
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Last updated:{" "}
                      {lastUpdated?.toLocaleTimeString() || "Never"}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Favorite Currencies</CardTitle>
            <CardDescription>
              Quick access to your most used currencies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {favorites.length === 0 ? (
                <div className="text-center text-muted-foreground py-4">
                  No favorites added yet
                </div>
              ) : (
                favorites.map((code) => {
                  const currency = currencies.find((c) => c.code === code);
                  return (
                    <div
                      key={code}
                      className="p-3 border rounded-md flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        <span className="font-medium">
                          {currency?.symbol} {code}
                        </span>
                        <span className="text-sm text-muted-foreground ml-2">
                          {currency?.name}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(code)}
                      >
                        ★
                      </Button>
                    </div>
                  );
                })
              )}
              <div className="mt-2">
                <Select
                  onValueChange={(value) => {
                    if (!favorites.includes(value)) {
                      toggleFavorite(value);
                      toast.success(`Added ${value} to favorites`);
                    }
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Add favorite" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies
                      .filter((c) => !favorites.includes(c.code))
                      .map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.symbol} {currency.code} - {currency.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Popular Conversion Rates</CardTitle>
          <CardDescription>
            Quick reference for commonly used currency pairs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { from: "USD", to: "EUR" },
              { from: "USD", to: "GBP" },
              { from: "USD", to: "JPY" },
              { from: "EUR", to: "USD" },
              { from: "GBP", to: "USD" },
              { from: "BTC", to: "USD" },
            ].map(async (pair, index) => {
              const fromObj = currencies.find((c) => c.code === pair.from);
              const toObj = currencies.find((c) => c.code === pair.to);
              
              return (
                <div
                  key={index}
                  className="p-4 border rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <span className="font-medium">
                      {fromObj?.symbol} {pair.from}
                    </span>
                    <ArrowRight className="mx-2 h-4 w-4" />
                    <span className="font-medium">
                      {toObj?.symbol} {pair.to}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFromCurrency(pair.from);
                      setToCurrency(pair.to);
                    }}
                  >
                    Use
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
