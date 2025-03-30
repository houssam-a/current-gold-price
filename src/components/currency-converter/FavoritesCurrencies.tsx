
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";
import { SearchSelector } from "@/components/ui/search-selector";
import { Currency } from "@/lib/api";

interface FavoritesCurrenciesProps {
  currencies: Currency[];
  favorites: string[];
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
}

export function FavoritesCurrencies({ 
  currencies, 
  favorites, 
  setFavorites 
}: FavoritesCurrenciesProps) {
  const { t } = useLanguage();
  
  const toggleFavorite = (code: string) => {
    if (favorites.includes(code)) {
      setFavorites(favorites.filter((fav) => fav !== code));
    } else {
      setFavorites([...favorites, code]);
    }
  };
  
  return (
    <Card className="border-gold-200 dark:border-gold-800 shadow-lg h-fit">
      <CardHeader className="bg-gradient-to-r from-gold-50 to-gold-100 dark:from-gray-800 dark:to-gray-700 border-b border-gold-200 dark:border-gold-800">
        <CardTitle className="text-gold-700 dark:text-gold-400">{t("favoriteCurrencies")}</CardTitle>
        <CardDescription className="text-gold-600/80 dark:text-gold-400/80">
          {t("quickAccess")}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col gap-2">
          {favorites.length === 0 ? (
            <div className="text-center text-muted-foreground py-4">
              {t("noFavorites")}
            </div>
          ) : (
            <div className="space-y-2">
              {favorites.map((code) => {
                const currency = currencies.find((c) => c.code === code);
                return (
                  <div
                    key={code}
                    className="p-3 border border-gold-200 dark:border-gold-800 rounded-md flex justify-between items-center bg-white/50 dark:bg-gray-800/50 hover:bg-gold-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center">
                      <span className="font-medium text-gold-700 dark:text-gold-400">
                        {currency?.symbol} {code}
                      </span>
                      <span className="text-sm text-gold-600/70 dark:text-gold-400/70 ml-2">
                        {currency?.name}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(code)}
                      className="text-gold-500 hover:text-gold-600 hover:bg-gold-100/50 dark:text-gold-400 dark:hover:text-gold-500 dark:hover:bg-gray-700/50"
                    >
                      ★
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
          <div className="mt-4">
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
              className="border-gold-200 dark:border-gold-800"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
