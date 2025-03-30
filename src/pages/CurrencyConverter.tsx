
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { convertCurrency, getCurrencies, Currency } from "@/lib/api";
import { toast } from "sonner";
import { RefreshCw, ArrowRight, Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SearchSelector } from "@/components/ui/search-selector";
import { goldImages } from "@/lib/currency-data";
import { GoldImageGallery } from "@/components/GoldImageGallery";

export default function CurrencyConverter() {
  const { t } = useLanguage();
  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [result, setResult] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConverting, setIsConverting] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(["EUR", "GBP", "JPY"]);
  const [selectedImage, setSelectedImage] = useState(goldImages[0]);
  
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
    // Select a random gold image
    setSelectedImage(goldImages[Math.floor(Math.random() * goldImages.length)]);
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
      // Change the gold image when converting
      setSelectedImage(goldImages[Math.floor(Math.random() * goldImages.length)]);
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

  // Currency options for the search selector
  const currencyOptions = currencies.map(currency => ({
    value: currency.code,
    label: `${currency.symbol} ${currency.code} - ${currency.name}`
  }));

  return (
    <div className="container py-8 max-w-screen-lg">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">{t("currencyConverter")}</h1>
        <p className="text-muted-foreground mt-2">
          {t("convertRealTime")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="gold-card mb-6">
            <CardHeader>
              <CardTitle>{t("convertCurrency")}</CardTitle>
              <CardDescription>
                {t("enterAmountDesc")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      {t("amount")}
                    </label>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder={t("enterAmount")}
                      className="text-lg"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center">
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium mb-1 block">
                        {t("from")}
                      </label>
                      <SearchSelector
                        options={currencyOptions}
                        value={fromCurrency}
                        onValueChange={setFromCurrency}
                        placeholder={t("selectCurrency")}
                        searchPlaceholder={`${t("search")}...`}
                        className="w-full"
                      />
                    </div>

                    <div className="flex justify-center">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleSwap}
                        className="rounded-full"
                      >
                        <ArrowRight className="h-4 w-4" />
                        <span className="sr-only">{t("swapCurrencies")}</span>
                      </Button>
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-sm font-medium mb-1 block">{t("to")}</label>
                      <SearchSelector
                        options={currencyOptions}
                        value={toCurrency}
                        onValueChange={setToCurrency}
                        placeholder={t("selectCurrency")}
                        searchPlaceholder={`${t("search")}...`}
                        className="w-full"
                      />
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
                        {t("converting")}
                      </>
                    ) : (
                      t("convert")
                    )}
                  </Button>

                  {result !== null && (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
                      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-center md:text-left">
                          <div className="text-lg text-muted-foreground mb-1">
                            {amount} {fromCurrencyObj?.symbol} {fromCurrency} =
                          </div>
                          <div className="text-3xl font-bold">
                            {toCurrencyObj?.symbol} {result.toFixed(2)} {toCurrency}
                          </div>
                          <div className="text-xs text-muted-foreground mt-2">
                            {t("lastUpdated")}: {lastUpdated?.toLocaleTimeString() || "Never"}
                          </div>
                        </div>
                        
                        <div className="w-32 h-32 rounded-lg overflow-hidden shadow-lg">
                          <img 
                            src={`${selectedImage.src}?auto=format&fit=crop&w=128&h=128`}
                            alt={selectedImage.alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Gold Image Gallery */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">{t("goldImageGallery")}</h2>
            <GoldImageGallery />
          </div>
        </div>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>{t("favoriteCurrencies")}</CardTitle>
            <CardDescription>
              {t("quickAccess")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {favorites.length === 0 ? (
                <div className="text-center text-muted-foreground py-4">
                  {t("noFavorites")}
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
                <SearchSelector
                  options={
                    currencies
                      .filter((c) => !favorites.includes(c.code))
                      .map((currency) => ({
                        value: currency.code,
                        label: `${currency.symbol} ${currency.code} - ${currency.name}`
                      }))
                  }
                  value=""
                  onValueChange={(value) => {
                    if (!favorites.includes(value)) {
                      toggleFavorite(value);
                      toast.success(`Added ${value} to favorites`);
                    }
                  }}
                  placeholder={t("addFavorite")}
                  searchPlaceholder={`${t("search")}...`}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>{t("popularConversionRates")}</CardTitle>
          <CardDescription>
            {t("quickReference")}
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
              { from: "MAD", to: "USD" },
            ].map((pair, index) => {
              const fromObj = currencies.find((c) => c.code === pair.from);
              const toObj = currencies.find((c) => c.code === pair.to);
              
              if (!fromObj || !toObj) return null;
              
              return (
                <div
                  key={index}
                  className="p-4 border rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <span className="font-medium">
                      {fromObj.symbol} {pair.from}
                    </span>
                    <ArrowRight className="mx-2 h-4 w-4" />
                    <span className="font-medium">
                      {toObj.symbol} {pair.to}
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
                    {t("use")}
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
