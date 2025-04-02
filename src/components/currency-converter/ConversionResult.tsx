
import { useLanguage } from "@/context/LanguageContext";
import { Currency } from "@/lib/api";
import { PriceChangeIndicator } from "@/components/PriceChangeIndicator";
import { useIsMobile } from "@/hooks/use-mobile";

// Define the missing ImageObject interface
interface ImageObject {
  src: string;
  alt: string;
}

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
  const isMobile = useIsMobile();
  
  // Replace the dynamic image with our gold bar image
  const goldBarImage = "/lovable-uploads/82dd0c5b-0351-45cc-833c-2e7e67aa21de.png";
  
  // For mobile, use smaller images to improve performance
  const imageSize = isMobile ? "?auto=format&fit=crop&w=96&h=96" : "?auto=format&fit=crop&w=128&h=128";
  
  return (
    <div className="mt-4 bg-gradient-to-r from-white to-gold-50 dark:from-gray-800 dark:to-gray-700 p-4 sm:p-6 rounded-lg border border-gold-200 dark:border-gold-800 shadow-md transition-all">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left w-full md:w-auto">
          <div className="text-lg text-gold-700 dark:text-gold-300 mb-1">
            {amount} {fromCurrencyObj?.symbol} {fromCurrency} =
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-gold-800 dark:text-gold-400">
            {toCurrencyObj?.symbol} {result.toFixed(2)} {toCurrency}
          </div>
          <div className="text-xs text-gold-600/80 dark:text-gold-400/80 mt-2">
            {t("lastUpdated")}: {lastUpdated?.toLocaleTimeString() || "Never"}
          </div>
        </div>
        
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden shadow-lg border-2 border-gold-300 dark:border-gold-700">
          <img 
            src={goldBarImage}
            alt="Gold Bar"
            className="w-full h-full object-cover transition-transform hover:scale-110 duration-300"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
