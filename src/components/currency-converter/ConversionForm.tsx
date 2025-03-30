
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";
import { SearchSelector } from "@/components/ui/search-selector";
import { convertCurrency, Currency } from "@/lib/api";
import { goldImages } from "@/lib/currency-data";
import { ConversionResult } from "./ConversionResult";

interface ConversionFormProps {
  currencies: Currency[];
  isLoading: boolean;
}

export function ConversionForm({ currencies, isLoading }: ConversionFormProps) {
  const { t } = useLanguage();
  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [result, setResult] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(goldImages[0]);
  
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

  // Currency options for the search selector
  const currencyOptions = currencies.map(currency => ({
    value: currency.code,
    label: `${currency.symbol} ${currency.code} - ${currency.name}`
  }));

  const fromCurrencyObj = currencies.find((c) => c.code === fromCurrency);
  const toCurrencyObj = currencies.find((c) => c.code === toCurrency);

  return (
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
              <ConversionResult
                amount={amount}
                fromCurrency={fromCurrency}
                toCurrency={toCurrency}
                result={result}
                lastUpdated={lastUpdated}
                selectedImage={selectedImage}
                fromCurrencyObj={fromCurrencyObj}
                toCurrencyObj={toCurrencyObj}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
