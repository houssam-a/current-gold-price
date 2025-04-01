
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { goldImages } from "@/lib/currency-data";
import { useLanguage } from "@/context/LanguageContext";
import { conversionFactors } from "@/lib/goldApi";

interface StatsData {
  avg: number;
  min: number;
  max: number;
  change: number;
}

interface PriceStatisticsProps {
  stats: StatsData;
  currency: string;
  unit?: string;
}

export function PriceStatistics({ stats, currency, unit = "gram" }: PriceStatisticsProps) {
  const { t } = useLanguage();
  const randomGoldImage = goldImages[Math.floor(Math.random() * goldImages.length)];
  
  // Convert stats based on unit if needed
  const unitMultiplier = conversionFactors[unit as keyof typeof conversionFactors] || 1;
  const convertedStats = {
    avg: stats.avg * unitMultiplier,
    min: stats.min * unitMultiplier,
    max: stats.max * unitMultiplier,
    change: stats.change // Change percentage stays the same
  };
  
  return (
    <Card className="gold-card">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{t("priceStatistics")}</CardTitle>
            <CardDescription>
              {t("keyMetrics")} {currency} ({t(unit)})
            </CardDescription>
          </div>
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img 
              src={`${randomGoldImage.src}?auto=format&fit=crop&w=64&h=64`} 
              alt={randomGoldImage.alt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-sm text-muted-foreground mb-1">{t("average")}</div>
            <div className="text-xl font-bold">{convertedStats.avg.toFixed(2)}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-sm text-muted-foreground mb-1">{t("minimum")}</div>
            <div className="text-xl font-bold">{convertedStats.min.toFixed(2)}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-sm text-muted-foreground mb-1">{t("maximum")}</div>
            <div className="text-xl font-bold">{convertedStats.max.toFixed(2)}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-sm text-muted-foreground mb-1">{t("change")}</div>
            <div className={`text-xl font-bold ${convertedStats.change > 0 ? "text-green-500" : convertedStats.change < 0 ? "text-red-500" : ""}`}>
              {convertedStats.change > 0 ? "+" : ""}
              {convertedStats.change.toFixed(2)}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
