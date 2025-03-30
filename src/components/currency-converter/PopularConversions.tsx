
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Currency } from "@/lib/api";

interface PopularConversionsProps {
  currencies: Currency[];
  setFromCurrency: (value: string) => void;
  setToCurrency: (value: string) => void;
}

export function PopularConversions({ 
  currencies, 
  setFromCurrency, 
  setToCurrency 
}: PopularConversionsProps) {
  const { t } = useLanguage();
  
  const popularPairs = [
    { from: "USD", to: "EUR" },
    { from: "USD", to: "GBP" },
    { from: "USD", to: "JPY" },
    { from: "EUR", to: "USD" },
    { from: "GBP", to: "USD" },
    { from: "MAD", to: "USD" },
  ];
  
  return (
    <Card className="border-gold-200 dark:border-gold-800 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-gold-50 to-gold-100 dark:from-gray-800 dark:to-gray-700 border-b border-gold-200 dark:border-gold-800">
        <CardTitle className="text-gold-700 dark:text-gold-400">{t("popularConversionRates")}</CardTitle>
        <CardDescription className="text-gold-600/80 dark:text-gold-400/80">
          {t("quickReference")}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {popularPairs.map((pair, index) => {
            const fromObj = currencies.find((c) => c.code === pair.from);
            const toObj = currencies.find((c) => c.code === pair.to);
            
            if (!fromObj || !toObj) return null;
            
            return (
              <div
                key={index}
                className="p-4 border border-gold-200 dark:border-gold-800 rounded-lg bg-white/50 dark:bg-gray-800/50 flex items-center justify-between hover:bg-gold-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center">
                  <span className="font-medium text-gold-700 dark:text-gold-400">
                    {fromObj.symbol} {pair.from}
                  </span>
                  <ArrowRight className="mx-2 h-4 w-4 text-gold-500 dark:text-gold-400" />
                  <span className="font-medium text-gold-700 dark:text-gold-400">
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
                  className="border-gold-300 dark:border-gold-700 hover:bg-gold-100 dark:hover:bg-gray-700 text-gold-700 dark:text-gold-400"
                >
                  {t("use")}
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
