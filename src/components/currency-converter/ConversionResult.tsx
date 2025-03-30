
import { useLanguage } from "@/context/LanguageContext";
import { ImageObject } from "@/lib/currency-data";
import { Currency } from "@/lib/api";

interface ConversionResultProps {
  amount: string;
  fromCurrency: string;
  toCurrency: string;
  result: number;
  lastUpdated: Date | null;
  selectedImage: ImageObject;
  fromCurrencyObj?: Currency;
  toCurrencyObj?: Currency;
}

export function ConversionResult({
  amount,
  fromCurrency,
  toCurrency,
  result,
  lastUpdated,
  selectedImage,
  fromCurrencyObj,
  toCurrencyObj
}: ConversionResultProps) {
  const { t } = useLanguage();
  
  return (
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
  );
}
