
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { goldImages } from "@/lib/currency-data";
import { useLanguage } from "@/context/LanguageContext";

interface StatsData {
  avg: number;
  min: number;
  max: number;
  change: number;
}

interface PriceStatisticsProps {
  stats: StatsData;
  currency: string;
}

export function PriceStatistics({ stats, currency }: PriceStatisticsProps) {
  const { t } = useLanguage();
  const randomGoldImage = goldImages[Math.floor(Math.random() * goldImages.length)];
  
  return (
    <Card className="gold-card">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{t("priceStatistics")}</CardTitle>
            <CardDescription>
              {t("keyMetrics")} {currency}
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
            <div className="text-xl font-bold">{stats.avg.toFixed(2)}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-sm text-muted-foreground mb-1">{t("minimum")}</div>
            <div className="text-xl font-bold">{stats.min.toFixed(2)}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-sm text-muted-foreground mb-1">{t("maximum")}</div>
            <div className="text-xl font-bold">{stats.max.toFixed(2)}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-sm text-muted-foreground mb-1">{t("change")}</div>
            <div className={`text-xl font-bold ${stats.change > 0 ? "text-green-500" : stats.change < 0 ? "text-red-500" : ""}`}>
              {stats.change > 0 ? "+" : ""}
              {stats.change.toFixed(2)}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
