
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
  );
}
