
import { useEffect, useState } from "react";
import { getCurrencies, Currency } from "@/lib/api";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";
import { goldImages } from "@/lib/currency-data";
import { GoldImageGallery } from "@/components/GoldImageGallery";
import { ConversionForm } from "@/components/currency-converter/ConversionForm";
import { FavoritesCurrencies } from "@/components/currency-converter/FavoritesCurrencies";
import { PopularConversions } from "@/components/currency-converter/PopularConversions";

export default function CurrencyConverter() {
  const { t } = useLanguage();
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>(["EUR", "GBP", "JPY"]);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  
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

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 max-w-screen-lg animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gold-500 to-gold-700 dark:from-gold-400 dark:to-gold-600">
          {t("currencyConverter")}
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          {t("convertRealTime")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ConversionForm 
            currencies={currencies} 
            isLoading={isLoading} 
          />
          
          {/* Gold Image Gallery */}
          <div className="mt-8 mb-6">
            <h2 className="text-xl font-semibold mb-3 text-gold-600 dark:text-gold-400">
              {t("goldImageGallery")}
            </h2>
            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg border border-gold-200 dark:border-gold-800 shadow-md">
              <GoldImageGallery />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <FavoritesCurrencies 
            currencies={currencies}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        </div>
      </div>

      <div className="mt-8">
        <PopularConversions 
          currencies={currencies}
          setFromCurrency={setFromCurrency}
          setToCurrency={setToCurrency}
        />
      </div>
    </div>
  );
}
