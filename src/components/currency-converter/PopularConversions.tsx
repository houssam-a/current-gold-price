
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
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{t("popularConversionRates")}</CardTitle>
        <CardDescription>
          {t("quickReference")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {popularPairs.map((pair, index) => {
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
  );
}
